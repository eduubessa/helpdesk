<template>
  <div>
    <div class="row">
      <aside class="d-sm-none col-lg-2 d-lg-block">
        <h4>Menu</h4>
        <nav>
          <ul class="navbar-nav">
            <li @click="navigation.apps.administration_opened = true">
              <i class="fa fa-user"></i>Administration
              <ul :class="{ 'd-none' : navigation.apps.administration_opened === false }">
                <li :class="{ 'active' : $route.path == '/apps'}" @click="$router.push('/tickets')">All</li>
                <li :class="{ 'active' : $route.path == '/apps/system'}" @click="$router.push('/tickets/my-new')">System</li>
                <li :class="{ 'active' : $route.path == '/apps/users'}" @click="$router.push('/tickets/closed')">By User</li>
                <li :class="{ 'active' : $route.path == '/apps/support'}" @click="$router.push('/tickets/closed')">Support</li>
              </ul>
            </li>
            <li @click="navigation.apps.administration_opened = false">
              <i class="fa fa-inbox"></i>Inquiries
              <ul :class="{ 'd-none' : navigation.apps.administration_opened === true }">
                <li>All</li>
                <li>My New</li>
                <li>Closed</li>
                <li>Unanswered</li>
                <li>Twitter Support</li>
              </ul>
            </li>
          </ul>
        </nav>
        <hr width="80%"/>
        <h4>Atividade Recente</h4>
        <section id="recent-activity">
          <ul>
            <li v-for="(activity, key) in activities" :key="key">
              <div class="recent-activity-user">
                <div class="recent-activity-user-avatar offline"
                     :style="'background-image: url(/images/' + activity.user.avatar + ');'"></div>
              </div>
              <span v-html="activity.message"></span>
            </li>
          </ul>
        </section>
      </aside>
    </div>
    <section id="apps" class="col-md-12 col-lg-10'">
      <header id="apps-header" class="col-12">
        teste
      </header>
    </section>
  </div>
</template>
<style lang="scss" scoped>
  @import "../resources/assets/scss/apps";
</style>
<script>

const socketIO = require('socket.io-client');
const io = socketIO.io("http://localhost:3000")

export default {
  data: function () {
    return {
      user: {},
      stream: null,
      navigation: {
        apps: {
          administration_opened: true
        }
      },
      activities: [],
    }
  },
  mounted: function () {
    this.user = JSON.parse(localStorage.getItem('user'));
    // Recent activity
    io.on('activity:recent', (activity) => {
      if(this.activities.length >= 5){
        this.activities.pop()
      }
      this.activities.unshift(activity)
    });

    this.$http.get('/api/v1/tickets').then((response) => {
      this.tickets = response.data.tickets;
    }).catch((err) => {
      alert(err.message);
      throw err;
    });

    this.$http.get('/api/v1/activities').then((response) => {
      this.activities = response.data.activities;
    }).catch((err) => {
      throw err;
    });
  },
  watch: {
    $route(to){
      let query = to.path.replace('/tickets/', '');

      switch(query)
      {
        case 'all': query = ""; break;
        case 'closed': query = "?is_closed=true"; break;
        case 'my-new': query = "?supported_by=" + this.user.username; break;
        case 'unanswered': query = "?supported_by=unanswered"; break;
        default : query = ""; break;
      }

      this.$http.get(`/api/v1/tickets${query}`)
          .then((response) => {
            this.tickets = response.data.tickets;
          }).catch((err) => {
        alert(err.message);
        throw err;
      });
    }
  },
  methods: {
    // Fetch Tickets wi
    fetchTicketsWithQuery: function (query = '') {
      // eslint-disable-next-line no-console
      console.log(query);
      this.$http.get('/api/v1/tickets?' + query)
          .then((response) => {
            this.tickets = response.data.tickets;
          }).catch((err) => {
        alert(err.message);
        throw err;
      });
    },

    /**
     * Accept ticket support
     * @param ticket
     */
    handleAcceptTicketClick: function (ticket) {
      this.$http.patch(`/api/v1/ticket/accept/`, { slug: ticket.slug, supported_by: this.user.username }).then((r) => {
        let activity = {
          user: this.user,
          message: `<strong>${this.user.firstname} ${this.user.lastname}</strong> Iniciou suporte ao ticket de <a href="/profile/${ticket.created_by.username}">${ticket.created_by.firstname} ${ticket.created_by.lastname}</a>`
        }

        io.emit("activity:recent", activity);

        ticket.is_closed = r.data.ticket.is_closed;
        ticket.supported_by = r.data.ticket.supported_by;
        ticket.is_closed = false;
        ticket.supported_by = "eduubessa";

        let message = {};
        message.ticket = this.tickets[this.ticket_selected].slug;
        message.body = `Olá ${this.tickets[this.ticket_selected].created_by.firstname}, em que posso ajudar?`;
        message.author = this.user.username;
        message.receiver = this.tickets[this.ticket_selected].created_by.username;

        io.emit("chat:message", message);

        // this.messages.push({
        //   body: message.body,
        //   author: message.author,
        //   receiver: message.receiver
        // });

      }).catch((err) => {
        alert(err.message);
        throw err;
      });
    },

    /**
     * Solved and Close ticket
     * @param ticket
     */
    handleSolvedTicketClick: function (ticket) {
      ticket.is_closed = true;
      this.$http.put(`/api/v1/tickets/${ticket.slug}`, {is_closed: true})
          .then(() => {
            let activity = {
              user: this.user,
              message: `<strong>${this.user.firstname} ${this.user.lastname}</strong> terminou o suporte ao ticket de <a href="/profile/${ticket.created_by.username}">${ticket.created_by.firstname} ${ticket.created_by.lastname}</a>`
            }
            io.emit("activity:recent", activity);
            ticket.is_closed = true;
          }).catch((err) => {
        alert(err.message);
        throw err;
      });
    },

    /**
     * Reopen ticket support
     * @param ticket
     */
    handleReOpenTicketClick: function (ticket) {
      this.$http.put(`/api/v1/tickets/${ticket.slug}`, {is_closed: false, is_reopen: true})
          .then(() => {
            let activity = {
              user: this.user,
              message: `<strong>${this.user.firstname} ${this.user.lastname}</strong> Reabriu o Ticket#${ticket.slug}`
            }
            io.emit("activity:recent", activity);
          }).catch((err) => {
        alert(err.message);
        throw err;
      });
    },

    /**
     * Delete ticket support
     * @param ticket
     */
    handleTrashTicketClick: function (ticket, key) {
      let activity = {
        user: this.user,
        message: `<strong>${this.user.firstname} ${this.user.lastname}</strong> O ticket de <a href="/profile/${ticket.created_by.username}">${ticket.created_by.firstname} ${ticket.created_by.lastname}</a> foi apagado com sucesso!`
      }
      io.emit("activity:recent", activity);
      this.tickets.splice(key, 1);
    },
    handleUploadImagesVideosAndDocumentsClick: function (type) {
      switch (type) {
        case 'documents': {
          document.getElementById('upload-documents').click();
        }
          break;
        case "pictures" : {
          document.getElementById('upload-pictures').click();
        }
          break;
      }
    },

    handleUploadImagesVideosAndDocumentsChange: function (type) {
      // eslint-disable-next-line no-console
      console.log(type);
    },

    handleStartRecordingVoiceClick: async function () {
      const recorder = await this.audioMicrophoneRecording();
      this.isRecording = true;
      recorder.start()
    },

    handleStopRecordingVoiceClick: async function () {
      // eslint-disable-next-line no-console
      console.log("Trying stop record!")
      const recorder = await this.audioMicrophoneRecording();
      this.isRecording = false;
      recorder.stop();
    },

    handleSendMessageClick: function () {
      if(this.message !== null || this.message !== '') {
        let message = {};
        message.ticket = this.tickets[this.ticket_selected].slug;
        message.body = this.message;

        message.author = this.user.username;
        message.receiver = this.tickets[this.ticket_selected].created_by.username;

        // Temp
        // message.receiver = this.user.username;
        // message.author = this.tickets[this.ticket_selected].created_by.username;

        io.emit("chat:message", message);

        this.messages.push({
          body: this.message,
          author: this.user,
          receiver: this.tickets[this.ticket_selected].created_by.username
        });


        this.message = null;
      }
    },

    fetchTicketMessages: function (i) {
      let ticket = this.tickets[i].slug;
      let author = this.user.username;
      let receiver = this.tickets[i].created_by.username
      this.$http.post(`/api/v1/messages`, { ticket: ticket, author: author, receiver: receiver }).then((r) => {
        if(r.data !== null) {
          this.messages = r.data.messages;
        }else{
          this.messages = [];
        }
      }).catch((err) => {
        throw err;
      });
    }
  }
}
</script>
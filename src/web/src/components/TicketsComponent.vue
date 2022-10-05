<template>
  <div class="row">
    <aside class="d-sm-none col-lg-2 d-lg-block">
      <h4 class="ml-5">Menu</h4>
      <nav class="ml-3">
        <ul class="navbar-nav">
          <li v-if="user.is_admin === false" @click="inboxOpened = true">
            <i class="fa fa-inbox"></i>Inbox
            <ul :class="{ 'd-none' : inboxOpened === false }">
              <li :class="{ 'active' : $route.path == '/tickets'}" @click="$router.push('/tickets')">All</li>
              <li :class="{ 'active' : $route.path == '/tickets/my-new'}" @click="$router.push('/tickets/my-new')">My
                New
              </li>
              <li :class="{ 'active' : $route.path == '/tickets/closed'}" @click="$router.push('/tickets/closed')">
                Closed
              </li>
              <li :class="{ 'active' : $route.path == '/tickets/unanswered'}"
                  @click="$router.push('/tickets/unanswered')">Unanswered
              </li>
              <li>Twitter Support</li>
            </ul>
          </li>
          <li v-else @click="inboxOpened = true">
            <i class="fa fa-inbox"></i>My Tickets
            <ul :class="{ 'd-none' : inboxOpened === false }">
              <li :class="{ 'active' : $route.path == '/tickets'}" @click="$router.push('/tickets')">All</li>
              <li :class="{ 'active' : $route.path == '/tickets/my-new'}" @click="$router.push('/tickets/my-new')">My
                New
              </li>
              <li :class="{ 'active' : $route.path == '/tickets/closed'}" @click="$router.push('/tickets/closed')">
                Closed
              </li>
              <li :class="{ 'active' : $route.path == '/tickets/unanswered'}"
                  @click="$router.push('/tickets/unanswered')">Unanswered
              </li>
              <li>Twitter Support</li>
            </ul>
          </li>
          <li v-if="user.is_admin === false" @click="inboxOpened = false">
            <i class="fa fa-inbox"></i>Inquiries
            <ul :class="{ 'd-none' : inboxOpened === true }">
              <li>All</li>
              <li>My New</li>
              <li>Closed</li>
              <li>Unanswered</li>
              <li>Twitter Support</li>
            </ul>
          </li>
          <li>
            <i class="fa fa-plus-circle"></i>New Inbox
          </li>
        </ul>
      </nav>
      <hr width="75%"/>
      <h4 class="ml-5">Atividade Recente</h4>
      <section id="recent-activity" class="ml-2">
        <ul v-if="user.is_admin">
          <li v-for="(activity, key) in activities" :key="key">
            <div class="recent-activity-user">
              <div class="recent-activity-user-avatar offline"
                   :style="'background-image: url(/images/' + activity.user.avatar + ');'"></div>
            </div>
            <span v-html="activity.message"></span>
          </li>
        </ul>
        <ul v-else>
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
    <section id="tickets"
             :class="{ 'col-md-12 col-lg-6' : tickets[ticket_selected] != null && tickets.length > 0, 'col-md-12 col-lg-10' : tickets[ticket_selected] == null && tickets.length <= 0 }">
      <header id="tickets-header" class="col-12">
        <div class="row">
          <div class=" col-sm-6 col-md-6 col-lg-6">
            <button><i class="fa fa-tag"></i></button>
            <button><i class="fa fa-flag"></i></button>
            <button><i class="fa fa-user"></i></button>
            <button><i class="fa fa-trash"></i></button>
          </div>
          <div class="col-sm-6 col-md-6 col-lg-6">
            <div id="order">
              Ordenar por: <strong id="order-by" tabindex="0" data-toggle="popover" data-trigger="focus"
                                   data-placement="bottom"
                                   data-content="<ul class='order-by-select'><li>Atualizado: Mais recente</li><li>Atualizado: Mais antigo</li><li>Criação: Mais recente</li><li>Criação: mais antigo</li><li>Autor: A-Z</li><li>Autor: Z-A</li></ul>">
              <span>Atualizado - Mais recente</span>
              <i class="fa fa-sort-down"></i></strong>
            </div>
          </div>
        </div>
      </header>
      <section id="list-tickets" class="col-md-12">
        <nav id="nav-tickets" v-if="tickets.length > 0">
          <ul>
            <li v-for="(ticket, key) in tickets"
                :class="{  'nav-tickets-item' : true, 'active' : ticket_selected === key }" :key="key"
                @click="ticket_selected = key; fetchTicketMessages(ticket_selected);">
              <div class="row">
                <div class="col-sm-1 col-md-1 col-lg-1">
                  <div class="ticket-item-user-avatar"
                       :style="`background-image: url('/images/${ticket.created_by.avatar}')`"></div>
                </div>
                <div class="col-sm-10 col-md-7 col-lg-8 pt-3 pb-3">
                  <h4>
                    <span class="badge badge-info mr-2"
                          v-if="ticket.supported_by == null && !ticket.is_closed">New</span>
                    <span class="badge badge-danger mr-2" v-if="ticket.is_closed">Closed</span>
                    <span class="badge badge-success mr-2"
                          v-if="!ticket.is_closed && ticket.supported_by != null">Open</span>
                    {{ ticket.created_by.firstname }}
                    {{ ticket.created_by.lastname }}
                    <small v-if="ticket.created_by.username === user.username" class="text-bold">(criado por
                      mim)</small>
                  </h4>
                  <div class="info">
                    <span v-if="ticket.priority >= 15" class="badge badge-danger mr-2">Priority: High</span>
                    <span v-else-if="ticket.priority >= 8 && ticket.priority < 15"
                          class="badge badge-warning text-white mr-2">Priority: Medium</span>
                    <span v-else-if="ticket.priority >= 0 && ticket.priority < 15" class="badge badge-success mr-2">Priority: Low</span>
                    <div v-if="ticket.created_by.username === user.username" class="message"><small>Meu ticket: </small>{{
                        ticket.title
                      }}
                    </div>
                    <div v-else class="message">{{ ticket.title }}</div>
                  </div>
                </div>
                <div class="col-md-3 offset-md-0 offset-lg-0 col-lg-3 pt-lg-2 text-right">
                  <button @click="handleAcceptTicketClick(ticket)"
                          v-if="!ticket.is_closed && ticket.supported_by == null"
                          :class="{ 'circle-success' : true, 'ml-4' : user.level < 4 }"><i class="fa fa-check"></i>
                  </button>
                  <button @click="handleSolvedTicketClick(ticket)"
                          v-if="!ticket.is_closed && ticket.supported_by != null"
                          :class="{ 'circle-success' : true, 'ml-4' : user.level < 4 }"><i class="fa fa-check"></i>
                  </button>
                  <button v-if="!ticket.is_closed && ticket.supported_by != null" :class="{ 'ml-4' : user.level < 4}" class="circle-warning"><i class="fa fa-pencil"></i></button>
                  <button @click="handleReOpenTicketClick(ticket)" v-if="ticket.is_closed && !ticket.is_reopen" class="circle-warning"><i class="fa fa-undo"></i></button>
                  <button v-if="!ticket.is_closed" @click="handleCloseTicketClick(ticket, key)" class="circle-danger"><i class="fa fa-times"></i></button>
                  <button v-if="ticket.is_closed" @click="handleTrashTicketClick(ticket, key)" class="circle-danger"><i class="fa fa-trash"></i></button>
                </div>
              </div>
            </li>
          </ul>
        </nav>
        <div class="py-3" v-else>
          <p class="text-center"><strong>Neste momento não há tickets para resolver! Parabéns !</strong></p>
        </div>
      </section>
    </section>
    <section id="messages" class="col-md-7 col-lg-4 pr-3" v-if="tickets[ticket_selected] != null && ticket_selected >= 0">
      <header id="messages-header">
        <h3>{{ tickets[ticket_selected].title }}</h3>
        <div class="ticket-user-creator">
          <div class="ticket-user-creator-avatar"
               :style="`background-image: url('/images/${tickets[ticket_selected].created_by.avatar}')`"></div>
          <span>by
              <strong>{{ tickets[ticket_selected].created_by.firstname }} {{ tickets[ticket_selected].created_by.lastname }}</strong>
            </span>
        </div>
      </header>
      <section ref="conversationScrollDown" id="messages-conversation" class="col-12 bg-success">
        <div v-for="(message, index) in messages" :key="index">
          <div class="row" v-if="message.author.username !== user.username">
            <div class="message-receiver col-12">
              <div class="message-receiver-avatar float-right"
                   :style="`background-image: url('/images/${message.author.avatar}')`"></div>
              <div class="message-receiver-body float-right">{{ message.body }}</div>
            </div>
          </div>
          <div class="row" v-else-if="message.receiver.username !== user.username">
            <div class="message-sender col-12">
              <div class="message-sender-avatar float-right"
                   :style="`background-image: url('/images/${message.author.avatar}')`"></div>
              <div class="message-sender-body float-right">{{ message.body }}</div>
            </div>
          </div>
          <div class="row" v-if="message.send === true">
            <div class="message-sender d-flex flex-row-reverse">
              <div class="message-sender-avatar" :style="'background-image: url(' + user.avatar +')'"></div>
              <div class="message-sender-body">{{ message.body }}</div>
            </div>
          </div>
        </div>
      </section>
      <footer id="messages-textarea">
        <div id="messages-textarea-editor">
          <div v-if="tickets[ticket_selected].is_closed || tickets[ticket_selected].supported_by === null"
               class="row text-center">
            <div class="col-12">
                <textarea v-if="tickets[ticket_selected].is_closed" class="text-center"
                          placeholder="O ticket foi dado como concluído, não é possivel enviar mensagem..."
                          disabled></textarea>
              <textarea v-else-if="tickets[ticket_selected].supported_by === null" class="text-center"
                        placeholder="Para iniciar a conversa, é necessário aceitar o pedido de suporte!"
                        disabled></textarea>
            </div>
          </div>
          <div v-else class="row">
            <div class="col-8">
                <textarea @keypress.prevent.enter="handleSendMessageClick" v-model="message" name="message"
                          placeholder="Escreva alguma coisa ..." id="message-textarea-editor-message"></textarea>
              <input type="file" id="upload-documents" name="documents" accept="application/*,image/*|video/*,audio/*"
                     @change="handleUploadImagesVideosAndDocumentsChange" style="display: none;"/>
              <input type="file" id="upload-pictures" name="pictures" accept="image/*,video/*"
                     @change="handleUploadImagesVideosAndDocumentsChange()" style="display: none;"/>
            </div>
            <div id="messages-textarea-editor-features" class="col-4">
              <button v-if="!isRecording" @click="handleStartRecordingVoiceClick"><i class="fa fa-microphone"></i>
              </button>
              <button v-else @click="handleStopRecordingVoiceClick"><i class="fa fa-microphone text-danger"></i>
              </button>
              <button @click="handleUploadImagesVideosAndDocumentsClick('documents')"><i class="fa fa-paperclip"></i>
              </button>
              <button @click="handleUploadImagesVideosAndDocumentsClick('pictures')"><i class="fa fa-image"></i>
              </button>
              <button @click.prevent="handleSendMessageClick" id="send-message"><i class="fa fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </footer>
      <section id="rating-ticket" v-if="tickets[ticket_selected].is_closed" class="text-white text-center">
        <div class="row">
          <div class="col-12 text-center">
            <h3 class="mb-5">O seu ticket foi fechado com sucesso!</h3>
          </div>
          <div class="col-12 text-center mt-3 mb-5">
            <h6>Faça a sua avaliação da resolução deste ticket</h6>
          </div>
          <div class="col-3 offset-1 mb-5">
            <h6 class="mb-3">Duração</h6>
            <div class="btns-rating">
              <button class="btn-transparent star" @click="handleRatingTicketClick(5)"><i class="fa fa-star"></i></button>
              <button class="btn-transparent star" @click="handleRatingTicketClick(4)"><i class="fa fa-star"></i></button>
              <button class="btn-transparent star" @click="handleRatingTicketClick(3)"><i class="fa fa-star"></i></button>
              <button class="btn-transparent star" @click="handleRatingTicketClick(2)"><i class="fa fa-star"></i></button>
              <button class="btn-transparent star" @click="handleRatingTicketClick(1)"><i class="fa fa-star"></i></button>
            </div>
          </div>
          <div class="col-3">
            <h6 class="mb-3">Dificuldade</h6>
            <div class="btns-rating">
              <button class="btn-transparent star" @click="handleRatingTicketClick(5)"><i class="fa fa-star"></i></button>
              <button class="btn-transparent star" @click="handleRatingTicketClick(4)"><i class="fa fa-star"></i></button>
              <button class="btn-transparent star" @click="handleRatingTicketClick(3)"><i class="fa fa-star"></i></button>
              <button class="btn-transparent star" @click="handleRatingTicketClick(2)"><i class="fa fa-star"></i></button>
              <button class="btn-transparent star" @click="handleRatingTicketClick(1)"><i class="fa fa-star"></i></button>
            </div>
          </div>
          <div class="col-3">
            <h6 class="mb-3">Resolução</h6>
            <div class="btns-rating">
              <button class="btn-transparent star" @click="handleRatingTicketClick(5)"><i class="fa fa-star"></i></button>
              <button class="btn-transparent star" @click="handleRatingTicketClick(4)"><i class="fa fa-star"></i></button>
              <button class="btn-transparent star" @click="handleRatingTicketClick(3)"><i class="fa fa-star"></i></button>
              <button class="btn-transparent star" @click="handleRatingTicketClick(2)"><i class="fa fa-star"></i></button>
              <button class="btn-transparent star" @click="handleRatingTicketClick(1)"><i class="fa fa-star"></i></button>
            </div>
          </div>
          <div class="col-12 text-center mt-3">
            <h6 class="mb-5">Faça a sua avaliação sobre o técnico <i>{{ tickets[ticket_selected].supported_by.firstname }} {{ tickets[ticket_selected].supported_by.lastname }}</i></h6>
            <div class="ticket-user-support">
              <div class="ticket-user-support-avatar"
                   :style="`background-image: url('/images/${tickets[ticket_selected].supported_by.avatar}')`"></div>
              <span>
            </span>
            </div>
            <div class="row">
              <div class="col-3 offset-1">
                <h6 class="mb-3">Simpatia</h6>
                <div class="btns-rating">
                  <button class="btn-transparent star" @click="handleRatingTicketClick(5)"><i class="fa fa-star"></i></button>
                  <button class="btn-transparent star" @click="handleRatingTicketClick(4)"><i class="fa fa-star"></i></button>
                  <button class="btn-transparent star" @click="handleRatingTicketClick(3)"><i class="fa fa-star"></i></button>
                  <button class="btn-transparent star" @click="handleRatingTicketClick(2)"><i class="fa fa-star"></i></button>
                  <button class="btn-transparent star" @click="handleRatingTicketClick(1)"><i class="fa fa-star"></i></button>
                </div>
              </div>
              <div class="col-3">
                <h6 class="mb-3">Conhecimento</h6>
                <div class="btns-rating">
                  <button class="btn-transparent star" @click="handleRatingTicketClick(5)"><i class="fa fa-star"></i></button>
                  <button class="btn-transparent star" @click="handleRatingTicketClick(4)"><i class="fa fa-star"></i></button>
                  <button class="btn-transparent star" @click="handleRatingTicketClick(3)"><i class="fa fa-star"></i></button>
                  <button class="btn-transparent star" @click="handleRatingTicketClick(2)"><i class="fa fa-star"></i></button>
                  <button class="btn-transparent star" @click="handleRatingTicketClick(1)"><i class="fa fa-star"></i></button>
                </div>
              </div>
              <div class="col-3">
                <h6 class="mb-3">Resolução</h6>
                <div class="btns-rating">
                  <button class="btn-transparent star" @click="handleRatingTicketClick(5)"><i class="fa fa-star"></i></button>
                  <button class="btn-transparent star" @click="handleRatingTicketClick(4)"><i class="fa fa-star"></i></button>
                  <button class="btn-transparent star" @click="handleRatingTicketClick(3)"><i class="fa fa-star"></i></button>
                  <button class="btn-transparent star" @click="handleRatingTicketClick(2)"><i class="fa fa-star"></i></button>
                  <button class="btn-transparent star" @click="handleRatingTicketClick(1)"><i class="fa fa-star"></i></button>
                </div>
              </div>
              <div class="col-12">
                <button class="btn btn-send-rating">Enviar avaliação</button>
              </div>
            </div>
          </div>
          <div class="col-12 text-center mt-3">
<!--            <p class="mt-3">Avaliação enviada com sucesso!</p>-->
          </div>
        </div>
        <div class="star-buttons row">
        </div>
      </section>
    </section>
  </div>
</template>
<style lang="scss" scoped>
@import "../resources/assets/scss/tickets";
</style>
<script>

const socketIO = require('socket.io-client');
const io = socketIO.io("http://localhost:3000", {
  autoConnect: true
})

export default {
  data: function () {
    return {
      user: {},
      stream: null,
      recorder: null,
      isRecording: false,
      message: null,
      inboxOpened: true,
      ticket_selected: 0,
      messages: [],
      activities: [],
      tickets: [],
      ticket: {}
    }
  },
  mounted: function () {
    this.user = JSON.parse(localStorage.getItem('user'));

    io.on('activity:recent', (activity) => {
      if (this.activities.length >= 5) {
        this.activities.pop()
      }
      this.activities.unshift(activity)
    });

    this.$http.get('/api/v1/tickets').then((response) => {
      this.tickets = response.data.tickets;
      if(!this.user.is_admin) this.tickets = this.tickets.filter(ticket => ticket.created_by.username === this.user.username);
      this.fetchTicketMessages(0);
    }).catch((err) => {
      throw err;
    });

    this.$http.get('/api/v1/activities').then((response) => {
      this.activities = response.data.activities;
    }).catch((err) => {
      throw err;
    });

    io.on("chat:message", (author, message) => {
      this.messages.push({
        body: message.body,
        author: author,
        receiver: message.receiver
      });
    });
  },
  watch: {
    $route(to) {
      let query = to.path.replace('/tickets/', '');

      switch (query) {
        case 'all':
          query = "";
          break;
        case 'closed':
          query = "?is_closed=true";
          break;
        case 'my-new':
          query = "?supported_by=" + this.user.username;
          break;
        case 'unanswered':
          query = "?supported_by=unanswered";
          break;
        default :
          query = "";
          break;
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
      this.$http.patch(`/api/v1/ticket/accept`, {slug: ticket.slug, supported_by: this.user.username}).then((r) => {
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
      this.$http.patch(`/api/v1/ticket/close`, {slug: ticket.slug})
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
      this.$http.patch(`/api/v1/ticket/reopen`, {slug: ticket.slug})
          .then(() => {
            ticket.is_closed = false;
            ticket.is_reopened = true;
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
    handleCloseTicketClick: function (ticket, key)
    {
      let activity = {
        user: this.user,
        message: `<strong>${this.user.firstname} ${this.user.lastname}</strong> O ticket de <a href="/profile/${ticket.created_by.username}">${ticket.created_by.firstname} ${ticket.created_by.lastname}</a> foi fechado com sucesso!`
      }
      io.emit("activity:recent", activity);
      this.tickets[key].is_closed = true;
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
    // Handle Click to Send Message
    handleSendMessageClick: function () {
      if (this.message !== null || this.message !== '') {
        let message = {};
        message.ticket = this.tickets[this.ticket_selected].slug;
        message.body = this.message;

        message.author = this.user.username;
        if (this.user.username === this.tickets[this.ticket_selected].created_by.username) {
          message.receiver = this.tickets[this.ticket_selected].supported_by.username;
        } else {
          message.receiver = this.tickets[this.ticket_selected].created_by.username;
        }

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
      let receiver = this.tickets[i].created_by.username;
      if (this.user.username === this.tickets[i].created_by.username) {
        io.emit("chat:join", {'author': this.user.username, 'receiver': this.tickets[i].supported_by.username})
      } else {
        io.emit("chat:join", {'author': this.user.username, 'receiver': this.tickets[i].created_by.username})
      }
      this.$http.post(`/api/v1/messages`, {ticket: ticket, author: author, receiver: receiver}).then((r) => {
        if (r.data !== null) {
          this.messages = r.data.messages;
        } else {
          this.messages = [];
        }
      }).catch((err) => {
        throw err;
      });
    },
    handleRatingTicketClick: function(rating) {
      alert("Rating: " + rating);
    }
  }
}
</script>

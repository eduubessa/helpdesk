<template>
  <div>
    <div class="row">
      <aside class="d-sm-none col-lg-2 d-lg-block">
        <h4>Menu</h4>
        <nav>
          <ul class="navbar-nav">
            <li @click="inboxOpened = true">
              <i class="fa fa-inbox"></i>Inbox
              <ul :class="{ 'd-none' : inboxOpened === false }">
                <li class="active">All New</li>
                <li>My New</li>
                <li>Closed</li>
                <li>Unanswered</li>
                <li>Twitter Support</li>
              </ul>
            </li>
            <li @click="inboxOpened = false">
              <i class="fa fa-inbox"></i>Inquiries
              <ul :class="{ 'd-none' : inboxOpened === true }">
                <li>All New</li>
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
        <hr width="80%"/>
        <h4>Atividade Recente</h4>
        <section id="recent-activity">
          <ul>
            <li v-for="(activity, key) in activities" :key="key">
              <div class="recent-activity-user">
                <div class="recent-activity-user-avatar offline" :style="'background-image: url(\'/images/\'' + user.avatar + ');'"></div>
              </div>
              <span v-html="activity">{{ activity.user }}</span>
            </li>
          </ul>
        </section>
      </aside>
      <section id="tickets" class="col-md-12 col-lg-6">
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
                Ordenar por: <strong id="order-by" tabindex="0" data-toggle="popover" data-trigger="focus" data-placement="bottom" data-content="<ul class='order-by-select'><li>Atualizado: Mais recente</li><li>Atualizado: Mais antigo</li><li>Criação: Mais recente</li><li>Criação: mais antigo</li><li>Autor: A-Z</li><li>Autor: Z-A</li></ul>">
                <span>Atualizado - Mais recente</span>
                <i class="fa fa-sort-down"></i></strong>
              </div>
            </div>
          </div>
        </header>
        <section id="list-tickets" class="col-md-12">
          <nav id="nav-tickets">
            <ul>
              <li v-for="(ticket, key) in tickets"
                  :class="{  'nav-tickets-item' : true, 'active' : ticket_selected === key }" :key="key"
                  @click="ticket_selected = key; messages = [];">
                <div class="row">
                  <div class="col-sm-3 col-md-3 col-lg-1">
                    <div class="ticket-item-user-avatar" :style="`background-image: url('/images/${ticket.created_by.avatar}')`"></div>
                  </div>
                  <div class="col-sm-10 col-md-8 col-lg-8 pt-3 pb-3">
                    <h4>
                      <span class="badge badge-info mr-2" v-if="ticket.supported_by == null && !ticket.isClosed">New</span>
                      <span class="badge badge-danger mr-2" v-if="ticket.isClosed">Closed</span>
                      <span class="badge badge-success mr-2" v-if="!ticket.isClosed && ticket.supported_by != null">Open</span>
                      {{ ticket.created_by.firstname }}
                      {{ ticket.created_by.lastname }}</h4>
                    <div class="info">
                      <span v-if="ticket.priority >= 15" class="badge badge-danger mr-2">Priority: High</span>
                      <span v-else-if="ticket.priority >= 8 && ticket.priority < 15" class="badge badge-warning text-white mr-2">Priority: Medium</span>
                      <span v-else-if="ticket.priority >= 0 && ticket.priority < 15" class="badge badge-success mr-2">Priority: Low</span>
                      <div class="message">{{ ticket.title }}</div>
                    </div>
                  </div>
                  <div class="col-md-2 offset-md-9 offset-lg-0 col-lg-3 pt-lg-2 text-right">
                    <button @click="handleAcceptTicketClick(ticket)" v-if="!ticket.isClosed && ticket.supported_by == null" :class="{ 'circle-success' : true, 'ml-4' : user.level < 4 }"><i class="fa fa-check"></i></button>
                    <button @click="handleSolvedTicketClick(ticket)" v-if="!ticket.isClosed && ticket.supported_by != null" :class="{ 'circle-success' : true, 'ml-4' : user.level < 4 }"><i class="fa fa-check"></i></button>
                    <button v-if="!ticket.isClosed && ticket.supported_by != null" :class="{ 'ml-4' : user.level < 4}" class="circle-warning"><i class="fa fa-pencil"></i></button>
                    <button @click="handleReOpenTicketClick(ticket)" v-if="ticket.isClosed && !ticket.isReopen" class="circle-warning"><i class="fa fa-undo"></i></button>
                    <button @click="handleTrashTicketClick(ticket, key)" class="circle-danger"><i class="fa fa-trash"></i></button>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </section>
      </section>
      <section id="messages" class="col-md-7 col-lg-4" v-if="tickets[ticket_selected] != null">
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
        <section id="messages-conversation" class="col-12 bg-success">
          <div v-for="(message, index) in messages" :key="index">
            <div class="row" v-if="message.sender === false">
              <div class="message-receiver col-12">
                <div class="message-receiver-avatar float-right"></div>
                <div class="message-receiver-body float-right">{{ message.body }}</div>
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
            <div v-if="tickets[ticket_selected].isClosed || tickets[ticket_selected].supported_by === null" class="row text-center">
              <div class="col-12">
                <textarea v-if="tickets[ticket_selected].isClosed" class="text-center" placeholder="O ticket foi dado como concluído, não é possivel enviar mensagem..." disabled></textarea>
                <textarea v-else-if="tickets[ticket_selected].supported_by === null" class="text-center" placeholder="Para iniciar a conversa, é necessário aceitar o pedido de suporte!" disabled></textarea>
              </div>
            </div>
            <div v-else class="row">
              <div class="col-8">
                <textarea @keypress.prevent.enter="handleSendMessageClick" v-model="message" name="message" placeholder="Escreva alguma coisa ..." id="message-textarea-editor-message"></textarea>
                <input type="file" id="upload-documents" name="documents" accept="application/*,image/*|video/*,audio/*" @change="handleUploadImagesVideosAndDocumentsChange" style="display: none;"/>
                <input type="file" id="upload-pictures" name="pictures" accept="image/*,video/*" @change="handleUploadImagesVideosAndDocumentsChange()" style="display: none;"/>
              </div>
              <div id="messages-textarea-editor-features" class="col-4">
                <button v-if="!isRecording" @click="handleStartRecordingVoiceClick"><i class="fa fa-microphone"></i></button>
                <button v-else @click="handleStopRecordingVoiceClick"><i class="fa fa-microphone text-danger"></i></button>
                <button @click="handleUploadImagesVideosAndDocumentsClick('documents')"><i class="fa fa-paperclip"></i></button>
                <button @click="handleUploadImagesVideosAndDocumentsClick('pictures')"><i class="fa fa-image"></i></button>
                <button @click.prevent="handleSendMessageClick" id="send-message"><i class="fa fa-paper-plane"></i></button>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "./../resources/assets/scss/tickets.scss";
</style>
<script>
const socketIO = require('socket.io-client');
const io = socketIO.io("http://localhost:3000")

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
    this.user = localStorage.getItem('user');

    // Recent activity
    io.on('activity:recent', (activity) => {
      this.activities.push(activity);
    });

    this.$http.get('/api/v1/tickets')
        .then((response) => {
          this.tickets = response.data.tickets;
        }).catch((err) => {
      alert(err.message);
      throw err;
    });
  },
  methods: {

    /**
     * Accept ticket support
     * @param ticket
     */
    handleAcceptTicketClick: function (ticket) {
      ticket.isClosed = false;
      ticket.supported_by = "60dda0bcc36f5e2e131128bf";
      let user = localStorage.getItem('user');
      let activity = `<strong>Eduardo Bessa</strong> Iniciou suporte ao ticket de <a href="/profile/${ticket.created_by.username}">${ticket.created_by.firstname} ${ticket.created_by.lastname}</a>`
      io.emit("activity:recent", user, activity);
      this.$http.patch('/ticket/accept', { slug : ticket.slug, user: "60dda0bcc36f5e2e131128bf" }, (err, ticket) => {
        if(err) throw err;
        ticket.isClosed = false;
        ticket.supported_by = "60dda0bcc36f5e2e131128bf";
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
    },

    /**
     * Solved and Close ticket
     * @param ticket
     */
    handleSolvedTicketClick: function (ticket) {
      ticket.isClosed = true;
      io.emit("activity:recent", `<strong>Eduardo Bessa</strong> terminou o suporte ao ticket de <a href="/profile/${ticket.created_by.username}">${ticket.created_by.firstname} ${ticket.created_by.lastname}</a>`);
    },

    /**
     * Reopen ticket support
     * @param ticket
     */
    handleReOpenTicketClick: function (ticket) {
      ticket.isClosed = false;
      ticket.supported_by = "60dda0bcc36f5e2e131128bf";
      ticket.isReopen = true;
      io.emit("activity:recent", `<strong>Eduardo Bessa</strong> Reabriu o Ticket#${ticket.slug}`);
      // this.$http.patch('/ticket/reopen', { slug : ticket.slug, is_closed: false, is_reopen: true }, (err, ticket) => {
      //   if(err) throw err;
      //   ticket.isClosed = false;
      //   ticket.supported_by = "60dda0bcc36f5e2e131128bf";
      //   ticket.isReopen = true;
      //   io.emit("chat:message", `O ticket "${ticket.title}" de ${ticket.created_by.firstname } ${ticket.created_by.lastname} foi reaberto com sucesso!`);
      // }).catch((err) => {
      //   alert(err.message);
      // });
    },

    /**
     * Delete ticket support
     * @param ticket
     */
    handleTrashTicketClick: function (ticket, key) {
      io.emit("activity:recent", `<strong>Eduardo Bessa</strong> O ticket de <a href="/profile/${ticket.created_by.username}">${ticket.created_by.firstname} ${ticket.created_by.lastname}</a> foi apagado com sucesso!`);
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
      io.emit("chat:message", this.message);
      this.messages.push({send: true, body: this.message});
      this.message = null;
    },
  }
}
</script>

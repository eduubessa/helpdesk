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
              <span v-html="activity"></span>
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
                      <span v-else-if="ticket.priority >= 8 && ticket.priority < 15"
                            class="badge badge-warning text-white mr-2">Priority: Medium</span>
                      <span v-else-if="ticket.priority >= 0 && ticket.priority < 15" class="badge badge-success mr-2">Priority: Low</span>
                      <div class="message">{{ ticket.title }}</div>
                    </div>
                  </div>
                  <div class="col-md-2 offset-md-9 offset-lg-0 col-lg-3 pt-lg-2 text-right">
                    <button @click="acceptEventHandleClick(ticket)" v-if="!ticket.isClosed && ticket.supported_by == null" :class="{ 'circle-success' : true, 'ml-4' : user.level < 4 }"><i class="fa fa-check"></i></button>
                    <button @click="solvedEventHandleClick(ticket)" v-if="!ticket.isClosed && ticket.supported_by != null" :class="{ 'circle-success' : true, 'ml-4' : user.level < 4 }"><i class="fa fa-check"></i></button>
                    <button v-if="!ticket.isClosed && ticket.supported_by != null" :class="{ 'ml-4' : user.level < 4}" class="circle-warning"><i class="fa fa-pencil"></i></button>
                    <button @click="reopenEventHandleClick(ticket)" v-if="ticket.isClosed && !ticket.isReopen" class="circle-warning"><i class="fa fa-undo"></i></button>
                    <button @click="trashEventHandleClick(ticket, key)" class="circle-danger"><i class="fa fa-trash"></i></button>
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
                <textarea @keypress.prevent.enter="sendMessage" v-model="message" name="message" placeholder="Escreva alguma coisa ..." id="message-textarea-editor-message"></textarea>
                <input type="file" id="upload-documents" name="documents" accept="application/*,image/*|video/*,audio/*" style="display: none;"/>
                <input type="file" id="upload-pictures" name="pictures" accept="image/*,video/*" @change="eventChangePictureHandler()" style="display: none;"/>
              </div>
              <div id="messages-textarea-editor-features" class="col-4">
                <button v-if="!isRecording" @click="handleStartRecordingVoiceClick"><i class="fa fa-microphone"></i></button>
                <button v-else @click="handleStopRecordingVoiceClick"><i class="fa fa-microphone text-danger"></i></button>
                <button @click="upload('documents')"><i class="fa fa-paperclip"></i></button>
                <button @click="upload('pictures')"><i class="fa fa-image"></i></button>
                <button @click.prevent="sendMessage" id="send-message"><i class="fa fa-paper-plane"></i></button>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  </div>
</template>
<style lang="scss">
aside {
  padding: 0;
  border: 0;
  min-height: 90.1vh;
  background: rgba(245, 245, 245, 1);

  h4 {
    margin: 35px 20px;
    color: #999;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-family: "Roboto", sans-serif;
    font-weight: 700;
  }

  nav {
    ul.navbar-nav {
      position: relative;
      left: 8%;

      li {
        cursor: pointer;
        color: #81b826;
        margin: 10px;
        font-size: 16px;
        font-weight: bold;
        font-family: "PT Sans", sans-serif;
        letter-spacing: 1px;
        transition: all 0.6s ease;

        i {
          margin-right: 15px;
        }

        ul {
          li {
            cursor: pointer;
            margin: 12px;
            color: rgba(140, 140, 140, 1);
            list-style: none;
            font-weight: normal;
            transition: all 0.4s ease;

            &:hover, &.active {
              color: rgba(80, 80, 80, 1);
            }
          }
        }
      }
    }
  }

  section#recent-activity {
    ul {
      position: relative;
      right: 20px;
      border: 0;

      li {
        margin: 32px 0;
        list-style: none;
        display: flex;

        &:hover {
          color: red;
        }

        div.recent-activity-user {
          div.recent-activity-user-avatar {
            width: 38px;
            height: 38px;
            background-position: 50% 50%;
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 50%;
            border: 2px solid #81b826;
          }
        }
      }

      span {
        color: #999;
        margin-left: 15px;
        font-size: 14px;
      }
    }
  }
}

section {
  padding: 0;
  margin: 0;
  position: relative;
  background: rgba(245, 245, 245, 1);
  border-left: 1px solid rgba(220, 220, 220, 1);

  &#tickets {
    padding: 0;
    overflow-y: auto;

    div.col-sm-6 {
      padding: 0;
      margin: 0;
    }

    header#tickets-header {
      height: 9vh;
      border-bottom: 2px solid rgba(220, 220, 220, 1);

      button {
        padding: 9px 14px;
        margin: 20px 8px;
        color: rgba(180, 180, 180, 1);
        border: 2px solid rgba(180, 180, 180, 1);
        background: transparent;
        border-radius: 50%;
        transition: all 0.4s ease;
        font-size: .8rem;

        &:first-child {
          margin-left: 45px;
        }

        &:hover, &.active {
          color: #81b826;
          border-color: #81b826;
        }
      }

      div#order {
        margin: 28px 20px;
        transition: all 0.4s ease;

        strong {
          span {
            position: relative;
            left: 5px;
            bottom: 0px;
          }

          i {
            position: relative;
            left: 15px;
            bottom: 3px;
          }
        }
      }
    }

    section#list-tickets {
      padding: 0;
      border: 0;

      nav#nav-tickets {
        padding: 0;

        ul {
          padding: 0;

          li.nav-tickets-item {
            cursor: pointer;
            padding: 15px 30px;
            list-style: none;
            border: 0;
            border-bottom: 1px solid #ccc;
            transition: background 0.4s ease;

            div.ticket-item-user-avatar {
              margin: 16px 0;
              width: 65px;
              height: 65px;
              border-radius: 50%;
              border: 3px solid #81b826;
              background-repeat: no-repeat;
              background-size: cover;
              background-position: 50% 50%;
            }

            h4 {
              position: relative;
              font-size: 1rem;
            }

            div.info {
              span {
                margin-top: 3px;
                float: left;
              }

              div.message {
                width: 85%;
                white-space: nowrap;
                overflow: hidden !important;
                text-overflow: ellipsis;
                float: left;
                @media (min-width: 576px) {
                  width: 75%;
                }
              }
            }

            button {
              padding: 8px 14px;
              margin: 25px 8px;
              color: #b4b4b4;
              border: 2px solid #b4b4b4;
              background: transparent;
              border-radius: 50%;
              transition: all 0.4s ease;
              @media (min-width: 576px) {
                margin: 15px 8px;
              }

              &.circle-success:hover {
                color: #81b826;
                border-color: #81b826;
              }

              &.circle-warning:hover {
                color: #ffc107;
                border-color: #ffc107;
              }

              &.circle-danger:hover {
                color: #dc3545;
                border-color: #dc3545;
              }

            }

            &:hover, &.active {
              background: rgba(230, 230, 230, 1);
            }
          }
        }
      }
    }
  }

  &#messages {
    padding: 0;
    width: 100%;
    height: 90.1vh;

    header#messages-header {
      color: #fff;
      padding: 30px 45px;
      margin: 0;
      position: relative;
      height: 26vh;
      background: #bccbde;

      h3 {
        font-size: 1.35rem;
        line-height: 42px;
      }

      div.ticket-user-creator {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 80px;
        display: flex;

        div.ticket-user-creator-avatar {
          margin: 15px 10px 0 47px;
          width: 45px;
          height: 45px;
          background: transparent url('http://lorempixel.com/g/600/600/people/') 50% 50% no-repeat;
          background-size: cover;
          border-radius: 50%;
          border: 2px solid #81b826;
        }

        span {
          color: #fff;
          margin-top: 20px;
          margin-left: 5px;
          font-size: 18px;
          font-family: "PT Sans", sans-serif;
          letter-spacing: 1px;
        }

        div.ticket-user-contact {
          text-align: right;

          button {
            color: #fff;
            background: transparent;
            border: 0;
            font-size: 18px;
          }
        }
      }
    }

    section#messages-conversation {
      height: 55vh;
      background: whitesmoke !important;
      border: 0;

      div.message-receiver {
        padding: 8px;
        display: flex;

        div.message-receiver-avatar {
          margin: 8px 25px 0 0;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background: red;
        }

        div.message-receiver-body {
          color: #fff;
          margin-top: 15px;
          padding: 10px 16px;
          position: relative;
          width: auto;
          background: #81b826;
          border-radius: 4px;

          &:after {
            right: 100%;
            top: 37%;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
            border-color: rgba(136, 183, 213, 0);
            border-right-color: #81b826;
            border-width: 8px;
            margin-top: -8px;
          }
        }
      }

      div.message-sender {
        padding: 8px;
        width: 100%;

        div.message-sender-body {
          margin: 8px 25px 0 0;
          padding: 16px;
          position: relative;
          width: auto;
          background: #fff;
          border-radius: 4px;

          :after {
            left: 100%;
            top: 37%;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
            border-color: rgba(136, 183, 213, 0);
            border-left-color: #fff;
            border-width: 8px;
            margin-top: -8px;
          }
        }

        div.message-sender-audio {
          margin: 0 25px 5px 0;
          padding: 16px;
          width: auto;
          background: transparent;
          border-radius: 4px;
        }

        div.message-sender-avatar {
          margin: 8px 16px 0 0;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 50% 50%;
        }
      }
    }

    footer#messages-textarea {
      margin: 0;
      position: absolute;
      left: 0;
      bottom: 2px;
      width: 100%;
      background: whitesmoke;
      border-top: 1px solid rgba(220, 220, 220, 1);

      div#messages-textarea-editor {
        position: relative;
        width: 90%;
        height: 8vh;
        border-radius: 6px;

        textarea {
          padding: 30px 20px;
          width: 100%;
          border-radius: 0;
          border: 0;
          height: 80px;
          resize: none;
          background: whitesmoke;
          overflow: hidden;

          &:focus {
            outline: 0;
            border: 0;
          }
        }

        div#messages-textarea-editor-features {
          display: flex;

          button {
            color: #999;
            margin: 0;
            padding: 8px 15px;
            border: 0;
            font-size: 22px;
            background: whitesmoke;
            transition: all 0.6s ease;

            &:hover, &:focus {
              outline: 0;
              border: 0;
              color: #555555;
            }

            &#send-message {
              color: #fff;
              padding: 12px 18px;
              position: absolute;
              right: -1vw;
              bottom: 6.5vh;
              background: #81b826;
              border-radius: 50%;
              font-size: 18px;
              box-shadow: 1px 4px 4px #888;
              border: 1px solid #81b826;

              &:hover, &:focus {
                outline: 0;
                border: 0;
                color: #81b826;
                background: #fff;
                box-shadow: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<script>
const socketIO = require('socket.io-client');
const io = socketIO.io("http://localhost:3000")

export default {
  data: function () {
    return {
      user: {
        avatar: '',
        level: 5
      },
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

    // Recent activity
    io.on('activity:recent', (activity) => {
      this.user = "757365726176617461725f656475756265737361.jpg"
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
    acceptEventHandleClick: function (ticket) {
      ticket.isClosed = false;
      ticket.supported_by = "60dda0bcc36f5e2e131128bf";
      io.emit("activity:recent", `<strong>Eduardo Bessa</strong> Iniciou suporte ao ticket de <a href="/profile/${ticket.created_by.username}">${ticket.created_by.firstname} ${ticket.created_by.lastname}</a>`);

      // this.$http.patch('/ticket/accept', { slug : ticket.slug, user: "60dda0bcc36f5e2e131128bf" }, (err, ticket) => {
      //   if(err) throw err;
      //   ticket.isClosed = false;
      //   ticket.supported_by = "60dda0bcc36f5e2e131128bf";
      // }).catch((err) => {
      //   // eslint-disable-next-line no-console
      //   console.log(err);
      // });
    },

    /**
     * Solved and Close ticket
     * @param ticket
     */
    solvedEventHandleClick: function (ticket) {
      ticket.isClosed = true;
      io.emit("activity:recent", `<strong>Eduardo Bessa</strong> terminou o suporte ao ticket de <a href="/profile/${ticket.created_by.username}">${ticket.created_by.firstname} ${ticket.created_by.lastname}</a>`);
    },

    /**
     * Reopen ticket support
     * @param ticket
     */
    reopenEventHandleClick: function (ticket) {
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
    trashEventHandleClick: function (ticket, key) {
      io.emit("activity:recent", `<strong>Eduardo Bessa</strong> O ticket de <a href="/profile/${ticket.created_by.username}">${ticket.created_by.firstname} ${ticket.created_by.lastname}</a> foi apagado com sucesso!`);
      this.tickets.splice(key, 1);
    },
    upload: function (input) {
      switch (input) {
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
    eventChangePictureHandler: function () {
      this.$http.put(' /api/v1/messages/')
          .then((response) => {
            // eslint-disable-next-line no-console
            console.log(response);
          }).catch((err) => {
            alert(err.message);
      });
    },
    handleStartRecordingVoiceClick: async function () {
      const recorder = await this.audioMicrophoneRecording();
      this.isRecording = true;
      recorder.start()
    },
    handleStopRecordingVoiceClick: async function () {
      const recorder = await this.audioMicrophoneRecording();
      this.isRecording = false;
      recorder.stop();
      // eslint-disable-next-line no-console
      console.log("Stop fuck!");
    },
    sendMessage: function () {
      io.emit("chat:message", this.message);
      this.messages.push({send: true, body: this.message});
      this.message = null;
    },
  }
}
</script>

<template>
  <section v-if="user !== {} || user !== undefined" class="app">
    <header class="header">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">HelpMe!</a>
        <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                class="navbar-toggler mr-4 border-0" data-target="#navbarSupportedContent"
                data-toggle="collapse" type="button">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li :class="{ 'nav-item' : true, 'active' : pathname === '/tickets' || pathname === '/' }">
              <a class="nav-link" :href="pathname !== '/tickets' ? '/tickets' : false">Tickets</a>
            </li>
            <li :class="{ 'nav-item' : true,  'active' : pathname === '/trends' }">
              <a class="nav-link" :href="pathname !== '/trends' ? '/trends' : false">Trends</a>
            </li>
            <li :class="{ 'nav-item' : true,  'active' : pathname === '/apps' }" >
              <a class="nav-link" :href="pathname !== '/apps' ? '/apps' : false">Apps</a>
            </li>
            <li class="nav-item">
              <a @click="modal = true" aria-disabled="true" class="nav-link" href="#"
                 id="nav-new-ticket" tabindex="-1">
                <i class="fa fa-envelope mr-1"></i>
                Novo ticket
              </a>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" @click="$router.push('/profile/' + user.username)"><img class="nav-avatar" :src="'/images/' + user.avatar" alt="">{{ user.firstname }} {{ user.lastname}}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Sair</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <main class="main">
      <div class="container-fluid">
        <router-view></router-view>
      </div>
    </main>

    <transition name="fade">
      <section v-if="!is_loaded" class="page-loader">
        <div class="container">
          <div class="row">
            <div class="col-12 text-center">
              <div class="square"></div>
              <div class="square"></div>
              <div class="square"></div>
              <div class="square"></div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 mt-5">
              <p class="text-white text-center" id="loader-text">{{ current_phrase }}</p><br />
            </div>
          </div>
        </div>
      </section>

      <section class="lightbox" v-if="modal">
        <button @click="modal = false"  class="btn-close-modal"><i class="fa fa-times"></i></button>
        <div class="lightbox-content" @click="false">
          <div class="container-fluid">
           <div class="row">
             <div class="col-10 offset-1">
               <header>
                 <h4 class="text-center font-weight-bold">Estamos aqui para ajudar,</h4>
                 <p class="text-center">
                   Pedimos-te por favor que preenchas todo o formulário com o máximo de informação que consigas,
                   para chegarmos o mais rápido à solução que precisas, e forma a sermos eficazes
                 </p>
               </header>
             </div>
           </div>
            <div class="row mt-3">
              <div class="col-3 offset-1">
                <button :class="{ 'btn btn-default btn-select-square': true, 'btn-active': ticket.difficulty_level === 3 }" @click="ticket.difficulty_level = 3">
                  <p><strong>Eu sou iniciante</strong></p>
                  <p class="text-center"><small>Eu apenas sei utilizar o computador, para o trabalho ou lazer</small></p>
                </button>
              </div>
              <div class="col-3">
                <button :class="{ 'btn btn-default btn-select-square': true, 'btn-active': ticket.difficulty_level === 2 }" @click="ticket.difficulty_level = 2">
                  <p><strong>Eu sou intermédio</strong></p>
                  <p class="text-center"><small>Eu já sei instalar e configurar aplicações e o sistema.</small></p>
                </button>
              </div>
              <div class="col-3">
                <button :class="{ 'btn btn-default btn-select-square': true, 'btn-active': ticket.difficulty_level === 1 }" @click="ticket.difficulty_level = 1">
                  <p><strong>Eu sou profissional</strong></p>
                  <p class="text-center"><small>Tenho conhecimentos avançados, apenas preciso de explicação.</small></p>
                </button>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-12 offset-1">
                <p class="font-weight-bold">É a tua primeira vez que usa o HelpMe?</p>
                <button :class="{ 'btn btn-default btn-select btn-select': true, 'btn-active': ticket.first_time === 1 }" @click="ticket.first_time = true">Sim</button>
                <button :class="{ 'btn btn-default btn-select btn-select ml-2': true, 'btn-active': ticket.first_time === 0 }" @click="ticket.first_time = false">Não, já usei!</button>
              </div>
            </div>
            <div v-if="user.is_admin" class="row mt-4">
              <div class="col-12 offset-1">
                <p class="font-weight-bold">Este ticket é para ti?</p>
                <button :class="{ 'btn btn-default btn-select btn-select': true, 'btn-active': to_me === true }" @click="to_me = true">Sim</button>
                <button :class="{ 'btn btn-default btn-select btn-select ml-2': true, 'btn-active': to_me === false }" @click="to_me = false">Não!</button>
              </div>
            </div>
            <div v-if="!to_me" class="row mt-4">
              <div class="col-12 offset-1">
                <p class="font-weight-bold">Para quem?</p>
                <input class="form-control" type="text" v-model="ticket.author" />
              </div>
            </div>
            <div class="row">
              <div class="col-10 offset-1 mt-4">
                <p class="font-weight-bold">Qual a prioridade?</p>
                <select class="form-control" v-model="ticket.priority">
                  <option selected disabled>Seleciona a prioridade</option>
                  <option value="1">Baixa</option>
                  <option value="1">Baixa Média</option>
                  <option value="1">Média</option>
                  <option value="1">Alta Média</option>
                  <option value="1">Alta</option>
                  <option value="1">Urgente</option>
                </select>
              </div>
              <div class="col-10 offset-1 mt-4">
                <p class="font-weight-bold">Qual é o departamento?</p>
                <select class="form-control" v-model="ticket.department">
                  <option selected disabled>Selecione o departamento</option>
                  <option value="1">Administrativo</option>nodemo
                  <option value="1">Financeiro</option>
                  <option value="1">Informático</option>
                  <option value="1">Marketing</option>
                  <option value="1">Recursos Humandos</option>
                </select>
              </div>
              <div class="col-10 offset-1 mt-4">
                <p class="font-weight-bold">Descreve o que precisas:</p>
                <textarea class="form-control" v-model="ticket.description"></textarea>
              </div>
              <div class="col-10 offset-1 mt-4">
                <button class="btn btn-select float-right" @click="handleSubmitCreateNewTicketClick()">Criar ticket</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </transition>
  </section>

  <section v-else class="app">
    <main class="main">
      <div class="container-fluid">
        <router-view></router-view>
      </div>
    </main>
  </section>
</template>
<style lang="scss" scoped>
  @import "./resources/assets/scss/app.scss";
</style>
<script>
export default {
  data: () => {
    return {
      ticket: {
        author: null,
        priority: null,
        department: null,
        description: null,
        difficulty_level: 3,
        first_time: 1
      },
      user: {},
      to_me: false,
      modal: false,
      is_loaded: false,
      pathname: null,
      difficulty_level: 3,
      loader_phrases: [
          "A ligar o computador ...",
          "Aquecer o café ...",
          "Fazer pesquisas na internet ..."
      ],
      current_phrase: "A desenvolver o helpdesk ..."
    }
  },
  methods: {
    handleCreateNewTicketClick: function () {
      this.modal = true;
    },
    handleSubmitCreateNewTicketClick: function () {
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.pathname = window.location.pathname;

    document.onreadystatechange = () => {
      if (document.readyState === "complete") {
        setTimeout(() => {
          this.is_loaded = true;
        }, 1000);
      }
    }
  }
}
</script>

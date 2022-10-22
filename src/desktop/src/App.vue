<template>
  <section v-if="user !== {}" class="app">
    <header class="header">
      <div class="row">
        <div class="col-md-10">
          <span>Helpdesk - Estamos aqui para ajudar!</span>
        </div>
        <div class="col-md-2">
          <button class="text-white"><i class="fa fa-times"></i></button>
        </div>
      </div>
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
    handleSubmitCreateNewTicketClick: function () {
    }
  },
  created() {
    let _userLocalStorage = localStorage.getItem("user");
    this.pathname = window.location.pathname;

    if(_userLocalStorage !== null){
      this.user = JSON.parse(_userLocalStorage);
    }

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

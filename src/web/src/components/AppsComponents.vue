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
                <li :class="{ 'active' : $route.path == '/apps/system'}" @click="$router.push('/tickets/my-new')">
                  System
                </li>
                <li :class="{ 'active' : $route.path == '/apps/users'}" @click="$router.push('/tickets/closed')">By
                  User
                </li>
                <li :class="{ 'active' : $route.path == '/apps/support'}" @click="$router.push('/tickets/closed')">
                  Support
                </li>
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
      <section id="apps"
               :class="{ 'col-md-12 col-lg-6' : app_selected != null, 'col-md-12 col-lg-10' : app_selected == null }">
        <header id="apps-header" class="col-12">
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
        <nav id="nav-apps" v-if="apps.length > 0">
          <article class="app text-center" v-for="(app, index) in apps" :key="index">
            <img class="mt-3" :src="app.brand" width="56px"/>
            <h5 class="font-weight-bold mt-3">{{ app.title }}</h5>
            <p class="text-center mt-3">{{ app.description }}</p>
            <button class="btn btn-default">Selecionar</button>
          </article>
        </nav>
        <div class="py-5" v-else>
          <p class="text-center">Neste momento não temos registo de nenhuma aplicação!</p>
        </div>
      </section>
      <section id="app-details" class="col-md-7 col-lg-4">
        <header id="app-detail-header">
          teste
        </header>
      </section>
    </div>
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
      apps: [],
      app_selected: null
    }
  },
  mounted: function () {
    this.user = JSON.parse(localStorage.getItem('user'));
    // Recent activity
    io.on('activity:recent', (activity) => {
      if (this.activities.length >= 5) {
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

    // Temp
    this.apps = [
      {
        brand: 'https://upload.wikimedia.org/wikipedia/commons/3/31/TeamViewer_Logo_Icon_Only.svg',
        title: 'TeamViewer',
        description: 'Pacote de software proprietario para acesso remoto, partilha de área de trabalho, entre outras...'
      },
      {
        brand: 'https://camo.githubusercontent.com/e8d69359439d6bde385fccc98ad6920b98fc8355e43b2aa678b66b69bded0ac3/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f343732313330392f3636343330362f66373865356161302d643738312d313165322d383766612d3338626635363164656233392e706e67',
        title: 'MS Office 365 Enterprise',
        description: 'Conjunto de aplicações para produtividade/escritório com acesso a cloud online.'
      },
      {
        brand: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Microsoft_Skype_for_Business_logo.png',
        title: 'Skype',
        description: 'Software que permite comunicação pela internet, com ligações de voz e de video.'
      },
      {
        brand: 'https://user-images.githubusercontent.com/674621/71187801-14e60a80-2280-11ea-94c9-e56576f76baf.png',
        title: 'Visual Studio Code',
        description: 'O Visual Studio Code é um editor de código-fonte desenvolvido pela Microsoft.'
      },
      {
        brand: 'https://logodix.com/logo/555156.png',
        title: 'Microsoft Visual Studio',
        description: 'Ambiente de desenvolvimento integrado da Microsoft para desenvolvimento de software.'
      }
    ];
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
  methods: {}
}
</script>
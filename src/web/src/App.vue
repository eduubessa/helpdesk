<template>
  <section class="app">
    <header class="header">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Help Me</a>
        <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                class="navbar-toggler mr-4 border-0" data-target="#navbarSupportedContent"
                data-toggle="collapse" type="button">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/tickets">Tickets</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/trends">Trends</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/apps">Apps</a>
            </li>
            <li class="nav-item">
              <a @click="onHandleClickFormNewTicket()" aria-disabled="true" class="nav-link" href="#"
                 id="nav-new-ticket" tabindex="-1">
                <i class="fa fa-envelope mr-1"></i>
                Novo ticket
              </a>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link nav-avatar"
                 style="background-image: url('/images/757365726176617461725f656475756265737361.jpg')" href="#"></a>
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

    <section v-if="!isloaded" class="page-loader">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </section>

    <footer class="footer">
      <section class="lightbox" v-if="formNewTicket === true">
        <div class="lightbox-content">
          <h4 class="text-center mt-2">Novo ticket!</h4>
          <p class="text-center">Preenche o formulário, para pedires ajuda!</p>
          <div class="row">
            <div class="col-4 offset-2">
              sdhjfgjsdgfjgsdaf
            </div>
            <div class="col-4">
              sdhjfgjsdgfjgsdaf
            </div>
          </div>
          <div class="input-group">
            <input v-model="ticket.title" type="text" name="title"/>
          </div>
          <div class="input-group">
            <input v-model="ticket.title" type="text" name="title"/>
          </div>
        </div>
      </section>
    </footer>
  </section>
</template>
<style lang="scss">
nav.navbar {
  padding: 0;
  margin: 0;

  a.navbar-brand {
    padding: 22px 32px;
    font-size: 1rem;
    background: #81b826;
    font-family: "Poppins";
    letter-spacing: 2px;
  }

  ul.navbar-nav {
    li.nav-item {
      cursor: pointer;
      padding: 0 12px;
      font-family: "Roboto", sans-serif;
      letter-spacing: 2px;
      transition: all 0.4s ease;
      border-right: 1px solid #555;
      font-size: .8rem;

      &:nth-child(3), &:last-child {
        border: 0;
      }

      a.nav-link {
        color: #999;
        margin: 10px;
        padding: 8px 22px;
        text-transform: uppercase;
        transition: all 0.4s ease;
        font-size: 0.8rem;
        letter-spacing: 3px;
        border-bottom: 2px solid transparent;

        &#nav-new-ticket {
          padding: 7px 26px 3px 26px;
          margin: 16px;
          color: #fff;
          border-radius: 24px;
          letter-spacing: 2px;
          background: #81b826;
          font-size: 14px;
          font-weight: 600;

          &:hover {
            color: #81b826;
            background: #fff;
            border-color: transparent;
          }
        }
      }

      &:hover, &.active {
        a {
          color: #fff;
          border-bottom: 2px solid #81b826;
        }
      }
    }

    .nav-avatar {
      padding: 0;
      margin: 0;
      width: 32px;
      height: 32px;
      background-size: cover;
      border-radius: 50%;
    }
  }
}

section.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: rgba(52, 58, 64, 1);
  display: flex;
  z-index: 999;

  div.square {
    margin-right: 8px;
    width: 22px;
    height: 22px;
    background: #81b826;
    display: inline-flex;
    $colors: #81b826, #FFFFFF, #81b826, #FFFFFF;
    border-radius: 50%;
    @for $i from 1 through length($colors) {
      &:nth-child(#{$i}) {
        background-color: nth($colors, $i);
      }
    }

    &:first-child, &:nth-child(3) {
      animation: greenToWhite 1s infinite;
      animation-delay: 0s;
    }

    &:nth-child(2), &:last-child {
      animation: whiteToGreen 1s infinite;
      animation-delay: 2s;
    }
  }
}

@keyframes greenToWhite {
  from {
    background-color: #81b826;
  }
  to {
    background-color: #ffffff;
  }
}

@keyframes whiteToGreen {
  from {
    background-color: #ffffff;
  }
  to {
    background-color: #81b826;
  }
}

section.lightbox {
  padding: 0;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  align-content: center;
  justify-items: center;
  background: rgba(0, 0, 0, 0.5);
  display: flex;

  div.lightbox-content {
    padding: 12px;
    margin: 27vh auto;
    width: 50%;
    height: 40vh;
    border-radius: 4px;
    align-content: center;
    justify-items: center;
    background: #fff;
  }
}
</style>
<script>
export default {
  data: () => {
    return {
      ticket: {},
      isloaded: false,
      formNewTicket: false
    }
  },
  methods: {
    onHandleClickFormNewTicket: function () {
      this.formNewTicket = true;
    }
  },
  created() {
    document.onreadystatechange = () => {
      if (document.readyState === "complete") {
        setTimeout(() => {
          this.isloaded = true;
        }, 500);
      }
    }
  }
}
</script>

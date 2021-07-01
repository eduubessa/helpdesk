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
              <a class="nav-link" href="#">Tickets</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Trends</a>
            </li>
            <li class="nav-item">
              <a aria-disabled="true" class="nav-link disabled" href="#" tabindex="-1">Apps</a>
            </li>
            <li class="nav-item">
              <a @click="onHandleClickFormNewTicket()" aria-disabled="true" class="nav-link" href="#" id="nav-new-ticket" tabindex="-1">
                <i class="fa fa-envelope mr-1"></i>
                Novo ticket
              </a>
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

    <footer class="footer">
      <section class="lightbox" v-if="formNewTicket === true">
        <div class="lightbox-content">
          hksadhfkhjsadhf
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
    data: function () {
      return {
        formNewTicket: false
      }
    },
    methods: {
      onHandleClickFormNewTicket: function () {
        this.formNewTicket = true;
      }
    }
  }
</script>

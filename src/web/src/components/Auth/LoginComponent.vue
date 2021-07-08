<template>
  <div>
    <section class="auth">
      <div class="container-fluid">
        <div class="row">
          <aside class="col-md-6">
            <div class="image"></div>
            <div class="aside-container">
              <header>
                <p><i class="fa fa-comments"></i></p>
                <h1>Welcome</h1>
                <p>It's hot ouside ... Enter!</p>
              </header>
              <footer>
                <ul class="bullets">
                  <li>Temos prontos para ajudar!</li>
                  <li>Suporte rápido, simples, e eficaz</li>
                  <li>Fale com os nossos técnicos em tempo real</li>
                </ul>
              </footer>
            </div>
          </aside>
          <section class="col-md-6 bg-white">
            <div class="form-container">
              <header>
                <h5>Iniciar sessão</h5>
                <h1>Helpdesk</h1>
                <p>O suporte cada vez mais perto de si!</p>
              </header>
              <div class="row">
                <div class="container">
                  <div class="input-group">
                    <input class="form-control" type="text" placeholder="Utilizador" name="username" id="input-username" form="auth-sign">
                  </div>
                  <div class="input-group">
                    <input class="form-control" type="text" placeholder="Password" name="username" id="input-password" form="auth-sign">
                  </div>
                  <div class="container-fluid">
                    <button @click="authentication()" class="btn btn-default pull-right">Entrar</button>
                  </div>
                </div>
              </div>
              <form action="/auth/login" method="post" id="auth-sign"></form>
              <div class="row">
                   <div class="col-10 offset-1 text-center mt-5">
                     Quero criar uma <a class="ml-1" href="/auth/create-account">conta</a>
                     <span class="ml-4 mr-4">&bull;</span>
                     Esqueci-me da minha <a class="ml-1" href="/auth/recover-account">password</a>
                   </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss">
section.auth {
  padding: 0;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: pink;
  overflow: hidden;
  aside {
    div.image {
      margin: 0;
      padding: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100vh;
      background-size: auto 100%;
      background-repeat: no-repeat;
      background-image: url('https://images.pexels.com/photos/2588757/pexels-photo-2588757.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
      background-attachment: fixed;
    }
    div.aside-container {
      color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(129, 184, 38, 0.8);
      header {
        margin-top: 10vh;
        i {
          margin: 1vh;
          font-size: 8rem;
          text-align: center;
        }
        h1 {
          margin-top: 5vh;
          margin-bottom: 2vh;
          font-family: "PT Sans", sans-serif;
          font-weight: bold;
          text-align: center;
          font-size: 3rem;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        p {
          text-align: center;
          font-size: 1.02rem;
          letter-spacing: 3px;
          text-transform: uppercase;

        }
      }
      footer {
        position: absolute;
        top: 75vh;
        .bullets {
          position: relative;
          left: 6vw;
          font-size: 1rem;
          line-height: 40px;
          font-family: "PT Sans", sans-serif;
        }
      }
    }
  }

  section {
    header {
      h5 {
        color: #81b826;
        margin: 3vh 2vw;
        font-weight: bold;
        font-size: 1rem;
        font-family: "PT Sans", sans-serif;
        text-transform: uppercase;
      }
      h1 {
        margin: 10vh auto 0 auto;
        width: 70%;
        font-size: 2rem;
        font-weight: bold;
        text-transform: uppercase;
      }
      p {
        margin: 2vh auto;
        width: 70%;
        font-weight: bold;
        font-size: 1.5rem;
        font-family: "PT Sans", sans-serif;
      }
    }
    div.form-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: #fff;
      .container {
        margin: 0 auto;
        width: 73%;
        .form-control {
          margin: 3vh 0;
          border: 0;
          width: 70%;
          border-bottom: 1px solid #81b826;
          &:focus, &:active {
            outline: none !important;
          }
        }
        button {
          color: #fff;
          margin: 3vh 0;
          width: 170px;
          border-radius: 20px;
          border: 1px solid #81b826;
          background: #81b826;
          &:focus, &:active {
            outline: none;
            border: 0;
          }
        }
      }
    }
  }
}
</style>
<script>
  export default {
    data () {
      return {
        user: {}
      }
    },
    methods: {
      fetchUser: function () {
        //let self = this;
        this.$http.get('/api/v1/users', (err, users) => {
          // eslint-disable-next-line no-console
          console.log(users)
        });
      },
      authentication: function () {

      }
    }
  }
</script>
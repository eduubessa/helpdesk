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
                    <input class="form-control" v-model="username" type="text" placeholder="Utilizador" name="username" id="input-username" form="auth-sign">
                  </div>
                  <div class="input-group">
                    <input @keyup.enter="authentication" v-model="password" class="form-control" type="password" placeholder="Password" name="username" id="input-password" form="auth-sign">
                  </div>
                  <div class="container-fluid">
                    <button @click="authentication" class="btn btn-default pull-right">Entrar</button>
                  </div>
                </div>
              </div>
              <form action="/auth/login" method="post" id="auth-sign"></form>
              <div class="row">
                   <div class="col-10 offset-1 text-center mt-5">
                     Quero criar uma <a class="ml-1" href="/auth/sign-up">conta</a>
                     <span class="ml-4 mr-4">&bull;</span>
                     Esqueci-me da minha <a class="ml-1" href="/auth/recover-account">password</a>
                   </div>
              </div>
            </div>
            <transition name="slide-fade">
              <div v-if="error != null" class="alert alert-danger text-center mt-3">{{ error }}</div>
            </transition>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
  @import "./../../resources/assets/scss/login.scss";
</style>
<script>
  export default {
    data () {
      return {
        user: {},
        error: null,
        username: null,
        password: null
      }
    },
    methods: {
      authentication: function () {
        if(this.password.length > 3){
          this.$http.post('/api/v1/auth/sign-in', {
            username: this.username,
            password: this.password
          }).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            if(localStorage.getItem('token') != null){
              this.$emit('logged_in');
              if(this.$route.query.redirect_to != null) {
                this.$router.push("/" + this.$route.query.redirect_to)
              }else{
                if(response.data.user.is_admin === true){
                  this.$router.push('/tickets');
                }else{
                  this.$router.push('/apps');
                }
              }
            }
          }).catch((err) => {
            // eslint-disable-next-line no-console
            console.error(err);
            this.password = null;
            this.error = "Utilizador ou password introduzidos estão incorretos, tente novamente!";
            setTimeout(() => { this.error = null}, 6000)
          });
        }
      }
    }
  }
</script>

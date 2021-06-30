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
                  <li>Fale com os nossos tecnicos em tempo real</li>
                </ul>
              </footer>
            </div>
          </aside>
          <section class="col-md-6 bg-white">
            <div class="form-container"></div>
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
      background-image: url('https://images.unsplash.com/photo-1604754742629-3e5728249d73?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80');
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
        margin-top: 15vh;
        i {
          margin: 3vh;
          font-size: 6rem;
          text-align: center;
        }
        h1 {
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
          font-size: 1rem;
          letter-spacing: 3px;
          text-transform: uppercase;

        }
      }
      footer {
        position: absolute;
        top: 80vh;
        .bullets {
          font-size: 1rem;
          line-height: 30px;
          font-family: "PT Sans", sans-serif;
        }
      }
    }
  }

  section {
    div.form-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: #fff;
    }
  }
}
</style>
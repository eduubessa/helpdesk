<template>
    <div>
        <section class="auth">
            <div class="container-fluid">
                <div class="row">
                    <aside class="col-lg-5">
                        <div class="aside-container"></div>
                    </aside>
                    <section class="col-lg-7 bg-white">
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
           div.aside-container {
               position: absolute;
               top: 0;
               left: 0;
               width: 100%;
               height: 100vh;
               background: #81b826;
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
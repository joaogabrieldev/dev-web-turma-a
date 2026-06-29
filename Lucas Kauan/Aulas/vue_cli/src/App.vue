<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Meu App Vue</h1>
    <p class="subtitulo">Meu subtitulo</p>
    <br/>
    <home-component />
    <hr />
    <home-component />
    <br />
    <usuario-component v-show="isUsuarioVisivel" />
    <br />
    <estilo-component/>
    <br/>
    <imagem-component @visibilidade-img="escutarVisibilidadeImg" widthImg="1000" urlImg="https://d24am.com/wp-content/uploads/2025/01/Gordao-da-XJ.png"/>
    <br/>
    <imagem-component @visibilidade-img="escutarVisibilidadeImg" widthImg="500" urlImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUBbTNN3YnU0SFmfpdLEufXzylBeQI1X5VAg&s"/>
    <br/>
    <imagem-component @visibilidade-img="escutarVisibilidadeImg" widthImg="500" urlImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFvyiiKCt4liEGUJPkKWdsDNYSNMiL2NBTSg&s"/>
  </div>
</template>

<script>
import EstiloComponent from './components/EstiloComponent.vue';
import HomeComponent from './components/HomeComponent.vue';
import ImagemComponent from './components/ImagemComponent.vue';
import UsuarioComponent from './components/UsuarioComponent.vue';

export default {
  name: 'App',
  components: {
    HomeComponent,
    UsuarioComponent,
    EstiloComponent,
    ImagemComponent,
  },
  data (){
  return {
    isUsuarioVisivel: false,
    };
  },
  methods: {
  escutarVisibilidadeImg(isImgComponentVisivel) {
    this.isUsuarioVisivel = !isImgComponentVisivel;
    },
  },
  created() {
    console.log("created");
  },
  mounted () {
    console.log("mounted");
  },
  updated() {
    console.log("updated");
  },
  errorCaptured() {
    console.log("errorCaptured");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  color: darkmagenta;
}

.subtitulo {
    color: darkseagreen;
    font-family: 'Gill Sans';
    text-align: center;
}

</style>

<template>
    <div>
       <h1>Título Componente</h1>
       <p class="subtitulo">Subtítulo do Componente</p>
    </div>
</template>

<script>
     export default {
        name: "EstiloComponent",
     };
</script>

<style scoped>
     h1 {
        color: greenyellow;
     }

     .subtitulo {
        font-family: 'Times New Roman', Times, serif;
        text-align: left;
        color: darkred;
     }
</style>
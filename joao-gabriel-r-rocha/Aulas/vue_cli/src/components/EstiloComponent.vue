<template>
    <div>
        <h1>Titulo do Componente</h1>
        <p class="subtitulo">Subtitulo do Componente</p>
    </div>
</template>

<script>

    export default{
        name: "EstiloComponent",
    };

</script>


<style scoped>
h1 {
    color: rgb(197, 71, 165);

}

.subtitulo{
    color: rgb(255, 145, 0);    

    text-align: center;
}

</style>
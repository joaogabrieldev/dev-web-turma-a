<template>
    <div>
        <footer id="footer">
            <p> Bem vindo: {{ nome }} Olá mundo do <b> VUE com CLI</b></p>
        </footer>
    </div>

</template>

<script>
    export default{
        name: "HomeComponent",
        data(){
            return{
                nome: "Lucas",
            };
        }
    }

</script>
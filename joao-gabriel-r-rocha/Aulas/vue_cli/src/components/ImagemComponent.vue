<template>
    <div>
        <img 
        v-show="isImgVisivel" 
        src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
        />
        <br/>
        <button @click="apareceEsconde()">{{ nomeBotao }}</button>
    </div>
</template>


<script>
 
    export default {
        name: "ImagemComponent",
        data() {
            return{
                isImgVisivel: false,
                nomeBotao: "Aparecer",
            };
        },
        methods: {
            apareceEsconde(){
                this.isImgVisivel = !this.isImgVisivel;
                if(this.isImgVisivel){
                    this.nomeBotao = "Esconder";
                }else {
                    this.nomeBotao = "Aparecer";
                }
            },
        },
    };

</script>


<style scoped>

</style>
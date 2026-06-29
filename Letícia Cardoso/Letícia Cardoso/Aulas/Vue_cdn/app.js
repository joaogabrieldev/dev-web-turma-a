const meuAppVue = {
    data(){
        return{
            nome: "Letícia",
            idade: 18,
            inputText:"",
        };
    },
    
};

Vue.createApp(meuAppVue).mount("#app"); 
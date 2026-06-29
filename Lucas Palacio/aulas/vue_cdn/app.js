const meuAppVue = {
    data(){
        return{
            nome : "Lucas Palacio",
            idade:20,
            inputText:"",
        };
    }
};


Vue.createApp(meuAppVue).mount("#app");
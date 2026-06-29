const meuAppVue = {
    data() {
        return {
            nome: "Lucas",
            idade: 19,
            inputText: "",
        };
    },
};

Vue.createApp(meuAppVue).mount("#app"); 
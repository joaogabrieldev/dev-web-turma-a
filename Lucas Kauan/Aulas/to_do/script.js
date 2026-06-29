window.onload = function () {
    const input = this.document.getElementById("tarefaInput")
    const btnAdicionar = this.document.getElementById("btnAdicionar")
    const lista = this.document.getElementById("listaTarefas")

    btnAdicionar.addEventListener("click", () => {
        //recupera o valor do compo text
        const texto = input.value.trim();
        
        //Criar um elemento da minha lista de Tarefas
        const li = this.document.createElement("li");
        
        //Adicionar o valor do input do meu item da lista
        li.textContent = texto;
        
        //Adicionando o click para risca a tarefa
        li.addEventListener("click", () => {
            li.classList.toggle("concluida")
        });
        
        //Criação do Botão de Excluir
        const btnRemover = this.document.createElement("button");
        btnRemover.textContent = "x";
        
        //Adiciona a classe de estilo do botão fechar
        btnRemover.classList.add("fechar");

        btnRemover.addEventListener("click", () => {
            li.remove();
        });
        
        //Adicionando o botão X na LI (Item)
        li.appendChild(btnRemover);

        //Adiciona o item na lista para ser apresentado
        lista.appendChild(li);

        //Limpa o valor após adição
        input.value = "";

    });
}
window.onload = function() {

    const input = this.document.getElementById("tarefaInput");
    const btnAdicionar = this.document.getElementById("btnAdicionar");
    const lista = this.document.getElementById("listaTarefas");


    btnAdicionar.addEventListener("click",() => {
        
        //recupera o valor o campo input text
        const texto = input.value.trim();
        
        //criar um elemento da ,imha lista de tarefas
        const li = this.document.createElement("li");

        //Adicionar o valor do input no meu item da lista
        li.textContent = texto;
       
       //adicionando o click para riscar a tarefa
        li.addEventListener("click",() => {
            li.classList.toggle("concluida");
        });
        //criação do botão x na li
        const btnRemover = this.document.createElement("button");
        btnRemover.textContent= "x";
        //add a casse de estilo do botão fechar
        btnRemover.classList.add("fechar");
        
        
        btnRemover.addEventListener("click",() => {
            li.remove();
        });
    //adiciona o botão x na li(item)
        li.appendChild(btnRemover)

        //Adiciona item na lista para ser apresentado
        lista.appendChild(li);

        //Limpa o valor após a adição
        input.value ="";

       


    });
};
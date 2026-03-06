window.onload = function () {
  const input = this.document.getElementById("tarefaInput");
  const btnAdicionar = this.document.getElementById("btnAdicionar");
  const listaTarefas = this.document.getElementById("listaTarefas");

  btnAdicionar.addEventListener("click", () => {
    if (!input.value) return;

    const texto = input.value.trim();

    const li = this.document.createElement("li");

    li.textContent = texto;

    li.addEventListener("click", () => {
      li.classlist.toggle("concluida");
    });

    const btnRemover = this.document.createElement("button");
    btnRemover.textContent = "x";
    btnRemover.classlist.add("fechar");
    btnRemover.addEventListener("click", () => {
      li.remove();
    });
    li.appendChild(btnRemover);

    listaTarefas.appendChild(li);
    input.value = "";
  });
};

const API = "https://trab1-restapi-martimd11-t4qs.onrender.com/alunos";

// Carregar alunos ao abrir a página
document.addEventListener("DOMContentLoaded", carregarAlunos);

function carregarAlunos() {
  fetch(`${baseURL}/alunos`)
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById("listaAlunos");
      lista.innerHTML = "";
      data.forEach(aluno => {
        const li = document.createElement("li");
        li.textContent = `${aluno.nome} ${aluno.apelido} - ${aluno.curso} (${aluno.anoCurricular}º ano)`;
        lista.appendChild(li);
      });
    });
}

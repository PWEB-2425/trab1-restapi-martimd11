const baseURL = "https://teu-api.onrender.com/api"; // <-- Muda para o teu link do Render

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

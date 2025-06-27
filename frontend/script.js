const baseURL = "https://trab1-restapi-martimd11-t4qs.onrender.com"; // URL da API real

let alunoIdEditando = null;

// Carregar alunos ao abrir a página
document.addEventListener("DOMContentLoaded", carregarAlunos);

// Função para carregar os alunos
function carregarAlunos() {
  fetch(`${baseURL}/alunos`)
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById("lista-alunos");
      lista.innerHTML = "";  // Limpar a lista de alunos

      // Criar um item de lista para cada aluno
      data.forEach(aluno => {
        const li = document.createElement("li");
        li.textContent = `${aluno.nome} ${aluno.apelido} - ${aluno.curso} (${aluno.anoCurricular}º ano)`;

        // Botão para editar
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.onclick = () => editarAluno(aluno);

        // Botão para apagar
        const btnApagar = document.createElement("button");
        btnApagar.textContent = "Apagar";
        btnApagar.onclick = () => apagarAluno(aluno._id);

        li.appendChild(btnEditar);
        li.appendChild(btnApagar);
        lista.appendChild(li);
      });
    })
    .catch(err => console.error('Erro ao carregar alunos: ', err));
}

// Função para editar um aluno
function editarAluno(aluno) {
  alunoIdEditando = aluno._id;
  document.getElementById("nome").value = aluno.nome;
  document.getElementById("apelido").value = aluno.apelido;
  document.getElementById("curso").value = aluno.curso;
  document.getElementById("ano").value = aluno.anoCurricular;
}

// Função para adicionar ou editar aluno
document.getElementById("form-aluno").addEventListener("submit", async e => {
  e.preventDefault();

  const aluno = {
    nome: nome.value,
    apelido: apelido.value,
    curso: curso.value,
    anoCurricular: Number(ano.value)
  };

  if (alunoIdEditando) {
    // Editar aluno
    await fetch(`${baseURL}/alunos/${alunoIdEditando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno)
    });
    alunoIdEditando = null; // Limpar a variável após editar
  } else {
    // Adicionar um novo aluno
    await fetch(`${baseURL}/alunos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno)
    });
  }

  // Resetar o formulário e recarregar a lista
  e.target.reset();
  carregarAlunos();
});

// Função para apagar um aluno
async function apagarAluno(id) {
  await fetch(`${baseURL}/alunos/${id}`, { method: "DELETE" });
  carregarAlunos(); // Recarregar a lista após apagar
}

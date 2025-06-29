const API_URL = "https://trab1-restapi-martimd11.onrender.com/api";

const form = document.getElementById("aluno-form");
const btnGuardar = document.getElementById("btn-guardar");
const btnAtualizar = document.getElementById("btn-atualizar");
const tabela = document.querySelector("#tabela-alunos tbody");

let idAtualizar = null;

window.onload = () => {
  carregarAlunos();
  btnAtualizar.style.display = "none";
};

async function carregarAlunos() {
  tabela.innerHTML = "";
  const resposta = await fetch(`${API_URL}/alunos`);
  const alunos = await resposta.json();

  alunos.forEach(aluno => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.apelido}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.anoCurricular}</td>
      <td>
        <button onclick="preencherFormulario('${aluno._id}')">Editar</button>
        <button onclick="apagarAluno('${aluno._id}')">Apagar</button>
      </td>
    `;
    tabela.appendChild(linha);
  });
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  const aluno = {
    nome: form.nome.value,
    apelido: form.apelido.value,
    curso: form.curso.value,
    anoCurricular: parseInt(form.anoCurricular.value)
  };

  if (idAtualizar) {
    await fetch(`${API_URL}/alunos/${idAtualizar}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno)
    });
    idAtualizar = null;
    btnAtualizar.style.display = "none";
    btnGuardar.style.display = "inline";
  } else {
    await fetch(`${API_URL}/alunos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno)
    });
  }

  form.reset();
  carregarAlunos();
});

async function preencherFormulario(id) {
  const resposta = await fetch(`${API_URL}/alunos/${id}`);
  const aluno = await resposta.json();

  form.nome.value = aluno.nome;
  form.apelido.value = aluno.apelido;
  form.curso.value = aluno.curso;
  form.anoCurricular.value = aluno.anoCurricular;

  idAtualizar = id;
  btnGuardar.style.display = "none";
  btnAtualizar.style.display = "inline";
}

async function apagarAluno(id) {
  await fetch(`${API_URL}/alunos/${id}`, {
    method: "DELETE"
  });
  carregarAlunos();
}

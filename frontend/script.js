const API_URL = 'https://trab1-restapi-martimd11-t4qs.onrender.com/api/alunos';

let alunos = [];
let alunoAtualId = null;

const tabelaBody = document.querySelector('#tabela-alunos tbody');
const form = document.getElementById('aluno-form');
const inputNome = document.getElementById('nome');
const inputApelido = document.getElementById('apelido');
const inputCurso = document.getElementById('curso');
const inputAno = document.getElementById('anoCurricular');
const btnGuardar = document.getElementById('btn-guardar');
const btnAtualizar = document.getElementById('btn-atualizar');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const novoAluno = {
    nome: inputNome.value,
    apelido: inputApelido.value,
    curso: inputCurso.value,
    anoCurricular: Number(inputAno.value),
  };

  if (alunoAtualId) {
    await fetch(`${API_URL}/${alunoAtualId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoAluno),
    });
    alunoAtualId = null;
    btnGuardar.style.display = 'inline-block';
    btnAtualizar.style.display = 'none';
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoAluno),
    });
  }

  form.reset();
  carregarAlunos();
});

async function carregarAlunos() {
  const resposta = await fetch(API_URL);
  alunos = await resposta.json();

  tabelaBody.innerHTML = '';
  alunos.forEach((aluno) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.apelido}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.anoCurricular}</td>
      <td>
        <button onclick="editarAluno('${aluno._id}')">Editar</button>
        <button onclick="apagarAluno('${aluno._id}')">Apagar</button>
      </td>
    `;
    tabelaBody.appendChild(tr);
  });
}

window.editarAluno = function (id) {
  const aluno = alunos.find((a) => a._id === id);
  if (!aluno) return;

  alunoAtualId = id;
  inputNome.value = aluno.nome;
  inputApelido.value = aluno.apelido;
  inputCurso.value = aluno.curso;
  inputAno.value = aluno.anoCurricular;

  btnGuardar.style.display = 'none';
  btnAtualizar.style.display = 'inline-block';
};

window.apagarAluno = async function (id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  carregarAlunos();
};

carregarAlunos();

const API = 'http://localhost:3001/alunos';

async function carregarAlunos() {
  const resposta = await fetch(API);
  const alunos = await resposta.json();
  const lista = document.getElementById('aluno-lista');
  lista.innerHTML = '';
  alunos.forEach(aluno => {
    const item = document.createElement('li');
    item.textContent = `${aluno.nome} ${aluno.apelido} - ${aluno.curso} (${aluno.anoCurricular}º ano)`;
    lista.appendChild(item);
  });
}

carregarAlunos();
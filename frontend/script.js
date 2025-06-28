const baseURL = "https://trab1-restapi-martimd11-t4qs.onrender.com"; // ATUALIZE COM SUA URL DO RENDER
let alunoIdEditando = null;

// Carregar alunos
async function carregarAlunos() {
  try {
    const response = await fetch(baseURL);
    if (!response.ok) throw new Error('Erro ao carregar');
    const alunos = await response.json();
    
    const lista = document.getElementById('lista-alunos');
    lista.innerHTML = '';
    
    alunos.forEach(aluno => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${aluno.nome} ${aluno.apelido} - ${aluno.curso} (${aluno.anoCurricular}º ano)
        <button onclick="editarAluno('${aluno._id}')">Editar</button>
        <button onclick="apagarAluno('${aluno._id}')">Apagar</button>
      `;
      lista.appendChild(li);
    });
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao carregar alunos');
  }
}

// Editar aluno
async function editarAluno(id) {
  try {
    const response = await fetch(`${baseURL}/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar aluno');
    const aluno = await response.json();
    
    alunoIdEditando = id;
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('apelido').value = aluno.apelido;
    document.getElementById('curso').value = aluno.curso;
    document.getElementById('ano').value = aluno.anoCurricular;
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Apagar aluno
async function apagarAluno(id) {
  if (!confirm('Tem certeza?')) return;
  try {
    const response = await fetch(`${baseURL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Erro ao apagar');
    carregarAlunos();
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Formulário
document.getElementById('form-aluno').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const aluno = {
    nome: document.getElementById('nome').value,
    apelido: document.getElementById('apelido').value,
    curso: document.getElementById('curso').value,
    anoCurricular: parseInt(document.getElementById('ano').value)
  };

  try {
    if (alunoIdEditando) {
      // Atualizar
      await fetch(`${baseURL}/${alunoIdEditando}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aluno)
      });
      alunoIdEditando = null;
    } else {
      // Criar novo
      await fetch(baseURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aluno)
      });
    }
    
    document.getElementById('form-aluno').reset();
    await carregarAlunos();
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao salvar');
  }
});

// Iniciar
document.addEventListener('DOMContentLoaded', carregarAlunos);
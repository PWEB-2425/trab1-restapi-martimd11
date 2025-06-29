const baseURL = "https://trab1-restapi-martimd11-t4qs.onrender.com/api/alunos"; 
let alunoIdEditando = null;

// Função aprimorada para carregar alunos
async function carregarAlunos() {
  try {
    const response = await fetch(baseURL);
    if (!response.ok) throw new Error('Erro ao carregar alunos');
    const alunos = await response.json();
    
    const lista = document.getElementById('lista-alunos');
    lista.innerHTML = '';
    
    alunos.forEach(aluno => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="aluno-info">
          ${aluno.nome} ${aluno.apelido} - ${aluno.curso} (${aluno.anoCurricular}º ano)
        </span>
        <button class="btn-editar" onclick="editarAluno('${aluno._id}')">✏️ Editar</button>
        <button class="btn-apagar" onclick="apagarAluno('${aluno._id}')">🗑️ Apagar</button>
      `;
      lista.appendChild(li);
    });
  } catch (error) {
    console.error('Erro:', error);
    alert('Falha ao carregar alunos. Verifique o console.');
  }
}

// Função para editar aluno
window.editarAluno = async function(id) {
  try {
    const response = await fetch(`${baseURL}/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar aluno');
    
    const aluno = await response.json();
    alunoIdEditando = id;
    
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('apelido').value = aluno.apelido;
    document.getElementById('curso').value = aluno.curso;
    document.getElementById('ano').value = aluno.anoCurricular;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    console.error('Erro ao editar:', error);
  }
};

// Função para apagar aluno
window.apagarAluno = async function(id) {
  if (!confirm('Tem certeza que deseja apagar este aluno?')) return;
  
  try {
    const response = await fetch(`${baseURL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Erro ao apagar');
    await carregarAlunos();
  } catch (error) {
    console.error('Erro ao apagar:', error);
  }
};

// Formulário de submit
document.getElementById('form-aluno').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const alunoData = {
    nome: document.getElementById('nome').value,
    apelido: document.getElementById('apelido').value,
    curso: document.getElementById('curso').value,
    anoCurricular: parseInt(document.getElementById('ano').value)
  };

  try {
    if (alunoIdEditando) {
      // Atualização
      const response = await fetch(`${baseURL}/${alunoIdEditando}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alunoData)
      });
      if (!response.ok) throw new Error('Erro ao atualizar');
      alunoIdEditando = null;
    } else {
      // Criação
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alunoData)
      });
      if (!response.ok) throw new Error('Erro ao criar');
    }
    
    document.getElementById('form-aluno').reset();
    await carregarAlunos();
  } catch (error) {
    console.error('Erro no formulário:', error);
    alert('Operação falhou! Verifique o console.');
  }
});

// Inicialização
document.addEventListener('DOMContentLoaded', carregarAlunos);
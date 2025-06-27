require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Modelo de Aluno
const alunoSchema = new mongoose.Schema({
  nome: String,
  apelido: String,
  curso: String,
  anoCurricular: Number
});

const Aluno = mongoose.model('Aluno', alunoSchema);

// Configuração da porta
const PORT = process.env.PORT || 3000;

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado ao MongoDB");
    app.listen(PORT, () => {
      console.log(`API na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });

// Middleware para permitir requisições de diferentes origens
app.use(cors());

// Middleware para parsear o corpo das requisições
app.use(express.json());

// Endpoint para obter todos os alunos
app.get('/alunos', async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint para criar um novo aluno
app.post('/alunos', async (req, res) => {
  const aluno = new Aluno({
    nome: req.body.nome,
    apelido: req.body.apelido,
    curso: req.body.curso,
    anoCurricular: req.body.anoCurricular
  });

  try {
    const novoAluno = await aluno.save();
    res.status(201).json(novoAluno);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint para atualizar um aluno
app.put('/alunos/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(aluno);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint para deletar um aluno
app.delete('/alunos/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }
    res.json({ message: "Aluno deletado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

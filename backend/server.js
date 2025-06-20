require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🟢 Conectado ao MongoDB Atlas'))
  .catch(err => console.error('🔴 Erro:', err));

// Modelo
const Aluno = mongoose.model('Aluno', new mongoose.Schema({
  nome: String,
  apelido: String,
  curso: String,
  anoCurricular: Number
}));

// Rota
app.get('/alunos', async (req, res) => {
  const alunos = await Aluno.find();
  res.json(alunos);
});

app.listen(3001, () => console.log('🚀 API pronta em http://localhost:3001'));

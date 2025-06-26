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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 API pronta em http://localhost:${PORT}`));

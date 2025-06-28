require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch(err => console.error(err));

app.use(cors());
app.use(express.json());

const alunoSchema = new mongoose.Schema({
  nome: String,
  apelido: String,
  curso: String,
  anoCurricular: Number,
});
const Aluno = mongoose.model('Aluno', alunoSchema);

app.get('/alunos', async (req, res) => {
  const data = await Aluno.find();
  res.json(data);
});

app.post('/alunos', async (req, res) => {
  const novo = await new Aluno(req.body).save();
  res.status(201).json(novo);
});

app.put('/alunos/:id', async (req, res) => {
  const atualizado = await Aluno.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(atualizado);
});

app.delete('/alunos/:id', async (req, res) => {
  await Aluno.findByIdAndDelete(req.params.id);
  res.json({message:'Deletado'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API na porta ${PORT}`));

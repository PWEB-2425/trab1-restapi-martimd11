const express = require('express');
const router = express.Router();
const Aluno = require('../models/aluno');

// GET todos alunos
router.get('/', async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST criar aluno
router.post('/', async (req, res) => {
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

// PUT atualizar aluno
router.put('/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(aluno);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE apagar aluno
router.delete('/:id', async (req, res) => {
  try {
    await Aluno.findByIdAndDelete(req.params.id);
    res.json({ message: 'Aluno apagado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const Aluno = require("../models/aluno");

// Mudar todas as rotas para /alunos (plural)
router.get("/alunos", async (req, res) => res.json(await Aluno.find()));
router.post("/alunos", async (req, res) => res.status(201).json(await new Aluno(req.body).save()));
router.put("/alunos/:id", async (req, res) => res.json(await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete("/alunos/:id", async (req, res) => res.json(await Aluno.findByIdAndDelete(req.params.id)));

module.exports = router;
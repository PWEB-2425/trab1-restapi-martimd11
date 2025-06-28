const express = require("express");
const router = express.Router();
const Aluno = require("../models/aluno");

router.get("/aluno", async (req, res) => res.json(await Aluno.find()));
router.post("/aluno", async (req, res) => res.status(201).json(await new Aluno(req.body).save()));
router.put("/aluno/:id", async (req, res) => res.json(await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete("/aluno/:id", async (req, res) => res.json(await Aluno.findByIdAndDelete(req.params.id)));

module.exports = router;

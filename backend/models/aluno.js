const mongoose = require("mongoose");
const alunoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  apelido: { type: String, required: true },
  curso: { type: String, required: true },
  anoCurricular: { type: Number, min: 1, max: 5, required: true }
});

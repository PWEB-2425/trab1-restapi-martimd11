require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Teste simples na raiz
app.get("/", (req, res) => {
  res.send("API está a funcionar ✅");
});

// Porta padrão
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

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch(err => console.error("Erro MongoDB:", err));

// Middlewares
app.use(cors());
app.use(express.json());

// Rota raiz (para teste rápido)
app.get("/", (req, res) => {
  res.send("API funcional! Use /alunos");
});

// Usar as rotas definidas em routes/alunoroutes.js
const alunoRoutes = require('./routes/alunoroutes');
app.use("/", alunoRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API na porta ${PORT}`));

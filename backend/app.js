require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const alunoRoutes = require('./routes/alunoRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => {
    console.error('❌ Erro ao conectar ao MongoDB:', err.message);
    process.exit(1); // Encerra se falhar
  });

// Rotas
app.use('/', (req, res, next) => {
  console.log(`📥 [${req.method}] ${req.originalUrl}`);
  next();
});

app.use('/api', alunoRoutes);

// Página raiz
app.get('/', (req, res) => {
  res.send('✅ API funcional. Use o endpoint /alunos');
});

// Middleware de erro (catch-all)
app.use((err, req, res, next) => {
  console.error('🔥 Erro inesperado:', err.stack);
  res.status(500).json({ erro: 'Erro interno no servidor' });
});

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API a correr em http://localhost:${PORT}`);
});

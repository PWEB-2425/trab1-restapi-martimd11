require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const alunoRoutes = require('./routes/alunoRoutes');

const app = express();

// Conexão MongoDB (Render)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fallbackdb')
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => console.error('❌ Erro MongoDB:', err));

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/alunos', alunoRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ status: 'API Funcional', instrucao: 'Use /api/alunos' });
});

// Porta do Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
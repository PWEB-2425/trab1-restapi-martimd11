require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const alunoRoutes = require('./routes/alunoRoutes');

const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fallbackdb')
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => console.error('❌ Erro MongoDB:', err));

// Permitir CORS só para o frontend específico
app.use(cors({
  origin: 'https://trab1-restapi-martimd11-martims-projects-c6b29c77.vercel.app/'
}));

app.use(express.json());
app.use('/api/alunos', alunoRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'API Funcional', instrucao: 'Use /api/alunos' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

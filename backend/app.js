require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const alunoRoutes = require('./routes/alunoRoutes');

const app = express();

const allowedOrigins = [
  'https://trab1-restapi-martimd11-ezktrsbpn-martims-projects-c6b29c77.vercel.app',
  'https://trab1-restapi-martimd11-nmiz0tsk9-martims-projects-c6b29c77.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // permite Postman e outros sem origem
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS bloqueado para: ' + origin), false);
    }
  }
}));
// Conexão MongoDB (Render)
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Ligação à base de dados com sucesso!'))
    .catch(err => console.log('Erro na ligação à base de dados:', err));

// Middlewares
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

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const alunoRoutes = require('./routes/alunoRoutes');

const app = express();


const allowedOrigins = [
  'https://trab1-restapi-martimd11-ezktrsbpn-martims-projects-c6b29c77.vercel.app',
  'http://localhost:3000' // opcional, para testes locais
];

app.use(cors({
  origin: function(origin, callback){
    // permite requisições sem origem (como Postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'O CORS não permite acesso de: ' + origin;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
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

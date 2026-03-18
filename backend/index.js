require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/auth'); // Importando as rotas
const appointmentRoutes = require('./src/routes/appointments');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas do Sistema
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

// Conexão com o Banco de Dados
const mongoUri = process.env.MONGO_URI;

if (mongoUri) {
  mongoose.connect(mongoUri, {
    family: 4,
    serverSelectionTimeoutMS: 5000 
  })
    .then(() => console.log('✅ CONECTADO AO MONGODB!'))
    .catch((err) => console.log('⚠️ Erro local de conexão (ignore se estiver desenvolvendo offline):', err.message));
}

// Teste de Servidor
app.get('/', (req, res) => {
  res.send('Servidor da Clínica Rodando! 🏥');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
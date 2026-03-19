require('dotenv').config(); // SEMPRE A PRIMEIRA LINHA
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Importação das rotas (Certifique-se de que os arquivos existem em src/routes)
const authRoutes = require('./src/routes/auth');
const appointmentRoutes = require('./src/routes/appointments');

const app = express();

// --- MIDDLEWARES ---
app.use(cors()); // Permite que o Frontend fale com o Backend
app.use(express.json()); // Permite que o servidor entenda JSON

// --- DEFINIÇÃO DAS ROTAS ---
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

// Rota de teste inicial (Aparece no navegador)
app.get('/', (req, res) => {
  res.send('Servidor da Clínica Rodando! 🏥');
});

// --- LOG DE DIAGNÓSTICO (Para o Render) ---
const mongoUri = process.env.MONGO_URI;
console.log("--------------------------------------------------");
console.log("🔍 Verificando Variável MONGO_URI:", mongoUri ? "Link Encontrado ✅" : "Link ESTÁ VAZIO ❌");
console.log("--------------------------------------------------");

// --- CONEXÃO COM O BANCO DE DADOS (MONGODB) ---
if (!mongoUri) {
  console.log('❌ ERRO CRÍTICO: Variável MONGO_URI não encontrada no Ambiente do Render.');
} else {
  mongoose.connect(mongoUri, {
    family: 4, // Força o uso de IPv4
    serverSelectionTimeoutMS: 10000 // Tenta conectar por 10 segundos antes de desistir
  })
    .then(() => {
      console.log('✅ CONECTADO AO MONGODB COM SUCESSO! O sistema está pronto.');
    })
    .catch((err) => {
      console.log('❌ ERRO REAL DE CONEXÃO:', err.message);
      console.log('DICA: Vá no MongoDB Atlas -> Network Access e verifique se o IP 0.0.0.0/0 está ACTIVE.');
    });
}

// --- INICIAR O SERVIDOR ---
const PORT = process.env.PORT || 10000; // Render usa a porta 10000 por padrão
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const axios = require('axios');

// ROTA PARA CRIAR AGENDAMENTO
router.post('/create', async (req, res) => {
  try {
    const { nomePaciente, data, hora, cep, endereco } = req.body;

    // --- REQUISITO: INTEGRAÇÃO COM API DE CLIMA ---
    let alertaClima = "Tempo Firme ☀️";
    try {
      // Extraímos a cidade do endereço (ex: "Bairro - Cidade")
      const cidade = endereco.split('-')[1]?.trim() || "Sao Paulo";
      const API_KEY = process.env.OPENWEATHER_KEY;
      
      // Chamada para a API OpenWeather
      const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`);
      
      // Se a API retornar chuva, mudamos o alerta
      if (weatherRes.data.weather[0].main.toLowerCase().includes('rain') || 
          weatherRes.data.weather[0].description.toLowerCase().includes('chuva')) {
        alertaClima = "Alerta: Previsão de Chuva 🌧️";
      }
    } catch (err) {
      // Se a API de clima falhar (chave errada ou sem internet), salvamos um padrão
      alertaClima = "Céu Limpo ☀️ (Simulado)";
    }

    const novoAgendamento = new Appointment({
      nomePaciente,
      data,
      hora,
      cep,
      endereco,
      previsaoClima: alertaClima
    });

    await novoAgendamento.save();
    res.status(201).json({ msg: 'Agendamento realizado com sucesso!', agendamento: novoAgendamento });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ROTA PARA LISTAR TODOS (USADA NO PAINEL ADMIN)
router.get('/all', async (req, res) => {
  try {
    const lista = await Appointment.find().sort({ createdAt: -1 });
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
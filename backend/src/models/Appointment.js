const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  nomePaciente: { type: String, required: true },
  data: { type: String, required: true },
  hora: { type: String, required: true },
  cep: { type: String, required: true },
  endereco: { type: String, required: true },
  previsaoClima: { type: String, default: 'Não consultado' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
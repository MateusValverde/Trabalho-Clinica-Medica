const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['paciente', 'secretario'], default: 'paciente' }
});

module.exports = mongoose.model('User', UserSchema);
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ROTA DE CADASTRO
router.post('/register', async (req, res) => {
  try {
    const { nome, email, password, role } = req.body;
    
    // Verifica se usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'E-mail já cadastrado' });

    // Criptografa a senha (Requisito de segurança do TD)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ nome, email, password: hashedPassword, role });
    await newUser.save();
    
    res.status(201).json({ msg: 'Usuário criado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ROTA DE LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Usuário não encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Senha incorreta' });

    // Gera o Token JWT (Requisito do TD)
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.json({ token, user: { nome: user.nome, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
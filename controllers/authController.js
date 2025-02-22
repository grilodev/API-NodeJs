const express = require('express');
const router = express.Router();
const { generateToken } = require('../config/jwt');

// POST /api/v1/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'admin123') {
    const token = generateToken({ name: username });
    return res.json({ token });
  }
  return res.status(401).json({ error: 'Credenciais inválidas' });
});

module.exports = router;

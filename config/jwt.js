// config/jwt.js
const jwt = require('jsonwebtoken');

const jwtSettings = {
  key: process.env.JWT_KEY || 'E16D54C78B92A15417A4ud91ABBC4CDD3EEF2F00',
  issuer: process.env.JWT_ISSUER || '999982',
  audience: process.env.JWT_AUDIENCE || '8484845'
};

function generateToken(payload) {
  return jwt.sign(payload, jwtSettings.key, {
    expiresIn: '1h',
    issuer: jwtSettings.issuer,
    audience: jwtSettings.audience
  });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });
  jwt.verify(token, jwtSettings.key, { issuer: jwtSettings.issuer, audience: jwtSettings.audience }, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido ou expirado' });
    req.user = user;
    next();
  });
}

module.exports = { generateToken, authenticateToken };

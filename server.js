const express = require('express');
const { sequelize } = require('./models');
const authController = require('./controllers/authController');
const pecaController = require('./controllers/pecaController');
const { authenticateToken } = require('./config/jwt');
const rateLimit = require('express-rate-limit');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Configura o rate limit: 10 requisições por 1 minutos por IP
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutos
  max: 10, // máximo de 100 requisições por IP
  message: "Muitas requisições, tente novamente mais tarde."
});

// Aplica o rate limit para todas as requisições
app.use(limiter);

// Rotas
app.use('/api/v1', authController);
app.use('/api/v1/peca', authenticateToken, pecaController);

sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao sincronizar o banco de dados:', err);
});

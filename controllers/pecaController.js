const express = require('express');
const router = express.Router();
const { Peca, Componente } = require('../models');
const { v4: uuidv4 } = require('uuid');

// POST /api/v1/peca
router.post('/', async (req, res) => {
  try {
    const { codigo, nome } = req.body;
    if (!codigo || !nome) {
      return res.status(400).json({ error: 'Código e nome são obrigatórios' });
    }
    const novaPeca = await Peca.create({ codigo, nome });
    res.status(201).json(novaPeca);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cadastrar peça' });
  }
});

// GET /api/v1/peca
router.get('/', async (req, res) => {
  try {
    const pecas = await Peca.findAll({ include: Componente });
    if (!pecas) return res.status(404).json({ error: 'Peças não encontradas' });
    res.json(pecas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar peças' });
  }
});

// GET /api/v1/peca/:codigo
router.get('/:codigo', async (req, res) => {
  try {
    const { codigo } = req.params;
    const peca = await Peca.findOne({ where: { codigo }, include: Componente });
    if (!peca) return res.status(404).json({ error: 'Peça não encontrada' });
    res.json(peca);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar peça' });
  }
});

// POST /api/v1/peca/:codigo/componente
router.post('/:codigo/componente', async (req, res) => {
  try {
    const { codigo } = req.params;
    const peca = await Peca.findOne({ where: { codigo } });
    if (!peca) return res.status(404).json({ error: 'Peça não encontrada' });

    const { descricao, preco, quantidade } = req.body;
    if (!descricao || preco === undefined || quantidade === undefined) {
      return res.status(400).json({ error: 'Dados do componente inválidos' });
    }

    const SKU = uuidv4();
    const novoComponente = await Componente.create({
      codigo: peca.codigo,
      SKU,
      descricao,
      preco,
      quantidade
    });
    res.status(201).json(novoComponente);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cadastrar componente' });
  }
});

// GET /api/v1/peca/:codigo/componente
router.get('/:codigo/componente', async (req, res) => {
  try {
    const { codigo } = req.params;
    const peca = await Peca.findOne({ where: { codigo } });
    if (!peca) return res.status(404).json({ error: 'Peça não encontrada' });

    const componentes = await Componente.findAll({ where: { codigo } });
    res.json(componentes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar componentes' });
  }
});

// GET /api/v1/peca/:codigo/componente/:sku
router.get('/:codigo/componente/:sku', async (req, res) => {
  try {
    const { codigo, sku } = req.params;
    const peca = await Peca.findOne({ where: { codigo } });
    if (!peca) return res.status(404).json({ error: 'Peça não encontrada' });

    const componente = await Componente.findOne({ where: { codigo, SKU: sku } });
    if (!componente) return res.status(404).json({ error: 'Componente não encontrado' });

    res.json(componente);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar componente' });
  }
});

module.exports = router;

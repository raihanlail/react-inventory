const express = require('express');
const { Pool } = require('pg');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const { getInventory, addInventory, updateInventory, deleteInventory } = require('../controller/inventoryController');
require('dotenv').config();

const router = express.Router();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

router.get('/', getInventory, verifyToken);

router.post('/', addInventory, verifyToken, isAdmin);

router.put('/:id',updateInventory, verifyToken, isAdmin);

router.delete('/:id', deleteInventory, verifyToken, isAdmin);

module.exports = router;

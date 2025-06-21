const express = require('express');
const StorageController = require('../controllers/storageController');

const router = express.Router();
const storageController = new StorageController();

function setRoutes(app) {
    router.post('/upload', (req, res) => storageController.uploadReceipt(req, res));
    router.get('/generate-url', (req, res) => storageController.generateAccessUrl(req, res));

    app.use('/api/storage', router);
}

module.exports = setRoutes;
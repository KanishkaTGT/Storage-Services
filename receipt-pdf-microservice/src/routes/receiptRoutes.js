const express = require('express');
const ReceiptController = require('../controllers/receiptController');

const router = express.Router();
const receiptController = new ReceiptController();

function setRoutes(app) {
    router.post('/generate-receipt', receiptController.generateReceipt.bind(receiptController));
    app.use('/api/receipts', router);
}

module.exports = setRoutes;
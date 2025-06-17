const express = require('express');
const ReceiptController = require('../controllers/receiptController');

const router = express.Router();
const receiptController = new ReceiptController();

function setReceiptRoutes(app) {
    router.post('/generate', receiptController.generateReceipt.bind(receiptController));
    app.use('/api/receipts', router);
}

module.exports = setReceiptRoutes;
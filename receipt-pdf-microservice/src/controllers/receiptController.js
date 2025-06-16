class ReceiptController {
    constructor(pdfService) {
        this.pdfService = pdfService;
    }

    async generateReceipt(req, res) {
        try {
            const receiptData = req.body;
            const { receiptId, filePath } = await this.pdfService.createPDF(receiptData);
            res.status(201).json({ receiptId, filePath });
        } catch (error) {
            res.status(500).json({ error: 'Failed to generate receipt' });
        }
    }
}

export default ReceiptController;
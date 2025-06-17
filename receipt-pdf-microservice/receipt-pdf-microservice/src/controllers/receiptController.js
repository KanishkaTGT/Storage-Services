class ReceiptController {
    constructor(pdfService, idGenerator) {
        this.pdfService = pdfService;
        this.idGenerator = idGenerator;
    }

    async generateReceipt(req, res) {
        try {
            const receiptData = req.body;
            const receiptId = this.idGenerator.generateReceiptId();
            const filePath = `./receipts/${receiptId}.pdf`;

            await this.pdfService.createPDF(receiptData, filePath);

            res.status(200).json({
                receiptId: receiptId,
                filePath: filePath
            });
        } catch (error) {
            res.status(500).json({ error: 'Failed to generate receipt' });
        }
    }
}

export default ReceiptController;
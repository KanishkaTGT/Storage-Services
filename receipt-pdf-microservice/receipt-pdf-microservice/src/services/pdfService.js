class PDFService {
    constructor() {
        this.pdfToolkit = require('pdftoolkit'); // Assuming pdftoolkit is installed
        this.fs = require('fs');
        this.path = require('path');
        this.templatePath = path.join(__dirname, '../templates/receipt.html');
        this.stylesPath = path.join(__dirname, '../templates/styles.css');
    }

    async generatePDF(data) {
        const receiptId = this.generateReceiptId();
        const filePath = path.join(__dirname, `../../receipts/${receiptId}.pdf`);

        const htmlContent = await this.renderHTML(data);
        const options = {
            format: 'A4',
            margin: {
                top: '20mm',
                right: '20mm',
                bottom: '20mm',
                left: '20mm'
            }
        };

        return new Promise((resolve, reject) => {
            this.pdfToolkit.createPDF(htmlContent, options, (err, pdfBuffer) => {
                if (err) {
                    return reject(err);
                }
                this.fs.writeFile(filePath, pdfBuffer, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve({ receiptId, filePath });
                });
            });
        });
    }

    async renderHTML(data) {
        const htmlTemplate = await this.fs.promises.readFile(this.templatePath, 'utf-8');
        const styles = await this.fs.promises.readFile(this.stylesPath, 'utf-8');

        // Replace placeholders in the HTML template with actual data
        let htmlContent = htmlTemplate.replace(/{{customerName}}/g, data.customerName)
                                      .replace(/{{amount}}/g, data.amount)
                                      .replace(/{{date}}/g, data.date)
                                      .replace(/{{items}}/g, this.renderItems(data.items));

        return `<style>${styles}</style>${htmlContent}`;
    }

    renderItems(items) {
        return items.map(item => `<li>${item.name}: ${item.price}</li>`).join('');
    }

    generateReceiptId() {
        return `REC-${Date.now()}`;
    }
}

module.exports = PDFService;
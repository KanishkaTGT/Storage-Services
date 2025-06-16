const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf');
const ejs = require('ejs');

const createPDF = (receiptData) => {
    return new Promise((resolve, reject) => {
        const templatePath = path.join(__dirname, '../templates/receipt.html');
        const outputPath = path.join(__dirname, '../../receipts', `receipt_${Date.now()}.pdf`);

        ejs.renderFile(templatePath, { receipt: receiptData }, (err, html) => {
            if (err) {
                return reject(err);
            }

            pdf.create(html, { format: 'A4' }).toFile(outputPath, (err, res) => {
                if (err) {
                    return reject(err);
                }
                resolve({ receiptId: path.basename(res.filename, '.pdf'), filePath: res.filename });
            });
        });
    });
};

module.exports = { createPDF };
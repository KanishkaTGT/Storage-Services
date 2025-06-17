function generateReceiptId() {
    return 'REC-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9);
}

module.exports = generateReceiptId;
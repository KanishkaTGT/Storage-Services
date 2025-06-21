class StorageController {
    constructor(azureBlobService) {
        this.azureBlobService = azureBlobService;
    }

    async uploadReceipt(req, res) {
        try {
            const { file } = req;
            if (!file) {
                return res.status(400).json({ message: 'No file uploaded.' });
            }

            const containerName = 'receipts';
            const blobName = `${Date.now()}_${file.originalname}`;
            const data = file.buffer;

            await this.azureBlobService.uploadBlob(containerName, blobName, data);
            const url = this.azureBlobService.getBlobUrl(containerName, blobName);

            return res.status(201).json({ message: 'Receipt uploaded successfully.', url });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error uploading receipt.' });
        }
    }

    async generateAccessUrl(req, res) {
        try {
            const { containerName, blobName, expiresIn } = req.body;

            if (!containerName || !blobName) {
                return res.status(400).json({ message: 'Container name and blob name are required.' });
            }

            const url = this.azureBlobService.getBlobUrl(containerName, blobName, expiresIn);
            return res.status(200).json({ url });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error generating access URL.' });
        }
    }
}

module.exports = StorageController;
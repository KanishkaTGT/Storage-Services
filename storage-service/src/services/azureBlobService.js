class AzureBlobService {
    constructor(containerName) {
        const { BlobServiceClient } = require('@azure/storage-blob');
        const { AZURE_STORAGE_CONNECTION_STRING } = process.env;

        this.blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
        this.containerClient = this.blobServiceClient.getContainerClient(containerName);
    }

    async uploadBlob(blobName, data) {
        const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.upload(data, data.length);
        return blockBlobClient.url;
    }

    async getBlobUrl(blobName, expiresIn) {
        const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
        const expiresOn = new Date();
        expiresOn.setMinutes(expiresOn.getMinutes() + expiresIn);
        const url = blockBlobClient.generateSASUrl({
            expiresOn: expiresOn,
            permissions: 'r' // read permission
        });
        return url;
    }
}

module.exports = AzureBlobService;
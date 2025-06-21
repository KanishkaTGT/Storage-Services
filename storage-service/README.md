# Storage Service API

This project is a microservice for managing receipts using Azure Blob Storage. It allows users to upload receipts and generate access URLs, either public or expiring links.

## Project Structure

```
storage-service
├── src
│   ├── app.js                  # Entry point of the application
│   ├── controllers
│   │   └── storageController.js # Handles receipt uploads and URL generation
│   ├── routes
│   │   └── storageRoutes.js     # Defines API routes for the storage service
│   ├── services
│   │   └── azureBlobService.js  # Interacts with Azure Blob Storage
│   └── config
│       └── azureConfig.js       # Configuration settings for Azure
├── package.json                 # npm configuration file
├── .env                         # Environment variables for sensitive information
├── .gitignore                   # Files and directories to ignore by Git
└── README.md                    # Documentation for the project
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd storage-service
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```
   AZURE_STORAGE_ACCOUNT=<your-storage-account-name>
   AZURE_STORAGE_ACCESS_KEY=<your-storage-access-key>
   AZURE_CONTAINER_NAME=<your-container-name>
   ```

4. **Run the application:**
   ```bash
   npm start
   ```

## API Usage

### Upload Receipt

- **Endpoint:** `POST /api/receipts`
- **Description:** Uploads a receipt to Azure Blob Storage.
- **Request Body:**
  ```json
  {
    "fileName": "receipt.jpg",
    "data": "<base64-encoded-file-data>"
  }
  ```

### Generate Access URL

- **Endpoint:** `GET /api/receipts/url`
- **Description:** Generates a public or expiring URL for accessing a receipt.
- **Query Parameters:**
  - `fileName`: The name of the file for which to generate the URL.
  - `expiresIn`: Optional, time in seconds for the URL to expire.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
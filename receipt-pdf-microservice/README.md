# Receipt PDF Microservice

This project is a Node.js microservice that generates A4-sized PDF receipts from provided receipt data. It utilizes Express for the API and a combination of HTML and CSS for the PDF formatting.

## Project Structure

```
receipt-pdf-microservice
├── src
│   ├── controllers
│   │   └── receiptController.js
│   ├── routes
│   │   └── receiptRoutes.js
│   ├── services
│   │   └── pdfService.js
│   ├── templates
│   │   ├── receipt.html
│   │   └── styles.css
│   └── app.js
├── package.json
├── .gitignore
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd receipt-pdf-microservice
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the server, run:
```
npm start
```

The API will be available at `http://localhost:3000`.

### API Endpoint

- **POST /api/receipts**

  This endpoint generates a PDF receipt.

  **Request Body:**
  ```json
  {
      "restaurantName": "Fish & Chips Fast Foods",
      "address": "123 Ocean Drive, Seaside Town",
      "phone": "+123 456 7890",
      "orderNumber": "454",
      "host": "Meggan F",
      "date": "2020-01-12",
      "time": "12:16",
      "items": [
          {"name": "Fish Burgers", "qty": 2, "price": 25.98},
          {"name": "Fish & Chips", "qty": 1, "price": 8.99},
          {"name": "Soft Drinks", "qty": 2, "price": 3.98}
      ],
      "subtotal": "38.95",
      "tax": "1.17",
      "salesTax": "1.17",
      "total": "41.29",
      "payment": "VISA **** 2277"
  }
  ```

  **Response:**
  ```json
  {
      "receiptId": "unique-receipt-id",
      "filePath": "/path/to/generated/receipt.pdf"
  }
  ```

## License

This project is licensed under the MIT License.
# Fabrica Needs Service

## Overview

Fabrica Needs Service is a microservice built with Node.js, Express, and PostgreSQL. It provides an API for managing payments through MercadoPago and updating a total balance based on these payments. This service is designed to handle webhooks from MercadoPago to update payment statuses and totals.

## Features

- **Payment Processing**: Create and retrieve payments through MercadoPago.
- **Webhook Handling**: Respond to payment status updates from MercadoPago.
- **Total Management**: Update total balance based on payment approvals and refunds.

## Getting Started

### Prerequisites

- Node.js (>=14.x)
- PostgreSQL account (database)
- MercadoPago account (+18)
- Vercel account (for deployment)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jonatasperaza/FabricaNeedsService.git
   cd FabricaNeedsService
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following environment variables:

   ```env
    PGHOST=your_postgres_host
    PGDATABASE=your_database_name
    PGUSER=your_postgres_user
    PGPASSWORD=your_postgres_password
    ENDPOINT_ID=your_endpoint_id
    MERCADOPAGO_TOKEN=your_mercadopago_token
    ```

### Running Locally

Start the server:

   ```bash
   npm run dev
   ```

The server will start on http://localhost:3000.

### Project Structure

```
.
├── src
│   ├── controllers
│   │   ├── paymentController.ts
│   │   └── webhookController.ts
│   ├── services
│   │   ├── mercadoPagoService.ts
│   │   └── totalService.ts
│   ├── config
│   │   └── database.ts
│   ├── routes
│   │   └── index.ts
|   ├── utils
|   |   ├── idempotencyKey.ts
|   |   └── pingStatus.ts
|   ├── types
|   |   └── declare.d.ts
│   └── app.ts
├── .env (Create your env)
├── package.json
├── README.md
├── tsconfig.json
└── vercel.json
```

### API endpoints

1.Home Endpoint

- URL: `/`
- Method: `GET`
- Description: Check if the API is running.
- Response:
    - `200 OK`

2. Payment Endpoint

- URL: `/payment`
- Method: `POST`
- Description: Create a new payment.
- Request Body:
    ```json
    {
      "paymentData": {
        "transaction_amount": 1,
        "description": "example",
        "paymentMethodId": "pix",
        "email": "example@example.example",
        "identificationType": "CPF",
        "number": 12345678901
      }
    }

    ```

- Response:
   - 201: Payment created successfully.
   - 400: Bad request.

3. Webhook Endpoint

- URL: `/webhook`
- Method: `POST`
- Description: Handle payment status updates from MercadoPago.
- Request Body: Webhook payload from MercadoPago.
- Response:
   - 200: Data inserted successfully.
   - 201: Data received successfully.
   - 400: Error inserting data.
   - 304: Data already exists.

### Services

1. MercadoPago Service (services/mercadoPagoService.js)

Provides functions to interact with MercadoPago API:

- `updateTotal(valor)`: Adds the specified amount to the total.

- `subtractTotal(valor)`: Subtracts the specified amount from the total.

### License
This project is licensed under the MIT License. See the LICENSE file for details.
### Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.
### Support
For support, open an issue on the GitHub repository.
### Author
[Anthony Gabriel Loche Dos Reis](https://github.com/AnthonyLoche) && [Jonatas Silva Peraza](https://github.com/jonatasperaza)











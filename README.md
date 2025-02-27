# Payment Orders

Payment Orders is an application designed to manage orders efficiently, allowing users to create, view, and filter orders based on country and description. It consists of two separate applications: a frontend Angular application and a backend NestJS application. The frontend allows users to input orders and filter existing orders by criteria, while the backend handles the persistence of orders and ensures data integrity.

## Features

- Add new payment orders with fields: order number, payment description, address, town, country, amount, currency, and payment due date.
- Prevent duplicate order numbers with validation.
- View orders in a list with filters for country and payment description.
- Prioritization of orders by country.
- Sort orders by payment due date.

## Technologies Used

- **Frontend**: Angular, TailwindCSS
- **Backend**: NestJS, TypeORM (for interacting with the database)
- **Database**: PostgreSQL (managed with Docker)
- **Docker**: Used to run the PostgreSQL database container
- **Turborepo**: Monorepo management tool to manage the client and server projects

## Installation

### Prerequisites

- Node.js (v16+ recommended)
- Docker (for PostgreSQL container)
- PostgreSQL (if you prefer not to use Docker, instructions are included below)

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/HasanaghaAzad/payment-orders.git
   cd payment-orders
   ```

2. **Install dependencies**

**For the client (Angular)**

```bash
cd client
npm install
```

**For the server (NestJS)**

```bash
cd server
npm install
```

3. **Set up environment variables**

Client-side: Copy the .env.example file to .env in the client/ directory

```bash
cp client/.env.example client/.env
```

Backend: Copy the .env.example file to .env in the root directory (for the backend and database)

```bash
cp .env.example .env
```

4. **Run the application**

Start only PostgreSQL database using Docker:

```bash
npm run start:db
```

Start only the backend (NestJS):

```bash
npm run start:backend
```

Start only the frontend (Angular):

```bash
npm run start:frontend
```

Running all simultaneously: You can use Turborepo to run both the frontend and backend + DB concurrently:

```bash
npm run start:all
```

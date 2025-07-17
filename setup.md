# Okavango Foods Setup Guide

## Backend Setup (API)

1. **Install dependencies:**
   ```bash
   cd api
   npm install
   # or
   pnpm install
   ```

2. **Set up the database:**
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

3. **Seed the database:**
   ```bash
   npx prisma db seed
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   # or
   npx ts-node src/server.ts
   ```

   The API will be available at `http://localhost:3000`

## Frontend Setup (Web)

1. **Install dependencies:**
   ```bash
   cd web
   npm install
   # or
   pnpm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:4321`

## API Endpoints

The backend provides the following endpoints:

### Menu Items
- `GET /api/menu` - Get all active menu items with categories
- `GET /api/health` - Health check endpoint

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get a specific order

### Sample Order Creation Request:
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "0977600808",
  "items": [
    {
      "menuItemId": "menu-item-id",
      "quantity": 2,
      "price": 15.00
    }
  ],
  "totalAmount": 55.00
}
```

## Features Implemented

### Frontend Features:
- Menu display with API integration
- Shopping cart functionality
- Order checkout process
- Order history tracking
- Payment integration (cash on delivery + mobile money simulation)
- Success page with order details

### Backend Features:
- RESTful API with Express.js
- Database with Prisma ORM
- Order management system
- Menu item management
- CORS enabled for frontend integration

### Integration Features:
- Menu items fetched from backend API
- Order creation through API
- Order history retrieval
- Payment processing integration
- Fallback to localStorage when API is unavailable

## Testing the Integration

1. **Start both servers** (backend on :3001, frontend on :4321)
2. **Navigate to the frontend** and browse the menu
3. **Add items to cart** and proceed to checkout
4. **Fill in delivery information** and complete the order
5. **Check order history** using the phone number used for ordering
6. **Verify in the backend** that orders are being created in the database

## Database Schema

The application uses SQLite with the following main tables:
- `Category` - Food categories (Sausages, Wraps, Samosas, Combos)
- `MenuItem` - Individual menu items with prices and descriptions
- `Order` - Customer orders with delivery information
- `OrderItem` - Items within each order

## Notes

- The application includes graceful fallbacks to localStorage when the API is unavailable
- Payment integration is simulated (ready for real payment gateway integration)
- The frontend uses Astro with TypeScript for type safety
- The backend uses Express.js with Prisma for database operations
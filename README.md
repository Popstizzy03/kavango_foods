# Okavango Foods 🍔🌯

Welcome to Okavango Foods, your one-stop destination for a diverse range of delicious foods! From our iconic flame-grilled burgers to tasty wraps, crispy fries, refreshing drinks, and aromatic coffee, we've got something to satisfy every craving.

<div align="center">
  <img src="web/assets/akava.png" alt="Okavango Foods Logo" width="200" />
</div>

## Project Overview

Okavango Foods is a full-stack food ordering platform with a modern web interface and robust API backend.

### Key Features

- 🌮 [Browse our full menu](web/pages/menu.astro) with delicious categories
- 🛒 [Easy cart management](web/components/CartItem.astro) with real-time updates
- 💳 Secure [checkout process](web/pages/checkout.astro) with multiple payment options
- 🚚 [Delivery tracking](web/components/DeliveryForm.astro) for your orders
- 📱 Responsive design that works on all devices

## Project Structure

### Frontend (Web)
```
web/
├── assets/            # Images and static resources
├── components/        # Reusable UI components
├── layouts/           # Page layout templates
├── pages/             # Application pages
└── styles/            # Global CSS styles
```

### Backend (API)
```
api/
├── src/
│   └── pages/
│       └── api/
│           └── submit-order.js   # Order submission endpoint
└── supabase.js                   # Database connection
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm dev
   ```
4. Visit `http://localhost:4321` to see the application

## Technology Stack

- **Frontend**: [Astro](https://astro.build) for fast, optimized web pages
- **Backend**: API routes with serverless functions
- **Database**: [Supabase](https://supabase.com) for data storage
- **Styling**: Custom CSS with responsive design

## Contributing

We welcome contributions to Okavango Foods! Please see our contributing guidelines for more information.

## License

This project is licensed under the terms of the [LICENSE](LICENSE) file.

---

<div align="center">
  <p>© 2025 Okavango Foods. All rights reserved.</p>
  <p>
    <a href="web/pages/about.astro">About</a> •
    <a href="web/pages/menu.astro">Menu</a> •
    <a href="web/pages/contact.astro">Contact</a>
  </p>
</div>
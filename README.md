# 👑 Lahari's Restaurant & Gourmet Kitchen

A full-featured, responsive food ordering and restaurant experience web application inspired by the best UX design patterns of **Swiggy** and **Zomato**.

---

## 🌟 Key Features

### 1. 🛵 Swiggy & Zomato Online Ordering
- **Menu Catalog**: 17+ dishes across 7 categories (Dum Biryani, Tandoor & Starters, Royal Curries & Breads, Sizzling Kebabs, South Indian Classics, Wok & Pan Asian, Shahi Desserts, and Artisanal Mocktails).
- **Dietary Indicators**: Pure Vegetarian (🟢) and Non-Vegetarian (🔴) markers with dedicated Veg-Only toggle filter.
- **Dish Customization Modal**: Choose portion sizes (e.g. Single vs Jumbo Family Pack), spice levels (Mild, Medium, Fiery), and add-ons (Extra Mutton Piece, Salan & Raita, Butter Garlic Naan, Cheese Glaze).
- **Search & Fast Filtering**: Instant live search with highlighted results, category tabs, and sorting (Rating, Price).

### 2. 🛒 Interactive Cart & Smart Checkout
- **Slide-out Cart Drawer** with live item counters and progressive **Free Delivery Meter**.
- **Promo Code Engine**: 1-click apply for codes like `LAHARI50` (50% OFF), `FEAST100` (₹100 Flat OFF), and `FREEDEL`.
- **Delivery Preferences & Tips**: Options for delivery partner tip (₹20, ₹30, ₹50) and special delivery instructions (*Leave at door, Don't ring bell, Avoid calling*).
- **Multi-method Checkout**: Mock gateways for UPI (GPay, PhonePe, Paytm), Cards, and Cash on Delivery.

### 3. 📍 Real-Time Live Order Tracking Simulation
- **Multi-Stage Progression**: *Order Confirmed ➔ Kitchen Preparing ➔ Valet Assigned ➔ On The Way ➔ Delivered*.
- **Interactive Route Map**: Stylized animated route with live delivery rider avatar.
- **ETA Countdown & OTP**: Live countdown clock and delivery OTP verification code.
- **Delivery Partner Profile**: Valet photo, name, rating (4.9 ★), vehicle number, and 1-tap call button.

### 4. 🍽️ Table Reservation (Zomato Dineout Style)
- Reserve tables for 2 to 12+ guests with area selection:
  - *Rooftop Sky Lounge*
  - *Royal AC Dining Hall*
  - *Candlelight Romance Corner*
  - *VIP Family Suite*
- Generates a **Dineout Digital Pass** with booking ID, assigned table number, and perks (15% Flat Food Bill discount).

### 5. 🎨 Aesthetics & Modern Design
- **Theme Modes**: Dark Mode & Light Mode toggle with persistent preference.
- **Responsive Layout**: Mobile-first responsive design with sticky mobile bottom navigation bar.
- **High-Quality Imagery**: High-resolution food photography for signature dishes.

---

## 🚀 How to Run Locally

1. Open your terminal in this directory:
   ```bash
   cd "c:\Lahari Restaurant project"
   ```

2. Start the built-in server:
   ```bash
   npm start
   # or
   node server.js
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
c:/Lahari Restaurant project/
├── index.html              # Main HTML markup and semantic layout
├── server.js               # Zero-dependency Node.js static web server
├── package.json            # NPM project config and startup scripts
├── README.md               # Documentation and feature guide
├── css/
│   ├── variables.css       # Color palettes, design tokens, typography, dark mode
│   ├── style.css           # Core styling, menu grid, cart drawer, modals, map animation
│   └── responsive.css      # Mobile navigation bar and tablet/phone optimizations
├── js/
│   ├── data.js             # Menu catalog, pricing, add-ons, coupons, reviews
│   ├── cart.js             # Cart state manager, bill computation, promo code engine
│   ├── reservation.js      # Table booking and digital pass generator
│   ├── tracking.js         # Live order simulation, route SVG, and status engine
│   └── app.js              # Event listeners, search, filters, modals, theme switcher
└── assets/
    └── images/             # Food photography & hero banner
        ├── hero.jpg
        ├── biryani.jpg
        ├── paneer-tikka.jpg
        ├── butter-chicken.jpg
        ├── tandoori-kebab.jpg
        ├── dosa.jpg
        ├── noodles.jpg
        ├── dessert.jpg
        └── mocktail.jpg
```

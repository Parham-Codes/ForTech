🛒 ForTech – Modern E-Commerce Web Application

A scalable, feature-rich e-commerce frontend built with React + Vite, designed to simulate a real-world online shopping platform with authentication, admin dashboard, and full cart/checkout flow.

🚀 Live Features
🛍 Store Front
Product listing with dynamic UI
Product detail pages
Category-based browsing
Responsive design for all devices
🛒 Shopping System
Add / remove items from cart
Quantity management
Persistent cart state
Checkout flow simulation
👤 Authentication System
User registration & login
Protected routes for authenticated users
Role-based access (User / Admin)
🛠 Admin Dashboard
Product management (CRUD structure ready)
User management interface
Order overview panel
Separate admin routing system
⚡ Performance & UX
Lazy-loaded routes (code splitting)
Optimized component structure
Fast navigation with React Router v7
Toast notifications for actions
SweetAlert2 modals for confirmations
🧱 Tech Stack
⚛️ React 19 (Vite)
🧭 React Router DOM v7
🎯 Context API (State Management)
📡 Axios (API Handling)
🎨 Bootstrap / React-Bootstrap
🎠 Swiper.js (Product sliders)
🔔 React Hot Toast (Notifications)
📄 React Helmet Async (SEO optimization)
💬 SweetAlert2 (UI alerts)
🧠 Architecture Overview

The project follows a modular and scalable structure:

src/
│
├── components/     # Reusable UI components
├── pages/          # App pages (User + Admin)
├── context/        # Global state (Auth, Cart)
├── routes/         # Route protection & navigation
├── assets/         # Images, fonts, static files
├── DB/             # API configuration / data layer
└── App.jsx         # Root provider composition
🔐 Routing System

This project uses a role-based protected routing system:

ProtectedRoute → Authenticated users only
AdminRoute → Admin-only access
CheckoutRoute → Controlled checkout flow
🌐 API Integration

Backend communication is handled via Axios:

const API_BASE_URL = "http://192.168.1.2:4000";

The frontend is fully decoupled from backend logic, making it ready for production APIs.

⚙️ Getting Started
1. Clone the repository
git clone https://github.com/Parham-Codes/ForTech.git
cd ForTech
2. Install dependencies
npm install
3. Run development server
npm run dev
📦 Build for Production
npm run build
🎯 Project Goals

This project was built to demonstrate:

Real-world React architecture
Scalable e-commerce frontend design
Authentication & authorization flow
Admin panel separation
Performance optimization techniques
🧩 Key Highlights
✔ Clean component-based architecture
✔ Role-based access control
✔ Fully responsive UI
✔ Production-ready folder structure
✔ Real API integration pattern
✔ Scalable routing system
👨‍💻 Developer

Parham Taghikhani

GitHub: Parham-Codes
🧠 Note

This project is not just a UI template — it is structured like a real production e-commerce system, suitable for portfolio and job applications.

🇮🇷 نسخه فارسی کوتاه

این پروژه یک فروشگاه اینترنتی کامل با React هست که شامل:

سیستم لاگین
سبد خرید
پنل ادمین
روتینگ حرفه‌ای
اتصال به API
طراحی ریسپانسیو

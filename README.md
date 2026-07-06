# 🪙 Crypto Market Analytics Terminal (Full-Stack)

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)
![React](https://img.shields.io/badge/Frontend-React%2018-cyan.svg)
![Node.js](https://img.shields.io/badge/Backend-Node.js%20v18+-green.svg)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC.svg)
![License](https://img.shields.io/badge/License-MIT-purple.svg)

A production-ready **Full-Stack Cryptocurrency Market Analytics Terminal** featuring a rich, interactive glassmorphic UI and a highly optimized MongoDB-backed REST API. 

Built as a comprehensive full-stack college assignment (2026) by **Trikam Devasi**.

---

## ✨ Key Features

### 🖥️ Frontend (Client Terminal)
- **Stunning UI/UX:** Premium cyberpunk/neon aesthetic with full support for both **Dark Mode** and **Light Mode**.
- **Glassmorphism Design:** Beautiful frosted glass panels, dynamic gradients, and animated backgrounds.
- **Interactive Data Visualization:** Real-time sparklines, area charts, and market distribution graphs powered by `recharts`.
- **3D Hardware Acceleration:** Interactive WebGL spinning globe representing global market nodes powered by `Three.js` and `React-Three-Fiber`.
- **Robust State Management:** Centralized global state handling authentication, caching, and API syncing using **Redux Toolkit**.
- **Secure Authentication:** Complete Login/Register flow with JWT token handling, route protection, and dynamic user roles.
- **Form Validation:** Client-side validation schemas using `Formik` and `Yup`.

### ⚙️ Backend (REST API)
- **Scalable Architecture:** MVC pattern separating routes, controllers, and services.
- **High-Performance Aggregation:** Complex MongoDB `$bucket` and grouping pipelines for deep market insights.
- **Massive Dataset:** Pre-configured with a script to seed **33,364 historical records** for 100 unique cryptocurrencies over 13 months.
- **Security First:** Rate limiting against brute-force attacks, bcrypt password hashing, and JWT handshake endpoints.
- **Robust Error Handling:** Centralized async operational error mapping and HTTP request logging using Winston/Morgan.
- **Rich Querying:** Advanced pagination, filtering, sorting, and full-text search endpoints.

---

## 🛠️ Technology Stack

| Domain | Technologies |
|---|---|
| **Frontend Core** | React 18, Vite, React Router DOM |
| **State Management** | Redux Toolkit (`@reduxjs/toolkit`), React-Redux |
| **Styling & UI** | Tailwind CSS, Framer Motion, Material UI Icons |
| **Data Viz & 3D** | Recharts, Three.js, React-Three-Fiber, React-CountUp |
| **Forms & Utils** | Formik, Yup, Axios, React-Toastify |
| **Backend Core** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Security** | JSONWebToken (JWT), bcryptjs, express-rate-limit, CORS |

---

## 📁 Project Structure

```text
crypto-analytics-workspace/
├── .env                        # Backend environment variables
├── package.json                # Backend dependencies
├── server.js                   # Backend Entry Point
├── crypto_historical_365days.json # Raw dataset (33k+ entries)
├── config/                     # DB configuration
├── controllers/                # API route controllers
├── models/                     # Mongoose schemas (Coin, User)
├── routes/                     # Express router definitions
├── services/                   # Core business logic & MongoDB pipelines
├── middlewares/                # Auth, logging, error handling, rate limits
├── utils/                      # Standardized responses, pagination
├── scripts/                    # Database seeding scripts (seed.js)
│
└── crypto-dashboard/           # ⚛️ React Frontend App
    ├── .env                    # Frontend environment variables
    ├── index.html              # HTML template
    ├── package.json            # Frontend dependencies
    ├── vite.config.js          # Vite configuration
    ├── tailwind.config.js      # Custom theme & animation config
    └── src/
        ├── App.jsx             # Root layout & routing
        ├── main.jsx            # React mounting
        ├── index.css           # Global styles & light/dark variables
        ├── components/         # Reusable UI (3D, charts, common, layout)
        ├── features/           # Redux slices (auth, coins, stats, ui)
        ├── hooks/              # Custom React hooks (useAuth, useCoins)
        ├── pages/              # View components (Dashboard, Settings, Auth)
        ├── services/           # Axios API integrations
        └── utils/              # Formatters, validators, constants
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or newer)
- MongoDB (Local instance or MongoDB Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/crypto-analytics-api.git
cd crypto-analytics-api
```

### 2. Backend Setup
Install server dependencies:
```bash
npm install
```

Configure your environment variables:
```bash
cp .env.example .env
```
Ensure your `.env` contains:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/crypto_analytics
JWT_SECRET=your_super_secure_jwt_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
```

Seed the massive dataset into MongoDB:
```bash
npm run seed
```

Start the Backend server (runs on `http://localhost:5000`):
```bash
npm run dev
```

### 3. Frontend Setup
Open a **new terminal tab/window**, and navigate to the frontend directory:
```bash
cd crypto-dashboard
```

Install client dependencies:
```bash
npm install
```

Start the Vite development server (runs on `http://localhost:5173`):
```bash
npm run dev
```

You can now visit `http://localhost:5173` in your browser. Register an account, log in, and explore the terminal!

---

## 🔗 API Endpoints Overview

The backend exposes over 100+ REST APIs. All protected routes require a JWT token in the `Authorization: Bearer <token>` header.

- **`/api/v1/auth`**: Registration, Login, Logout, Profile Management.
- **`/api/v1/coins`**: CRUD operations, filtering, pagination, search, and specific coin lookups.
- **`/api/v1/analytics`**: Market trends, price growth/drops, volume spikes.
- **`/api/v1/stats`**: Statistical range distributions, market summaries, daily/monthly/yearly grouping.
- **`/api/v1/admin`**: Administrator-only system analytics and user management.

For complete, interactive backend documentation, visit the [Live API Docs](https://trikamdevasi-s-team.docs.buildwithfern.com).

---

## 🖼️ Screenshots

*(Add your screenshots here)*
- **Dark Mode Dashboard:** `![Dark Dashboard](./screenshots/dark-dashboard.png)`
- **Light Mode Dashboard:** `![Light Dashboard](./screenshots/light-dashboard.png)`
- **Interactive Data Charts:** `![Charts](./screenshots/charts.png)`

---

## 👨‍💻 Author

**Trikam Devasi**
Full Stack Developer | Swaminarayan University
GitHub: [@trikamdevasi](https://github.com/trikamdevasi)

---

## 📄 License

This project is licensed under the MIT License — Free to use and modify for educational and personal purposes.

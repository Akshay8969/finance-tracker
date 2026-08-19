# FinTrack – Personal Finance Tracker

> A modern, responsive personal finance dashboard built with React, Vite, Express, and MongoDB.

![App Screenshot](public/screenshots/app_screenshot.png)

---

## ✨ Features

- 🔐 **Authentication** — Secure sign up & login with JWT-based sessions
- 💸 **Transaction Management** — Add, edit, and delete income & expense records
- 🔍 **Filtering & Search** — Filter by type, category, or keyword; sort by date/amount
- 📊 **Spending Chart** — Visual breakdown of expenses by category using Recharts
- 📈 **Quick Stats** — Balance, savings rate, top spending category at a glance
- 🌙 **Dark / Light Theme** — Persistent theme toggle
- 🔔 **Toast Notifications** — Instant feedback on every action
- 📱 **Fully Responsive** — Works great on desktop, tablet, and mobile

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Build Tool | Vite 8 |
| Styling | CSS Modules |
| Routing | React Router DOM v7 |
| Charts | Recharts |
| Backend | Express.js |
| Database | MongoDB (Mongoose) |
| Authentication | JWT + bcryptjs |

---

## 📁 Project Structure

```
finance-tracker/
├── public/
│   └── screenshots/          # App screenshots
├── server/                   # Express.js backend
│   ├── index.js              # Entry point — connects to MongoDB, starts server
│   ├── middleware/
│   │   └── auth.js           # JWT verification middleware
│   ├── models/
│   │   ├── User.js           # User schema (bcrypt password hashing)
│   │   └── Transaction.js    # Transaction schema
│   └── routes/
│       ├── auth.js           # POST /signup, POST /login, GET /me
│       └── transactions.js   # Full CRUD for transactions
├── src/                      # React frontend
│   ├── main.jsx              # App entry point
│   ├── App.jsx               # Root router & layout
│   ├── index.css             # Global CSS variables & design tokens
│   ├── components/           # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── SummaryCards.jsx
│   │   ├── SpendingChart.jsx
│   │   ├── QuickStats.jsx
│   │   ├── TransactionList.jsx
│   │   ├── TransactionItem.jsx
│   │   ├── AddEditModal.jsx
│   │   ├── DeleteConfirm.jsx
│   │   ├── Filters.jsx
│   │   ├── Toast.jsx
│   │   ├── Icon.jsx
│   │   └── ErrorBoundary.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx     # Main dashboard view
│   │   ├── Transactions.jsx  # Full transaction list view
│   │   └── AuthPage.jsx      # Login / Sign up page
│   ├── context/
│   │   ├── AuthContext.jsx   # JWT auth state (localStorage)
│   │   └── ThemeContext.jsx  # Dark/light theme
│   ├── hooks/
│   │   ├── useTransactions.js  # REST API calls + state
│   │   └── useToast.js
│   └── utils/
│       └── helpers.js        # Currency/date formatters, sort helpers
├── .env.example              # Environment variable template (see below)
├── package.json              # Frontend deps + dev scripts
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/Akshay8969/finance-tracker.git
cd finance-tracker
```

### 2. Install dependencies

```bash
# Frontend
npm install

# Backend
cd server && npm install && cd ..
```

### 3. Configure environment variables

Copy the example and fill in your values:

```bash
cp .env.example .env
```

Open `.env`:

```env
# Frontend
VITE_API_URL=http://localhost:5000

# Backend
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/finance-tracker
JWT_SECRET=your_long_random_secret
PORT=5000
CLIENT_URL=http://localhost:5173
```

> ⚠️ Never commit `.env` — it's already in `.gitignore`.

### 4. Start the app

```bash
npm run dev:all
```

This starts both servers at once:
- **Frontend** → [http://localhost:5173](http://localhost:5173)
- **Backend**  → [http://localhost:5000](http://localhost:5000)

Or run them separately:

```bash
npm run dev          # frontend only
npm run dev:server   # backend only
```

---

## 🌐 API Reference

All `/api/transactions` routes require `Authorization: Bearer <token>` header.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Create account, returns JWT |
| `POST` | `/api/auth/login` | Login, returns JWT |
| `GET` | `/api/auth/me` | Get current user from token |
| `GET` | `/api/transactions` | List all transactions for user |
| `POST` | `/api/transactions` | Create a transaction |
| `PUT` | `/api/transactions/:id` | Update a transaction |
| `DELETE` | `/api/transactions/:id` | Delete a transaction |

---

## 🍃 MongoDB Setup

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) and create a free cluster.
2. Under **Database Access**, create a user with read/write access.
3. Under **Network Access**, allow your IP (or `0.0.0.0/0` for anywhere).
4. Click **Connect → Drivers** and copy the connection string into `MONGODB_URI` in your `.env`.

Data is stored in two collections:
```
users          { name, email, password (hashed), createdAt }
transactions   { userId, title, amount, type, category, date, createdAt }
```

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start frontend dev server |
| `npm run dev:server` | Start backend dev server |
| `npm run dev:all` | Start both frontend & backend together |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview the production build locally |

---

## 📝 License

MIT — maintained by **Akshay Singh** ([@Akshay8969](https://github.com/Akshay8969)).

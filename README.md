# FinTrack – Personal Finance Tracker

> A modern, responsive personal finance dashboard built with React, Vite, and Firebase.

![App Screenshot](public/screenshots/app_screenshot.png)

---

## ✨ Features

- 🔐 **Authentication** — Email/password sign up & login via Firebase Auth
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
| Backend / Auth | Firebase v12 (Auth + Firestore) |
| Charts | Recharts |

---

## 📁 Project Structure

```
finance-tracker/
├── public/
│   └── screenshots/          # App screenshots
├── src/
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
│   │   ├── AuthContext.jsx   # Firebase auth state
│   │   └── ThemeContext.jsx  # Dark/light theme
│   ├── hooks/
│   │   ├── useTransactions.js  # Firestore CRUD + real-time sync
│   │   └── useToast.js
│   ├── firebase/
│   │   └── config.js         # Firebase initialisation (uses .env)
│   └── utils/
│       └── helpers.js        # Currency/date formatters, sort helpers
├── .env.example              # Environment variable template
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A [Firebase](https://firebase.google.com/) project with **Authentication** (Email/Password) and **Firestore** enabled

### 1. Clone the repository

```bash
git clone https://github.com/Akshay8969/finance-tracker.git
cd finance-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in your Firebase credentials:

```bash
cp .env.example .env
```

Open `.env` and set your values:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> ⚠️ Never commit your `.env` file — it is already listed in `.gitignore`.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔥 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a project.
2. Enable **Authentication → Sign-in method → Email/Password**.
3. Enable **Firestore Database** in production or test mode.
4. Copy your project's web app config values into `.env`.

Firestore data is stored per user under:
```
users/{uid}/transactions/{transactionId}
```

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |

---

## 📝 License

MIT — maintained by **Akshay Singh** ([@Akshay8969](https://github.com/Akshay8969)).

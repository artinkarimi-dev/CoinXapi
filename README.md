# 💫 About the Project

This project is a **real-time cryptocurrency price tracker** that fetches live data from the [CoinGecko API](https://www.coingecko.com/en/api) and displays the latest USD prices of popular coins such as **Bitcoin (BTC)**, **Ethereum (ETH)**, and **Tether (USDT)**.

The main goal of this project was to learn and implement:

-  How to consume third-party **public APIs** using `fetch()`
-  Handling **CORS issues** by creating a custom **Node.js proxy server**
- ⚙ Understanding the basics of **backend concepts** like routing, ports, and APIs
-  Debugging real-world errors using **browser DevTools** (Network tab, Console errors, etc.)
-  Updating UI with real-time price updates at intervals

---

## 🧠 Key Features

- Displays live cryptocurrency prices in USD
- Fetches data securely through a **Node.js proxy server**
- Handles **CORS errors** using a backend workaround
- Updates prices automatically every set interval (customizable)
- Clean and responsive UI built with **HTML + CSS + JavaScript**

---

## 🛠 Technologies Used

| Layer        | Tech Used         | Description                            |
|--------------|------------------|----------------------------------------|
| Frontend     | HTML, CSS, JS    | For UI and DOM manipulation            |
| Backend      | Node.js, Express | Used to build a proxy to bypass CORS   |
| API Provider | CoinGecko        | Source of real-time crypto prices      |

---

## 🧪 Learning Outcomes

Through this project, the following key programming skills were strengthened:

- Using **RESTful APIs** effectively
- Learning how to setup and run a **Node.js server**
- Fixing real-time **network-level bugs**
- Deep understanding of how **frontend and backend** communicate
- Familiarity with **npm**, server logs, and terminal-based development

---

## 📦 Project Structure

<pre lang="markdown"><code> ``` BitBarg/
│
├── .git/ # Git version control folder
├── README.md # Project documentation
├── image/ # Project-related images (e.g., screenshots, logos)
│
├── proxy-server/ # 🔧 Backend (Node.js Proxy Server)
│ ├── node_modules/ # Installed backend dependencies
│ ├── package.json # Project metadata and scripts
│ ├── package-lock.json # Exact version lock of installed packages
│ └── server.js # Express-based proxy server (handles API requests)
│
└── src/ # 🎨 Frontend Source Files
    ├── index.html # Main HTML file (entry point of the app)
    ├── style.css # Custom styles and UI design
    └── script.js # JavaScript logic (fetches API data, updates DOM)
 ``` </code></pre>
---

## 🧭 How It Works

1. **Frontend** sends a fetch request to `/api`
2. **Proxy server** at `localhost:3000` catches the request and forwards it to CoinGecko API
3. The server receives the data and returns it to the frontend
4. Frontend parses and displays the prices on the page
5. This process repeats at a time interval (e.g. every 30 seconds)

---

## ✅ Final Result

> After countless hours of debugging, handling CORS issues, dealing with fetch errors, learning backend basics, and fine-tuning the project — the app finally works smoothly and reliably.

---

## 🙌 Special Note

This wasn’t just a “simple API project” — it was a **full-stack experience** that forced me to deal with **real developer challenges**, from browser limitations to backend setups.  
It taught me more than 10 tutorials combined.


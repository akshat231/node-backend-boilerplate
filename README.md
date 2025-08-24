# 🚀 Node.js Backend Boilerplate

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-Backend-lightgrey?logo=express)](https://expressjs.com/)
[![Postgres](https://img.shields.io/badge/Postgres-Supported-blue?logo=postgresql)](https://www.postgresql.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Supported-green?logo=mongodb)](https://www.mongodb.com/)

A clean and scalable **Node.js backend starter template** with built-in logging, configuration management, error handling, and optional database support.

---

## ⚡ Quick Start (CLI)

Generate a new backend project instantly:

```bash
# Using npm globally
npm install -g create-my-node-backend

# Or directly with npx
npx create-my-node-backend my-backend
```

This will create a folder my-backend/ with the full backend structure:

```
my-backend/
│── src/
│   ├── index.js
│   ├── middlewares/
│   ├── routes/
│   ├── utilities/
│   ├── services/
│   ├── repositories/
│   └── databases/
│── package.json
│── config/
│── README.md


```

Start your server

```bash
cd my-backend
npm start
```


## 📂 Features

✅ Express.js setup with modular structure  
✅ Centralized logging with Winston  
✅ Config management using `node-config`  
✅ Health check (ping a port)  
✅ Custom middleware support  
✅ Error handling middleware  
✅ Postgres & MongoDB ready (optional)


## 🛠️ Scripts

```bash
# Start server
npm start

# Start in development mode
npm run start
```

## ⚙️ Configuration

Default config: config/default.json

```bash
{
  "server": { "port": 4000 },
  "database": {
    "postgres": { "enabled": false, "url": "postgres://user:password@localhost:5432/dbname" },
    "mongo": { "enabled": false, "url": "mongodb://localhost:27017/dbname" }
  }
}
```

## 🔍 Example API Route

```bash
const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ message: 'pong 🏓' });
});

module.exports = router;
```
## 📦 GitHub Repo (For Contributors)

Clone the repository for contributing or advanced usage:

```bash
git clone https://github.com/akshat231/node-backend-boilerplate
cd node-backend-boilerplate
npm install
```

## 🚀 Roadmap

- [ ] Add JWT authentication  
- [ ] Add role-based access control  
- [ ] Add Docker support  
- [ ] Add testing (Jest / Mocha)

---

## 🤝 Contributing

Contributions are welcome!  
Fork the repo, create a branch, and submit a PR 🚀


## 📜 License

MIT License © 2025 [Akshat Sharma](https://github.com/akshat231)

---





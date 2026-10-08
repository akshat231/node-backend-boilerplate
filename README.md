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
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── utilities/
│   ├── services/
│   ├── repositories/
│   ├── validators/
│   └── databases/
│── config/
│── package.json
│── Dockerfile
│── docker-compose.yml

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
✅ Postgres, MongoDB, Redis, Kafka ready (optional)


## 🛠️ Scripts

```bash
# Start server
npm start
```

## 🐳 Docker

Generated projects ship with a `Dockerfile` and `docker-compose.yml`:

```bash
cd my-backend
docker compose up --build
```

> Note: the app reads its port from `config/default.json` (`server.port`,
> default 5000), not from `.env`. Databases are not included in compose —
> run your own and point the app at them via `config/default.json` or
> env vars (`PG_HOST`, `REDIS_HOST`, …).

## ⚙️ Configuration

Default config: config/default.json

```json
{
  "instanceType": "development",
  "server": {
    "host": "localhost",
    "port": 5000,
    "corsWhiteList": ["localhost"]
  },
  "database": {
    "mongo": {
      "url": "mongo-url",
      "username": "username",
      "password": "password",
      "collections": {
        "users": "userscollection-name"
      }
    },
    "postgres": {
      "host": "localhost",
      "port": 5432,
      "user": "postgres",
      "database": "scholar_snap",
      "ssl": false
    },
    "redis": {
      "host": "localhost",
      "port": 6379
    }
  },
  "kafka": {
    "clientId": "app_name",
    "brokers": ["localhost:9092"],
    "topics": {
      "health": "health-topic"
    },
    "groupIds": {
      "health": "health-group"
    }
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



---

## 🤝 Contributing

Contributions are welcome!  
Fork the repo, create a branch, and submit a PR 🚀


## 📜 License

MIT License © 2025 [Akshat Sharma](https://github.com/akshat231)

---





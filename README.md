# 🚀 Node.js Backend Boilerplate

A clean and scalable **Node.js backend starter template** with built-in logging, configuration management, error handling, and database support.

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-lightgrey?logo=express)
![Postgres](https://img.shields.io/badge/Postgres-Supported-blue?logo=postgresql)
![MongoDB](https://img.shields.io/badge/MongoDB-Supported-green?logo=mongodb)

---

## 📂 Features

✅ Express.js setup with modular structure  
✅ Centralized logging with Winston  
✅ Config management using `node-config`  
✅ Health check (ping a port)  
✅ Custom middleware support  
✅ Error handling middleware  
✅ Postgres & MongoDB ready (optional)

---

## 📂 Folder Structure

```
project-root/
│── index.js              # App entrypoint
│── package.json
│── config/               # Environment configs
│── middlewares/          # Custom middlewares
│── routes/               # API routes
│── utilities/            # Logger, startup, helpers
│── services/             # Database & external services
│── README.md
```

---

## ⚡ Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/node-backend-boilerplate.git
cd node-backend-boilerplate

# Install dependencies
npm install
```

---

## 🛠️ Available Scripts

```bash
# Start the server
npm start

# Run in development mode (with nodemon)
npm run start
```

---

## ⚙️ Configuration

This project uses [`node-config`](https://www.npmjs.com/package/config).  
Default config is in `config/default.json`:

```json
{
  "server": {
    "port": 4000
  },
  "database": {
    "postgres": {
      "enabled": false,
      "url": "postgres://user:password@localhost:5432/dbname"
    },
    "mongo": {
      "enabled": false,
      "url": "mongodb://localhost:27017/dbname"
    }
  }
}
```

To override configs, create `config/development.json` or `config/production.json`.

---

## 🔍 Health Check

Check if a given **port & host** is reachable:

```js
const getHealth = async (port, host) => {
    try {
        const getHealth = await pingPort(host, port);
        if (!getHealth) {
            return { message: 'Port is not working', data: getHealth };
        }
         return { message: 'Port is working', data: getHealth };
    } catch (error) {
        throw error;
    }
};
```

✅ Response example:

```json
{
  "message": "Port is working",
  "data": true
}
```

---

## 🧩 Example API Route

```js
const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ message: 'pong 🏓' });
});

module.exports = router;
```

---

## 🚀 Roadmap

- [ ] Add JWT authentication  
- [ ] Add role-based access control  
- [ ] Add Docker support  
- [ ] Add testing (Jest / Mocha)

---

## 🤝 Contributing

Contributions are welcome!  
Fork the repo, create a branch, and submit a PR 🚀

---


## ⚡ Generate Your Backend Boilerplate

This project comes with a **CLI script** to quickly generate a ready-to-use Node.js backend boilerplate with all the core structure, middleware, logging, and optional database setup.  

### Usage

1. Install the CLI globally
```bash
npm install -g node-backend-boilerplate-cli
```

2. Run the generator in the folder where you want the backend:
```bash
node-backend-boilerplate init my-backend
```

3. This will create a folder my-backend/ with the following structure:
```
my-backend/
│── src  
    │── index.js              # App entrypoint
    │── middlewares/          # Custom middlewares
    │── routes/               # API routes
    │── utilities/            # Logger, startup, helpers
    │── services/             # Service Logic   
    │── repositories/         # Databse Queries
    │── databases/            # Databases config and connections
│── package.json          # Dependencies
│── config/               # Environment configs
│── README.md
```
4.  Start Your Server
```bash
npm start
```





## 📜 License

MIT License © 2025 [Akshat Sharma](https://github.com/akshat231)

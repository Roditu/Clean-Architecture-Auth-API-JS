<h1 align="center">🔐 Authentication API with Clean Architecture Code</h1>

<p align="center">
  <img alt="Static Badge" src="https://img.shields.io/badge/On%20Progress%20-%20orange">
  <img alt="NPM Version" src="https://img.shields.io/badge/npm-v10.8.0-green">
  <img alt="Node Version" src="https://img.shields.io/badge/node-v20.14.0-green">
  <img alt="Hapi Version" src="https://img.shields.io/badge/@hapi/hapi-v21.4.0-green">
  <img alt="JWT Version" src="https://img.shields.io/badge/@hapi/jwt-v3.2.0-yellow">
  <img alt="bcrypt Version" src="https://img.shields.io/badge/bcrypt-v20.14.0-red">
  <img alt="nanoid Version" src="https://img.shields.io/badge/nanoid-v3.3.11-yellow">
  <img alt="pg Version" src="https://img.shields.io/badge/pg-v8.15.6-blue">
</p>

---

## 📌 Description  
🌟 *ON PROGRESS*
💡 A learning project implementing **Clean Architecture** principles in a Node.js backend. 
The project demonstrates how to structure an authentication API with proper separation of concerns, making the codebase scalable, maintainable, and testable.

---

## 🚀 Features  
✔️ **User registration (sign up)** – Brief explanation
✔️ **User authentication (login)** – Brief explanation
✔️ **Access token / refresh token flow** – Brief explanation
✔️ **Password hashing & verification** – Brief explanation
✔️ **Input validation** – Brief explanation
✔️ **Input validation** – Brief explanation
✔️ **Error handling** – Brief explanation
✔️ **- Separation of layers using Clean Architecture** – Brief explanation

---

## 🏗️ Project Structure
This project follows Clean Architecture with the following main layers:
src/
├── Apps/ # Use cases (interactors, orchestrating domain logic)
├── Commons/ # Error Translation & config (env)
├── Domains/ # Business rules & entities (pure logic, no frameworks)
├── Infrastructures/# External services (DB, JWT, bcrypt, etc.)
├── Interfaces/ # Controllers, HTTP layer, route handlers
└── app.js # Entry point

---

## 🧰 Tech Stack
- **Node.js** (JavaScript)
- **Hapi.js** for HTTP server
- **JWT** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment variables
- **Jest** (optional, if you wrote tests)

---

## 🛠️ Installation  
```bash
# Clone the repository
git clone https://github.com/Roditu/Clean-Architecture-Auth-API-JS.git

# Navigate to project directory
cd Clean-Architecture-Auth-API-JS

# Install dependencies
npm install
```

---

## ⚙️ Environment Setup
Create a .env file in the root directory:
```bash
HOST=your_local_host / domain
PORT=5000
NODE_ENV=development

PGHOST = postgre_host
PGUSER = postgre_user
PGDATABASE = postgre_database
PGPASSWORD = postgre_password
PGPORT = postgre_db_port

ACCESS_TOKEN_KEY=your_access_token_key
REFRESH_TOKEN_KEY=your_refresh_token_key
ACCESS_TOKEN_AGE=your_access_taken_age
```

## 🟢 Start the Project
```bash
npm start
```
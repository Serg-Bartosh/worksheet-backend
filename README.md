# 📝 Worksheet Task Management API

A full-stack application for managing educational tasks and user answers. The backend is built with **NestJS**, uses **Sequelize ORM** with **MySQL**, and the entire environment is fully containerized using **Docker**.

---

## 🚀 Live Demo

* **Backend API:** *Render link coming soon*
* **Frontend UI:** *Vercel link coming soon*

---

## 🛠 Tech Stack

* **Framework:** NestJS
* **Database:** MySQL 8.0
* **ORM:** Sequelize
* **DevOps:** Docker, Docker Compose
* **Deployment:** Render (Backend), Vercel (Frontend)

---

## 💻 Local Setup (Docker)

The fastest way to run the project locally is using **Docker Compose**.

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Serg-Bartosh/worksheet-backend.git
cd worksheet-backend
```

---

### 2️⃣ Environment Configuration (`.env`)

The application uses environment variables for database connectivity.
If you want to use a custom configuration, create a `.env` file in the root directory.

⚠️ **You must use the following `MYSQL_` variables:**

```env
MYSQL_HOST=db          # Database host (use `db` for Docker)
MYSQL_PORT=3306        # Database port
MYSQL_USERNAME=root    # Database user
MYSQL_PASSWORD=root    # Database password
MYSQL_DATABASE=worksheet-backend

PORT=3005              # Application port
```

---

### 3️⃣ Run the Application

```bash
docker compose up -d --build
```

✅ The database will be automatically initialized and seeded with **4 sample tasks**.

---

## 🧪 Testing & API Validation

### 🔹 E2E Tests

Run the end-to-end test suite:

```bash
docker compose run --rm tests
```

---

### 🔹 Postman Collection

A **`collection.json`** file is included in the root directory.

You can:

1. Open Postman
2. Click **Import**
3. Select `collection.json`

This allows you to test all available API endpoints quickly.

---

## 📂 Project Structure

```text
src/                # NestJS source code & business logic
test/               # End-to-end (E2E) tests
Dockerfile          # Backend container definition
docker-compose.yml  # Multi-container orchestration
collection.json     # Postman collection for API testing
```

---

## 📌 Notes

* The project is fully Dockerized — no local MySQL installation required
* Designed for easy deployment and scalability
* Suitable for educational platforms and task-based systems

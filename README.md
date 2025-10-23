### 🩺 HealthPredict — Smart Health Prediction System

**HealthPredict** is a full-stack health prediction platform designed to help users analyze symptoms and predict possible diseases using data-driven algorithms.
The system includes:

* A **web portal** (React frontend + Laravel backend)
* A **mobile app** (Android Studio)

---

## 🚀 Features

### 🌐 Web Portal

* User registration and authentication
* Interactive dashboard
* Disease prediction form
* Admin panel for managing data and results

### ⚙️ Backend (Laravel 11)

* RESTful API
* Authentication (JWT or Session)
* Database management with migrations
* Validation and security middleware

---

## 🧩 Tech Stack

| Layer               | Technology                         |
| ------------------- | ---------------------------------- |
| **Frontend**        | React.js, Vite, Axios, TailwindCSS |
| **Backend**         | Laravel 11 (PHP 8+), MySQL         |
| **Version Control** | Git & GitHub                       |
| **API Testing**     | Postman                            |

---

## 🛠️ Installation & Setup

### 🖥️ Web Portal (React)

```bash
cd system/web-portal
npm install
npm run dev
```

### ⚙️ Backend (Laravel 11)

```bash
cd system/backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```
## 🔑 Authentication

All authentication routes are handled under:

```
app/Http/Controllers/Auth
routes/api.php
```

Endpoints:

* `POST /api/register` — Register new user
* `POST /api/login` — Login user
* `POST /api/logout` — Logout session

---

## 📂 Project Structure

```
HealthPredict/
├── system/
│   ├── backend/           # Laravel backend (API + Auth)
│   ├── web-portal/        # React frontend
│ 
├── README.md
└── .gitignore
```


## 🧠 Future Enhancements

* AI-powered prediction model
* Chatbot integration for health advice
* Real-time API for hospital data

---

## 📜 License

This project is licensed under the **MIT License**.

---


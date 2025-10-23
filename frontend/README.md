## 🩺 HealthPredict – Web Portal (Frontend)

The **HealthPredict Web Portal** is built with **React.js** to provide a user-friendly interface for doctors, patients, and admins to manage medical data, reports, and health insights efficiently.

---

### ⚙️ Tech Stack

* **Framework:** React 18
* **Styling:** Tailwind CSS
* **State Management:** React Hooks
* **API Calls:** Axios
* **Routing:** React Router DOM
* **Build Tool:** Vite / CRA

---

### 📂 Project Structure

```
frontend/
│
├── public/                 # Public assets like index.html, favicon, logos
│
├── src/                    # All source code for the React app
│   ├── api/                # API integration and Axios request handlers
│   │   └── userApi.js      # Example: handles login, register, fetch users
│   │
│   ├── assets/             # Static images, icons, and other media
│   │   └── logo.svg
│   │
│   ├── components/         # Reusable UI components (navbar, sidebar, cards, etc.)
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── ReportCard.jsx
│   │
│   ├── hooks/              # Custom React hooks (for logic reusability)
│   │   └── useFetchData.js
│   │
│   ├── pages/              # Main application pages (routes)
│   │   ├── LoginPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── PatientReports.jsx
│   │   └── DoctorOverview.jsx
│   │
│   ├── App.js              # Main React component with routing setup
│   ├── index.js            # Entry point – renders the app
│   ├── index.css           # Global CSS styles
│   ├── App.css             # App-specific styles
│   └── reportWebVitals.js  # Performance metrics
│
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS setup
├── .gitignore              # Files and folders ignored by Git
└── README.md               # Project documentation
```

---

### 🚀 Getting Started

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sahansara/HealthPredict-webPortal.git
cd HealthPredict-webPortal/webPortal
```

#### 2️⃣ Install Dependencies

```bash
npm install
```

#### 3️⃣ Start Development Server

```bash
npm start
```

---

### 🧠 Key Functionalities

* Doctor and Admin dashboards
* Medical report viewing and uploading
* AI chatbot integration (coming soon)
* Responsive UI with TailwindCSS
* API communication with Laravel backend

---



# 🚗 Rent-A-Car Management System (Full-Stack SaaS)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

A modern, high-performance full-stack car rental platform. Built with a focus on optimal state management, secure API communication, and a clean user interface. 

🚀 **[Live Demo: Click Here to View the Application](https://rent-a-car-frontend-eight.vercel.app/)** *(Note: The backend is hosted on a free Render tier. It may take 30-40 seconds to wake up upon initial request. A custom loading animation handles this UX seamlessly.)*

---

## ✨ Key Features

* **Cloud Image Management:** Seamless car image uploads and delivery via Cloudinary integration.
* **Secure Authentication:** JWT-based user authentication and role-based access control (Admin/User) via Spring Security.
* **Optimized Data Fetching:** Utilizes TanStack React Query for advanced caching and state management.
* **Dynamic Environment Routing:** Environment variables handle dynamic routing between `localhost` for development and production URLs on Vercel/Render.
* **Full CRUD Operations:** Complete Admin panel for managing brands, models, and individual car listings.

---

## 💻 Tech Stack

### Frontend
* **Core:** React 18 (Vite), TypeScript
* **Styling:** Tailwind CSS
* **State Management:** TanStack React Query
* **Deployment:** Vercel

### Backend
* **Core:** Java 17+, Spring Boot 3
* **Database:** PostgreSQL (Cloud Hosted) & Spring Data JPA / Hibernate
* **Security:** Spring Security & JWT
* **Storage:** Cloudinary API
* **Deployment:** Render.com

---

## 🚀 Quick Start (Local Development)

If you want to run this project locally, follow these steps:

### 1. Backend Setup
Navigate to the backend directory and configure your environment:
```bash
cd rent-a-car-backend
Create an application-dev.properties or configure your environment variables for:

Database credentials (SPRING_DATASOURCE_URL, PASSWORD)

Cloudinary API Keys (CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET)

Run the application:

Bash
./mvnw spring-boot:run
2. Frontend Setup
Navigate to the frontend directory:

Bash
cd rent-a-car-frontend
Create a .env file in the root directory:

Plaintext
VITE_API_URL=http://localhost:8080
Install dependencies and start:

Bash
npm install
npm run dev

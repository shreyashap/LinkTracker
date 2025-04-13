# 🔗 Shrtly - Link Tracker & URL Shortener


![Shrtly_03](https://github.com/user-attachments/assets/e929d2f1-6244-4e20-950d-5acef31acec1)

Shrtly is a modern, full-stack web application that allows users to shorten long URLs, track their usage through detailed analytics, and manage all their links in one place. Think of it like a custom Bitly — but smarter and built by you!

---

## ✨ Features

- 🔐 **User Authentication** with Google Sign-In & manual registration
- 🧾 **Short URL generation** for long links
- 📊 **Analytics dashboard** with charts for:
  - Clicks over time
  - Browser breakdown
  - Device breakdown
- 🔍 **Search & filter** links
- 🗂 **Pagination** for managing large sets of URLs
- 📄 **Export analytics** as PDF (including charts + data)
- 🧾 **Detailed Link Info** including expiration, creation date, total clicks
- ❌ **Delete links** with confirmation & feedback via toast
- 🌙 **Dark/Light Mode**
- 🌍 **Deployed on Render & Vercel**

---

## 🚀 Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios
- Chart.js + react-chartjs-2
- React Hot Toast
- React Spinners

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- CORS
- cookie-parser

**Deployment:**
- Frontend → [Vercel](https://vercel.com)
- Backend → [Render](https://render.com)
- Database → [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## 📸 Screenshots

> Add screenshots of:
- Dashboard
- Analytics page
- Link creation
- Exported PDF preview

---

## 🛠️ Local Setup Instructions



```bash
### 1.Clone the repository

git clone https://github.com/your-username/shrtly.git
cd shrtly

### 2. Setup Backend

cd server
npm install
Create a .env file inside /server:


PORT=3000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=https://link-tracker-pied.vercel.app
Start the backend:

npm run dev

### 3. Setup Frontend

cd client
npm install
npm run dev

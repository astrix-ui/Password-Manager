
# 🔐 Password Manager

A simple and secure password manager built with React, Node.js, Express, and MongoDB.

---

## 🚀 Features

- ✅ Add and save passwords
- 📝 Edit saved entries
- 🗑️ Delete credentials
- 📋 Copy to clipboard
- 🌐 Full-stack web application

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **UUID Generation:** uuid
- **Notifications:** react-toastify

---

## 📁 Project Structure

```
passwordmanager/
├── server.js           # Backend logic
├── .env                # MongoDB connection string
├── package.json
├── .gitignore
├── public/
├── src/
│   ├── Manager.jsx     # Main component
│   ├── App.js
│   └── index.js
```

---

## ⚙️ Running Locally

### 1. Backend

```bash
npm install
node server.js
```

(Make sure MongoDB is running locally)

### 2. Frontend

If you're using Create React App:

```bash
npm start
```

App will run at [http://localhost:3000](http://localhost:3000)

---

## 🌍 Environment Variables

Create a `.env` file in root:

```env
MONGO_URI=mongodb://localhost:27017/passwordManager
```

---

## 👨‍💻 Author

[GitHub - @astrix-ui](https://github.com/astrix-ui)

---



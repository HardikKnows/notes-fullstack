# 📝 Full Stack Notes App

A simple full-stack Notes application built as part of an interview assignment.  
The app allows users to create, view, edit, and delete notes with data stored persistently in MongoDB.

---

## 🚀 Tech Stack

- **Next.js** (App Router – frontend & backend)
- **MongoDB Atlas**
- **Mongoose**
- **Tailwind CSS**
- **TypeScript**

---

## ✨ Features

- Create a new note
- View all saved notes
- Edit existing notes
- Delete notes
- Automatic creation timestamps
- Clean and responsive UI

---

## 🧠 Architecture Overview

- Frontend and backend are handled within a single **Next.js** project
- REST APIs implemented using **Next.js Route Handlers**
- **MongoDB Atlas** used for cloud-based persistent storage
- **Environment variables** used for secure configuration

---

## 📁 Project Structure

notes-fullstack/
├── app/
│ ├── api/notes/route.js
│ └── page.tsx
├── lib/
│ └── mongodb.js
├── models/
│ └── Note.js
├── public/
├── .gitignore
├── package.json
└── README.md


---

## ⚙️ Setup Instructions

1. Clone the repository

git clone https://github.com/<your-username>/notes-fullstack.git
cd notes-fullstack

2. Install dependencies

npm install

3. Create a .env.local file in the root directory

MONGODB_URI=your_mongodb_atlas_connection_string

4. Run the development server

npm run dev

5. Open the app in your browser

http://localhost:3000

# Environment Example

Create a file named .env.example in the root directory and add:

MONGODB_URI=your_mongodb_connection_string_here

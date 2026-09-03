# 🏠 Hostel Comparison

A modern React-based hostel comparison platform that allows students to
discover, filter, and compare different hostels based on important factors
such as price, rating, location, room type, and available facilities.

The project is designed to make hostel hunting easier by bringing important
information into one place.

---

## ✨ Features

- 🔍 Search and explore hostels
- 🎯 Filter hostels based on different criteria
- ⭐ Display hostel ratings
- 💰 Compare hostel prices
- 📍 View hostel locations
- 🛏️ View room and accommodation details
- 📊 Compare multiple hostels side-by-side
- 🏷️ Display available facilities
- 📱 Responsive user interface
- ⚡ Fast Vite-powered development environment

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript (ES6+)
- CSS

### Current Data Layer

- Static JavaScript data (`hotels.js`)

### Planned Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 📂 Project Structure

```text
hostel-comparison/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   │
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── CompareBar.jsx
│   │   ├── CompareTable.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── HotelCard.jsx
│   │   └── StarRating.jsx
│   │
│   ├── data/
│   │   └── hotels.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js

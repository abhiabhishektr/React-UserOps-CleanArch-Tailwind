# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

to connect with the tailwind
yarn add tailwindcss postcss autoprefixer
npx tailwindcss init -p


yarn add @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core

npm install react-icons






### Project Overview

This project is a User Management System (UMS) built using React, where Redux is utilized for state management.

### Why Redux?

Redux is integrated into this project to handle key aspects such as:

1. **Authentication State Management:** Redux manages the authentication state, ensuring consistency across components and facilitating user login/logout functionalities.

2. **User Profile Management:** Redux is used to handle user profile data, including user information, preferences, and settings.

3. **Global UI State:** Redux manages global UI state, such as loading indicators, error messages, and theme preferences, providing a centralized store for managing application-wide data.

### Benefits of Using Redux

By incorporating Redux into the project, we ensure:

- Clear separation of concerns, making it easier to manage complex state logic.
- Consistency and predictability in state management across components.
- Scalability and maintainability of the application as it grows.


 C:\Users\ASUS\Desktop\Week 19>
/client/
       ├── views/
       │   │   ├── components/
       │   │   │   ├── UserProfile.jsx
       │   │   │   └── AdminDashboard.jsx
       |   |   |   └── Modal.jsx
       |   |   |   └── Navbar.jsx
       │   │   ├── pages/
       │   │   │   ├── LoginPage.jsx
       │   │   │   ├── LandingPage.jsx
       │   │   │   ├── UserProfilePage.jsx
       │   │   │   └── AdminPage.jsx
       │   │   └── App.jsx
       │   ├── viewmodels/
       │   │   ├── UserViewModel.js
       │   │   ├── AdminViewModel.js
       │   │   └── store.js (Redux or Context API)
       │   └── styles/
       │       └── styles.css

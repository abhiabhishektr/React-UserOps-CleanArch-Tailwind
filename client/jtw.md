### Steps to Secure Frontend Routes Using JWT in a MERN Stack Project

To secure frontend routes and ensure that only authenticated users can access certain parts of your application, you can follow these steps:

1. **Generate JWT on User Login (Backend)**: Issue a JWT when the user logs in.
2. **Store JWT in Frontend**: Store the JWT in the client (typically in localStorage or cookies).
3. **Send JWT with Requests**: Include the JWT in the authorization header for protected API requests.
4. **Protect Frontend Routes (React)**: Use React Router to protect routes and redirect unauthenticated users.
5. **Verify Token in Middleware (Backend)**: Verify the JWT in the backend for protected API routes.

### Detailed Steps

#### 1. Generate JWT on User Login (Backend)

Ensure the backend generates a JWT on successful user login as shown earlier.

```javascript
// presentation/controllers/UserController.js

const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Replace with your actual secret key

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await AuthenticateUser.execute(email, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ user, token });
    } catch (error) {
        console.error('Authentication failed:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
```

#### 2. Store JWT in Frontend

Store the JWT in localStorage or cookies when the user logs in.

```javascript
// src/viewmodels/UserViewModel.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
```

#### 3. Send JWT with Requests

Include the JWT in the authorization header for protected API requests.

```javascript
// src/utils/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
});

export default api;
```

#### 4. Protect Frontend Routes (React)

Use React Router to protect routes and redirect unauthenticated users.

```javascript
// src/views/components/PrivateRoute.jsx

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = useSelector((state) => state.user.token);

    return (
        <Route
            {...rest}
            render={(props) =>
                token ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
```

Use `PrivateRoute` for protected routes.

```javascript
// src/views/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminPage from './pages/AdminPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={LoginPage} />
                <PrivateRoute path="/profile" component={UserProfilePage} />
                <PrivateRoute path="/admin" component={AdminPage} />
            </Switch>
        </Router>
    );
};

export default App;
```

#### 5. Verify Token in Middleware (Backend)

Ensure the backend verifies the JWT for protected routes.

```javascript
// infrastructure/middlewares/AuthMiddleware.js

const AuthService = require('../services/AuthService');

const AuthMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    const decoded = AuthService.verifyToken(token);
    if (!decoded) {
        return res.status(500).json({ message: 'Failed to authenticate token' });
    }

    req.userId = decoded.id;
    next();
};

module.exports = AuthMiddleware;
```

Apply the middleware to protected routes.

```javascript
// presentation/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const AuthMiddleware = require('../../infrastructure/middlewares/AuthMiddleware');

router.post('/login', userController.userLogin);
router.post('/signup', userController.userSignup);

// Protected route example
router.get('/profile', AuthMiddleware, userController.getUserProfile);

module.exports = router;
```

### Summary

1. **Generate JWT** on user login in the backend.
2. **Store JWT** in localStorage on the frontend.
3. **Send JWT** with authorization header in protected API requests.
4. **Protect Routes** in React using `PrivateRoute`.
5. **Verify JWT** in middleware for protected backend routes.

This approach ensures that both the frontend and backend are secured using JWT, protecting sensitive routes and ensuring only authenticated users can access them.
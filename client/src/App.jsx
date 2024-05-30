import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminPage from './pages/AdminPage';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
// import Testing from './pages/Testing';
import AdminLoginPage from './pages/AdminLoginPage.jsx';

// import 'dotenv/config';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import HomePage from './pages/HomePage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

library.add(fab, fas);

const App = () => {

  
  return (
    <>
      <Navbar />
      <Routes>
        {/* user */}
        
        <Route path='/' Component={LandingPage} />

        <Route path='/login' Component={LoginPage} />
        <Route path='/UserProfilePage' Component={UserProfilePage} />
        <Route path='/HomePage' Component={HomePage} />

        {/* Admin */}
        <Route path='/AdminPage' Component={AdminPage} />
        <Route path='/AdminLoginPage' Component={AdminLoginPage} />
        <Route path='/Test' Component={ErrorPage} />
        <Route path='*' Component={ErrorPage} />
      </Routes>
    </>
  );
};

export default App;

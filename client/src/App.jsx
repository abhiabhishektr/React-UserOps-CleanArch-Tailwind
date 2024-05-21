// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminPage from './pages/AdminPage';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';


import Testing from './pages/Testing';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab, fas);



const App = () => {

  return (

    <>
      <Navbar />
      <Routes>
        {/* <Route path='/login' element={<LoginPage />}/> */}
        <Route path='/' Component={LandingPage} />
        <Route path='/login' Component={LoginPage} />
        <Route path='/UserProfilePage' Component={UserProfilePage} />
        <Route path='/AdminPage' Component={AdminPage} />
        <Route path='/Testing' Component={Testing} />



      </Routes>
    </>
  );
};

export default App;

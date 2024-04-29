import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home.js';
import MLB from './pages/MLB';
import Test from './pages/Test.js';
import { UserProvider, RequireUser } from './auth/UserContext.js';
import Login from './pages/login.js';
import SignUp from './pages/SignUp';
import NBA from './pages/NBA.jsx';
import Profile from './pages/Profile';


function App() {

  return (
    <div className='App'>
      <UserProvider>
        <Routes>
          <Route element={<RequireUser />}>
            <Route path="/" element={<Home />} />
            <Route path="/mlb" element={<MLB />} />
            <Route path="/nba" element={<NBA />} />
            <Route path="/test" element={<Test />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route index path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/temp" element={<Query />} /> */}
        </Routes>
      </UserProvider>

    </div>
  );
}

export default App;

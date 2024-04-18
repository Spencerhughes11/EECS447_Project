import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home.js';
import Temp from './pages/Temp.js';
import Login from './pages/login.js';
import { useState } from 'react';

function App() {
  const [seen, setSeen] = useState(true);

  function togglePop() {
    setSeen(!seen);
  };
  return (
    <div className='App'>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/temp" element={<Temp />} />
      </Routes>
      <button className='login' onClick={togglePop}>Login/signup</button>
      {seen ? <Login toggle={togglePop} /> : null}
    </div>
  );
}

export default App;

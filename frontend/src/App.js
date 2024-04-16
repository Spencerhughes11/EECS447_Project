import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home.js';
import Temp from './pages/Temp.js';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/temp" element={<Temp />} />
      </Routes>
    </div>
  );
}

export default App;

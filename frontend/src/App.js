import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home.js';
import Temp from './components/Temp.js';
import MLB from './pages/MLB.js';

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/mlb" element={<MLB />} />
        <Route path="/temp" element={<Temp />} />
      </Routes>

    </div>
  );
}

export default App;

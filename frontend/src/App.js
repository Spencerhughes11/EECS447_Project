import './App.css';
import React from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from './pages/Home.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

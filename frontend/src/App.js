import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home.js';
import MLB from './pages/MLB.js';
import Query from './components/queries.js';
import Test from './pages/Test.js';

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/mlb" element={<MLB />} />
        <Route path="/test" element={<Test />} />
        {/* <Route path="/temp" element={<Query />} /> */}
      </Routes>

    </div>
  );
}

export default App;

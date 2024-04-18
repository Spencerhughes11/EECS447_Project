import React, { useState, useEffect } from "react";
import { Col, Container, Row, Nav, Navbar } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
// components
import Header from '../components/Header'
import Login from './login.js';



export default function Home() {

    const [seen, setSeen] = useState(true);

    function togglePop() {
      setSeen(!seen);
    };

    return(
        <div>
            <div>
                <Header />
            </div>
            <Container className="d-flex h-100 ">
            
                
                Body
            </Container>
            <Container>
                <button className='login' onClick={togglePop}>Login/signup</button>
                {seen ? <Login toggle={togglePop} /> : null}
            </Container>
        </div>
    );
}
import React, { useState, useEffect } from "react";
import { Col, Container, Row, Nav, Navbar, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
// components
import Header from '../components/Header'
import Login from './login.js';
import Query from '../components/queries'



export default function Home() {

    const [seen, setSeen] = useState(true);
    let navigate = useNavigate();
    // let username = localStorage.getItem('user').replace(/['"]+/g, '');

    function togglePop() {
    //   setSeen(!seen);
      navigate('/');
    };


    return(
        <div>
            {/* <div>
                <Header  />
            </div> */}
            <Container className="d-flex h-100 ">         
                {/* Username: @{username} */}
            </Container>
            
            <Container>
                
                <button className='login' onClick={togglePop}>Login/signup</button>
                {/* {seen ? <Login toggle={togglePop} /> : null} */}
            </Container>

        </div>
    );
}
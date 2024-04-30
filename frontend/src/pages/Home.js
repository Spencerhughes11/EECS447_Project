import React, { useState, useEffect } from "react";
import { Col, Container, Row, Nav, Navbar, 
    Button, Card, CardBody, CardText, CardTitle, CardSubtitle } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
// components
import Header from '../components/Header'
import Login from './login.js';
import Query from '../components/queries'

import MLB from "../images/mlb.svg"
import NBA from "../images/nba.png"


export default function Home() {

    const [seen, setSeen] = useState(true);
    let navigate = useNavigate();
    // let username = localStorage.getItem('user').replace(/['"]+/g, '');

    function togglePop() {
    //   setSeen(!seen);
      navigate('/');
    };


    return(
        <Container className="d-flex w-100 h-75 mt-5 justify-content-between align-items-center">
            {/* <Container>
                <Header  />
            </Container> */}
            {/* <Container className=" ">          */}
               <Row>
                <Col className="h-25 mb-3">
                <Card
                    style={{
                        width: '25rem'
                    }}
                    >
                    <img
                        alt="Sample"
                        src={NBA}
                    />
                    <CardBody>
                        <CardTitle tag="h1">
                        NBA
                        </CardTitle>
                        <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                        >
                        Card subtitle
                        </CardSubtitle>
                        <CardText>
                        Some quick example text to build on the card title and make up the bulk of the card‘s content.
                        </CardText>
                        <Button>
                        Button
                        </Button>
                    </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card
                    style={{
                        width: '25rem'
                    }}
                    >
                    <img
                        alt="Sample"
                        src={MLB}
                    />
                    <CardBody>
                        <CardTitle tag="h1">
                        MLB
                        </CardTitle>
                        <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                        >
                        Card subtitle
                        </CardSubtitle>
                        <CardText>
                        Some quick example text to build on the card title and make up the bulk of the card‘s content.
                        </CardText>
                        <Button>
                        Button
                        </Button>
                    </CardBody>
                    </Card>
                </Col>
               </Row>
            {/* </Container> */}
            
            {/* <Container>
                
                <button className='login' onClick={togglePop}>Login/signup</button>
                {seen ? <Login toggle={togglePop} /> : null}
            </Container> */}

        </Container>
    );
}
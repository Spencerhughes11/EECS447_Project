import React, { useState, useEffect } from "react";
import { Col, Container, Row, Nav, Navbar } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from '../components/Header'


export default function Home() {
    return(
        <div>
            <div>
                <Header />
            </div>
            <Container className="d-flex h-100 ">
                
                Body
            </Container>
        </div>
    );
}
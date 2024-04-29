import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem, 
  NavbarText, Container
} from "reactstrap";
import { NavLink, useNavigate } from 'react-router-dom';




export default function Header({user}) {
  let username = localStorage.getItem('user') ? localStorage.getItem('user').replace(/['"]+/g, '') : '';
  let navigate = useNavigate();

  function logout() {
    console.log("userhome", localStorage.getItem('user'));
  
    localStorage.removeItem('user');
    console.log("userhome", localStorage.getItem('user'));
    navigate('/login', {replace: true});
  };

  return (
    <div>
      <Navbar dark color="primary" expand="lg" container="fluid" className="mb-2">
        {/* <NavbarBrand to="/">
        <img
            alt="logo"
            src={require("../images/basketball.svg")}
            style={{
              height: 40,
            }}
          />
        </NavbarBrand> */}
        <Nav className="mr-auto justify-content-space-between" navbar>
          <Container className="mr-5">
            <NavLink className='text-light' to="/">Home</NavLink>
          </Container>

          <Container>
            <NavLink className='text-light' to="/mlb">MLB</NavLink>
          </Container>
          <Container>
            <NavLink className='text-light' to="/nba">NBA</NavLink>
          </Container>

        </Nav>
          {localStorage.getItem('user') && 
          <Nav navbar className="d-flex m-auto align-items-center justify-content-center">
            <NavbarText>@{username}</NavbarText>
          </Nav>
          }
        <Nav className="mr-auto justify-content-space-between" navbar>
          <Container className="mr-5">
            <NavLink className='text-light' to="/profile" >Profile</NavLink>
          </Container>
          <Container className="mr-5">
            <NavLink className='text-light' to="/login" onClick={logout}>Logout</NavLink>
          </Container>

        </Nav>

      </Navbar>
    </div>
  );
}

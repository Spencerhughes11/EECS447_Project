import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Container,
  NavbarText,
} from "reactstrap";

import { Link } from "react-router-dom";





export default function Header() {

  return (
    <div>
      <Navbar dark color="primary" expand="lg" container="fluid" >
        <NavbarBrand href="/">
        <img
            alt="logo"
            src={require("../images/basketball.svg")}
            style={{
              height: 40,
            }}
          />
        </NavbarBrand>
        <Nav navbar className="d-flex m-auto align-items-center justify-content-center">
            <NavbarText>447</NavbarText>
          </Nav>

          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/temp">Other Page</NavLink>
            </NavItem>
          </Nav>

      </Navbar>
    </div>
  );
}

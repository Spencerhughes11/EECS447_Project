import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";


export default function Header() {

  return (
    <div>
      <Navbar dark color="primary" expand="lg" container="fluid" className="mb-2">
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
              <NavLink href="/mlb">MLB</NavLink>
            </NavItem>

          </Nav>

      </Navbar>
    </div>
  );
}

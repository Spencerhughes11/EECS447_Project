import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

import Login from "../pages/login.js";

const loginsignup = () => {

}

export default function Header() {
  const [signedin, setsignedin] = useState(false);
  const [account, setAccount] = useState('ACCOUNT')
  const [dropdownOpen, setDropdownOpen] = useState(false);
  

  
  
  const [seen, setSeen] = useState(false);

  function togglePop() {
    setSeen(!seen);
  };
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

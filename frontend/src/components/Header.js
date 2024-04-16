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

import { BiUserCircle } from "react-icons/bi";




export default function Header() {
  // TEMP ACCOUNT HOLDERS
  const accountOptions = ["insta", "facebook", "twitter"];

  const [account, setAccount] = useState('ACCOUNT')
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const toggleDD = () => setDropdownOpen((prevState) => !prevState);
  
  const toggleAccountDD = () => setAccountDropdownOpen((prevState) => !prevState);

  const toggleNav = () => setIsOpen(!isOpen);

// CHANGE TYPE when using account ?
  const handleDropdownChange = (account) => {
    setAccount(account);
  };
  

  return (
    <div>
      <Navbar dark color="primary" expand="lg" full container="fluid" >
        <NavbarBrand href="/">
        <img
            alt="logo"
            src={require("../images/basketball.svg")}
            style={{
              height: 40,
            }}
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggleNav} />
        <Collapse isOpen={isOpen} navbar>
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

        </Collapse>
      </Navbar>
    </div>
  );
}

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';
import { useUser } from '@clerk/clerk-react';


function Menu() {
    let owner
    const { user, isLoaded, isSignedIn } = useUser();
    if (user) owner = true


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">MyRide</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About MyRide</Nav.Link>
            <NavDropdown title="Profile Options" id="basic-nav-dropdown">
              {owner && <NavDropdown.Item href={"/"+user.username}>My Profile</NavDropdown.Item>}
              {owner && <NavDropdown.Item href={"/"+user.username+"/edit"}> Edit My Profile</NavDropdown.Item>}
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
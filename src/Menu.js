import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';
import { useUser } from '@clerk/clerk-react';
import Login from './login';
import './App.css';


function Menu() {
    let owner;
    const { user, isLoaded, isSignedIn } = useUser();
  
    return (
        <Navbar expand="true" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/"style={{ fontSize: '2rem' }}>MyRide</Navbar.Brand>
                <div className="d-flex align-items-center">
                    <Login className="btn btn-primary me-2 custom-login-btn" /> {/* Add custom class here */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </div>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About MyRide</Nav.Link>
                        {isSignedIn && <Nav.Link href={"/" + user.username}>My Profile</Nav.Link>}
                        {isSignedIn && <Nav.Link href={"/" + user.username + "/edit"}> Edit My Profile</Nav.Link>}
                   </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
    
}

export default Menu;

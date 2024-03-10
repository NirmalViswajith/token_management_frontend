// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
const Navbar2 = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Link className="decor" to="/tokenPage">Token</Link>
            <Link className="decor" to="/dashboard">Dashboard</Link>
            <Link className="decor" to="/admin_panel">Admin Panel</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbar2;

import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, Redirect, useLocation } from 'react-router-dom';
import './HomeNavbar.css'; // Import custom CSS file
import swal from "sweetalert2";

function HomeNavbar() {
  const location = useLocation();

  return (
    <>
      <Nav className='custom-navbar fixed-top'>
        <div className='d-flex justify-content-between w-100'>
          <div className='d-flex'>
            <Navbar.Brand className="brand-text">Codeworld</Navbar.Brand>
          </div>
          <div className='d-flex'>
            <Nav.Link as={Link} to="/" className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`}><b>Home</b></Nav.Link>
            <Nav.Link as={Link} to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}><b>About</b></Nav.Link>
            <Nav.Link as={Link} to="/courses" className={`nav-link ${location.pathname === '/courses' ? 'active' : ''}`}><b>Courses</b></Nav.Link>
            <Nav.Link as={Link} to="/admin/login" className={`nav-link ${location.pathname === '/admin/login' ? 'active' : ''}`}><b>Administrator</b></Nav.Link>
            <Nav.Link as={Link} to="/user-login" className={`nav-link ${location.pathname === '/user-login' ? 'active' : ''}`}><b>User</b></Nav.Link>            
          </div>
        </div>
      </Nav>
    </>
  );
}

export default HomeNavbar;

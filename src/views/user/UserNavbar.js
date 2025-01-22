import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, Redirect, useLocation } from 'react-router-dom';
import './UserNavbar.css';
import swal from "sweetalert2";

function UserNavbar() {

    const location = useLocation();
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const handleLogout = (e) => {
        e.preventDefault();
        const swalWithBootstrapButtons = swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes,Logout!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                setUserLoggedIn(true);
                swalWithBootstrapButtons.fire({
                    title: "Logged Out!",
                    icon: "success"
                });
                sessionStorage.removeItem("usersession");
            } else if (
                result.dismiss === swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    icon: "error"
                });
            }
        });
    }

    if (userLoggedIn) {
        return <Redirect to="/home" />
    }

    return (
        <>
            <Nav className='custom-navbar fixed-top'>
                <div className='d-flex justify-content-between w-100'>
                    <div className='d-flex'>
                        <Navbar.Brand className="brand-text">Codeworld</Navbar.Brand>
                    </div>
                    <div className='d-flex'>
                        <Nav.Link as={Link} to="/user-home" className={`nav-link ${location.pathname === '/user-home' ? 'active' : ''}`}><b>Home</b></Nav.Link>
                        <Nav.Link as={Link} to="/user-about" className={`nav-link ${location.pathname === '/user-about' ? 'active' : ''}`}><b>About</b></Nav.Link>
                        <Nav.Link as={Link} to="/user-course" className={`nav-link ${location.pathname === '/user-course' ? 'active' : ''}`}><b>Courses</b></Nav.Link>
                        <Nav.Link as={Link} to="/user-account" className={`nav-link ${location.pathname === '/user-account' ? 'active' : ''}`}><b>Account</b></Nav.Link>                        
                        <Nav.Link as={Link} onClick={handleLogout}><b>Logout</b></Nav.Link>
                    </div>
                </div>
            </Nav>
        </>
    );
}

export default UserNavbar;

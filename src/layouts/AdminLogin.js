import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { BASE_URL } from "../commonApi";
import swal from "sweetalert2";
import "./AdminLogin.css";
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
    Form,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import HomeNavbar from "views/Common/Navbar";

function AdminLogin() {

    const [loggedIn, setLoggedIn] = useState(false);

    const [formData, setFormData] = useState({
        aemail: "",
        apass: ""
    });

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(BASE_URL + '/admindb.php', {
            method: 'POST',
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log("data : ", data); // Handle response from API
                if (data.status === "yes") {
                    setLoggedIn(true);
                    swal.fire({
                        icon: "success",
                        title: "Logged In Successfully"
                    });
                    sessionStorage.setItem("session", JSON.stringify(data.session));
                } else {
                    console.error('Login failed:', data.message);
                    swal.fire({
                        icon: "error",
                        title: "Login Failed",
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error); // Handle errors
            });
    }

    if (loggedIn || sessionStorage.getItem('session')) {
        return <Redirect to="/admin/dashboard" />
    }

    return (
        <>
        <HomeNavbar/>
            <div className="container-fluid loginform">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-lg-4">
                        <div className="logincard auth-form-light text-center py-6 px-4 px-sm-5 border border-2" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                            {/* <div className="brand-logo">
                                <img src="" alt="logo" style={{ width: '70%', height: 'auto' }} />
                            </div> */}
                            <h4>Hello! let's get started</h4>
                            <h6 className="font-weight-light">Sign in to continue.</h6>
                            <form className="pt-3" method="post" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg" name="aemail" onChange={handleChange} placeholder="Username" style={{ backgroundColor: '#f8f9fa', color: '#495057', border: '1px solid #ccc' }} />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-lg" name="apass" onChange={handleChange} placeholder="Password" style={{ backgroundColor: '#f8f9fa', color: '#495057', border: '1px solid #ccc' }} />
                                </div>
                                <div className="mt-3">
                                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit" value="submit">LOG IN</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>``
            </div>
        </>
    );
}

export default AdminLogin;

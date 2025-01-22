import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { BASE_URL } from "../../commonApi";
import swal from "sweetalert2";
import "./UserLogin.css"
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import HomeNavbar from "../Common/Navbar";

function UserLogin() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegLogin, setShowRegLogin] = useState(true);

  const [formData, setFormData] = useState({
    sfname: "",
    slname: "",
    semail: "",
    spass: "",
    smobile: ""
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const [errors, setErrors] = useState({});

  const validation = () => {
    let errors = {};
    const namePattern = /^[A-Za-z\s]+$/; // Allows spaces
    const passPattern = /^[A-Za-z0-9_@./#&+-]*$/;
    const contactPattern = /^[6-9]{1}[0-9]{9}$/;
    const emailPattern = /^[a-z0-9._%+-]+@[a-z]+\.[a-z]{2,4}$/;

    if (!formData.sfname) {
      errors.sfname = "* First Name is required";
    } else if (!namePattern.test(formData.sfname)) {
      errors.sfname = "* Enter a valid First Name";
    }

    if (!formData.slname) {
      errors.slname = "* Last Name is required";
    } else if (!namePattern.test(formData.slname)) {
      errors.slname = "* Enter a valid Last Name";
    }

    if (!formData.semail) {
      errors.semail = "* Email is required";
    } else if (!emailPattern.test(formData.semail)) {
      errors.semail = "* Enter a validEmail";
    }

    if (!formData.spass) {
      errors.spass = "* Password is required";
    } else if (!passPattern.test(formData.spass)) {
      errors.spass = "* Invalid Password";
    }

    if (!formData.smobile) {
      errors.smobile = "* Mobile Number is required";
    } else if (!contactPattern.test(formData.smobile)) {
      errors.smobile = "* Invalid Mobile Number";
    }

    setErrors(errors);
    return errors;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const validationErrors = validation();
    if (Object.keys(validationErrors).length === 0) {
      fetch(BASE_URL + '/register.php', {
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
              title: "Account Created Successfully"
            });
          } else {
            console.error('Login failed:', data.message);
            swal.fire({
              icon: "error",
              title: "Failed to Create Acount",
            });
          }
        })
        .catch(error => {
          console.error('Error:', error); // Handle errors
        });
    }
    else {
      setErrors(validationErrors);
    }
  }

  //Login

  const [loggedIn1, setLoggedIn1] = useState(false);

  const [formData1, setFormData1] = useState({
    semail: "",
    spass: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData1({
      ...formData1,
      [e.target.name]: e.target.value
    });
  }

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(BASE_URL + '/logindb.php', {
      method: 'POST',
      body: JSON.stringify(formData1)
    })
      .then(response => response.json())
      .then(data => {
        console.log("data : ", data); // Handle response from API
        if (data.status === "yes") {
          setLoggedIn1(true);
          swal.fire({
            icon: "success",
            title: "Logged In Successfully"
          });
          sessionStorage.setItem("usersession", JSON.stringify(data.session));
          sessionStorage.setItem("stud_id", data.studId);
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

  if (loggedIn1) {
    return <Redirect to="/user-home" />
  }

  return (
    <>
      <HomeNavbar />
      {showRegLogin ?
        <div className="container-fluid loginform">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-lg-4">
              <div className="logincard auth-form-light text-center py-6 px-4 px-sm-5 border border-2" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                {/* <div className="brand-logo">
                                    <img src={zerosblack} alt="logo" style={{ width: '70%', height: 'auto' }} />
                                </div> */}

                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Form role="form">
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Email" name="semail" onChange={handleChange} type="email" />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        autoComplete="off"
                        name="spass"
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                      onClick={handleLogin}
                    >
                      Sign in
                    </Button>
                    <p className="mt-4">Don't Have Account. <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => setShowRegLogin(false)}>Register Here</span></p>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
        :
        <div className="container-fluid loginform">
          <div className="row justify-content-center h-50">
            <div className="">
              <div className="logincardr auth-form-light text-center py-6 px-4 px-sm-5 border border-2" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                {/* <div className="brand-logo">
                                    <img src={zerosblack} alt="logo" style={{ width: '70%', height: 'auto' }} />
                                </div> */}
                <h6 className="font-weight-light">Sign Up to continue.</h6>
                <Form role="form">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="First Name" name="sfname" onChange={handleInputChange} type="text" />
                      <Input className="" placeholder="Last Name" name="slname" onChange={handleInputChange} type="text" />
                    </InputGroup>
                    <div className="d-flex ">
                    {errors.sfname && (
                      
                      <div className="text-danger mb-4">
                        {errors.sfname}
                      </div>
                    )}
                    {errors.slname && (
                      <div className="text-danger mb-4">
                        {errors.slname}
                      </div>
                    )}
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Email" name="semail" onChange={handleInputChange} type="email" />
                    </InputGroup>
                      {errors.semail && (
                        <div className="text-danger mb-4">
                          {errors.semail}
                        </div>
                      )}
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        name="spass"
                        onChange={handleInputChange}
                        type="password"
                        autoComplete="off"
                      />
                          </InputGroup>
                      {errors.spass && (
                        <div className="text-danger mb-4">
                          {errors.spass}
                        </div>
                      )}
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Contact" name="smobile" onChange={handleInputChange} type="text" />
                      </InputGroup>
                      {errors.smobile && (
                        <div className="text-danger mb-4">
                          {errors.smobile}
                        </div>
                      )}
                  </FormGroup>
                  <div className="text-center">
                    <Button
                      className="mt-4"
                      color="primary"
                      type="button"
                      onClick={handleRegister}
                    >
                      Create account
                    </Button>
                    <p className="mt-4">Already Have an Account ? <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => setShowRegLogin(true)}>Login Here</span></p>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default UserLogin;

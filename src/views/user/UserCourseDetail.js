import React, { useEffect, useState } from "react";
import UserNavbar from "./UserNavbar";
import { BASE_URL } from "commonApi";
import "./UserCourseDetail.css"
import axios from 'axios';
import payment from "./payment.jpeg";
import swal from "sweetalert2";
import QRCode from 'qrcode.react';
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
import Footer from "views/Common/Footer";
import { Redirect } from "react-router";

const UserCourseDetail = () => {
    const courseId = localStorage.getItem('courseId');
    useEffect(() => {
        document.documentElement.scrollTop = 0;
    });

    const [formData, setFormData] = useState([]);
    const [formData1, setFormData1] = useState([]);
    const [showCourseUI, setShowCourseUI] = useState(true);
    const [showPaymentUI, setShowPaymentUI] = useState(false);
    const [showAfterPayment, setShowAfterPayment] = useState(false);
    const [courseName, setCourseName] = useState("");
    const [backToCourse, setBackToCourse] = useState(false);

    useEffect(() => {
        axios.get(`${BASE_URL}/onlinecoursesfetchbyid.php?id=${courseId}`)
            .then(response => {
                const fetchedData = response.data[0];
                setFormData(fetchedData);
                setCourseName(fetchedData.on_title);
                console.log(fetchedData.on_title);
            })
            .catch(error => {
                console.log("Error:", error);
            });
    }, []);

    useEffect(() => {
        setFormData1({
            on_course_id: courseId,
            on_course_name: courseName,
            stud_id: sessionStorage.getItem("stud_id"),
            stud_display_name: "",
            stud_mobile: "",
            transaction_id: "",
            payment: "Pending",
        });
    }, [courseName, courseId]);

    const handleInputChange = (e) => {
        e.preventDefault();
        setFormData1({
            ...formData1,
            [e.target.name]: e.target.value
        });
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     fetch(BASE_URL + '/enrollments.php', {
    //         method: 'POST',
    //         body: JSON.stringify(formData1)
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.status === "yes") {
    //                 swal.fire({
    //                     icon: "success",
    //                     title: "Enrollled Successfully"
    //                 });
    //                 setShowCourseUI(false);
    //                 setShowPaymentUI(false);
    //                 setShowAfterPayment(true);
    //             } else {
    //                 swal.fire({
    //                     icon: "error",
    //                     title: "Failed to Enroll Course",
    //                 });
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error:', error); // Handle errors
    //         });
    // }

    const handleSubmit = (id) => {
        swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to refund this payment!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Buy this course',
            cancelButtonText: 'No, cancel it'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(BASE_URL + '/enrollments.php', {
                    method: 'POST',
                    body: JSON.stringify(formData1)
                })
                    .then(response => {
                        console.log("data : ", response.data);
                        swal.fire({
                            icon: "success",
                            text: "We will confirm your payment within few hours",
                            title: "Enrolled Successfully"
                        });
                        setShowCourseUI(false);
                        setShowPaymentUI(false);
                        setShowAfterPayment(true);
                    })
                    .catch(error => {
                        swal.fire({
                            icon: "error",
                            title: "Something Went Wrong"
                        });
                    });
            } else if (result.dismiss === swal.DismissReason.cancel) {
                swal.fire({
                    title: "Cancelled",
                    icon: "error"
                });
            }
        });
    }

    const handleBackToCourse = () => {
        setBackToCourse(true);
    }

    if (backToCourse) {
        return <Redirect to="user-course" />
    }

    const handleBackCourse = () => {
        setBackToCourse(true);
    }

    const paymentURL = `upi://pay?pa=8857012009kotak@ybl&pn=Samarth Bhandare&am=${formData.on_fees}&cu=INR`

    return (
        <>
            <UserNavbar />
            {showCourseUI && <>
                <div className="detailPage py-4">
                    <section className="mx-5 my-3">
                        <Container fluid>
                            <Row>
                                <Col lg="6" md="6">
                                    <div className="choose__content">
                                        <h2 className="">{formData.on_title}</h2>
                                        <p className="my-3">{formData.on_description}</p>
                                        "Mark your calendars! Our course runs from <u>{formData.on_start_date}</u> to <u>{formData.on_end_date}</u>. Get ready to learn, grow, and succeed!"
                                        <p className="my-3">Enroll today for just ₹ {formData.on_fees} /- and invest in your future!</p>
                                    </div>
                                    <button className="btn btn-primary text-white" onClick={handleBackCourse}>Back</button>
                                    <button className="btn btn-success text-white" onClick={() => { setShowCourseUI(false); setShowPaymentUI(true); }}>Buy this course</button>
                                </Col>

                                <Col lg="6" md="6">
                                    <div className="choose__img">
                                        <img src={formData.on_image_path} alt="" className="w-100" />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </div>
                <div>
                    <section className="mx-5 my-3">
                        <Container fluid>
                            <h2 className="my-4">This course includes:</h2>
                            <Row className="my-2">
                                <Col md="4">
                                    <ul>
                                        <li><h5>Flexible Learning Paths</h5></li>
                                        <li><h5>Lifetime Updates</h5></li>
                                        <li><h5>Language Support</h5></li>
                                        <li><h5>Personalized Feedback</h5></li>
                                    </ul>
                                </Col>
                                <Col md="4">
                                    <ul>
                                        <li><h5>Access on mobile and TV</h5></li>
                                        <li><h5>Quizzes and Assessments</h5></li>
                                        <li><h5>5 coding exercises</h5></li>
                                        <li><h5>Practical Projects</h5></li>
                                    </ul>
                                </Col>
                                <Col md="4">
                                    <ul>
                                        <li><h5>Live Q&A Sessions</h5></li>
                                        <li><h5>Interview Preparation</h5></li>
                                        <li><h5>Job Placement Assistance</h5></li>
                                        <li><h5>Certificate of completion</h5></li>
                                    </ul>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </div>
            </>}

            {showPaymentUI &&
                <div className="detailPage py-4">
                    <section className="mx-5 my-3">
                        <Container fluid>
                            <Row>
                                <Col>
                                    <div className="container-fluid">
                                        <h2 className="text-center">Enter Your Details</h2>
                                        <Form role="form">
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-email-83" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="Enter Display Name" name="stud_display_name" value={formData1.stud_display_name} onChange={handleInputChange} type="email" required />
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
                                                        placeholder="Transaction Id"
                                                        name="transaction_id"
                                                        value={formData1.transaction_id}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        required
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-email-83" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="Your Contact" value={formData1.stud_mobile} name="stud_mobile" onChange={handleInputChange} type="text" required />
                                                </InputGroup>
                                            </FormGroup>                                            
                                            <div className="text-center mt-4">
                                                <button
                                                    className="btn bt`n-success text-white"
                                                    onClick={() => { setShowCourseUI(true); setShowPaymentUI(false); }}
                                                >
                                                    Cancel
                                                </button>
                                                <Button
                                                    className=""
                                                    color="primary"
                                                    type="button"
                                                    onClick={handleSubmit}
                                                >
                                                    Pay ₹ {formData.on_fees} /-
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </Col>  
                                <Col className="text-center">
                                <div>
                                    <h2 className="text-white">Scan Here</h2>
                                </div>
                                <div className="mt-2">
                                        {/* <QRCode value={paymentURL} /> */}
                                        <QRCode value={paymentURL} style={{width:'150px',height:'150px'}}/>
                                    </div>
                                </Col>                           
                            </Row>
                        </Container>
                    </section>
                </div>
            }

            {showAfterPayment &&
                <>
                    <div className="detailPage py-4">
                        <section className="mx-5 my-3">
                            <Container fluid>
                                <Row>
                                    <Col lg="12" md="12">
                                        <div className="container-fluid text-center">
                                            <h2 className="text-center">Your enrollment has been successfully completed! You can now view the classes you've enrolled in by accessing your <b>Account</b> section on our website. Additionally, we'll be providing you with the link to access the online classes via <b>WhatsApp</b>. Keep an eye on your WhatsApp messages for further instructions and the class link. Looking forward to seeing you in class! </h2>
                                            <button className="btn btn-fill btn-primary" type="button" onClick={handleBackToCourse}>Back to Courses</button>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </section>
                    </div>
                </>
            }

            {/* <Footer/> */}
        </>
    )
}

export default UserCourseDetail;
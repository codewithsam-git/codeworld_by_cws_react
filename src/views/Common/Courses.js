import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import courseImg1 from "../../assets/img/web-design.png";
import courseImg2 from "../../assets/img/graphics-design.png";
import courseImg3 from "../../assets/img/ui-ux.png";
import "./Courses.css";
import CourseCard from "./CoursesCard";
import HomeNavbar from "./Navbar";
import axios from 'axios';
import { BASE_URL } from "commonApi";
import "./Courses.css"
import CoursesCard1 from "./CoursesCard1";
import CourseCardOffline from "./CourseCardOffline";
import Footer from "./Footer";

const Courses = () => {

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    })

    const [onlineCourses, setOnlineCourses] = useState([]);
    const [offlineCourses, setOfflineCourses] = useState([]);

    useEffect(() => {
        fetchOnlineCourses();
        fetchOfflineCourses();
    }, []);

    const fetchOnlineCourses = () => {
        axios.get(`${BASE_URL}/onlinecourses.php`)
            .then(response => {
                setOnlineCourses(response.data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    };

    const fetchOfflineCourses = () => {
        axios.get(`${BASE_URL}/offlinecourses.php`)
            .then(response => {
                setOfflineCourses(response.data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    };

    return (
        <>
            <HomeNavbar />
            <CoursesCard1 />
            <section className="card-style mt-0">
                <Container fluid className="">
                    <Row className="coursebg mb-5">
                        <Col lg="12">
                            <div>
                                <h2 className="text-center text-dark my-5"><b>See what you can Learn Online</b></h2>
                            </div>
                        </Col>
                        {onlineCourses.map((item) => (
                            <Col lg="3" md="6" sm="6">
                                <CourseCard key={item.id} title={item.on_title} imgUrl={item.on_image_path} fees={item.on_fees} courseId={item.id}/>
                            </Col>
                        ))}
                    </Row>

                    <Row>
                        <Col lg="12" className="">
                            <div>
                                <h2 className="text-center text-dark mt-0"><b>Our Available Offline Courses</b></h2>
                                <h5 className="text-center text-dark mb-5"><b>"Offline learning, on your terms."</b></h5>
                            </div>
                        </Col>
                        {offlineCourses.map((item) => (
                            <Col lg="3" md="6" sm="6">
                                <CourseCardOffline key={item.id} title={item.off_title} imgUrl={item.off_image_path} fees={item.off_fees}/>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
            <Footer/>e
        </>
    );
};

export default Courses;

import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../Common/Courses.css";
import { Redirect } from "react-router";

const UserHomeCourses = () => {

    const[forward,setForward]=useState(false);

    if(forward){
        return <Redirect to="/user-course"/>
    }

    return (
        <>
            <section className="card-style mt-0">
                <Container fluid className="coursebg py-5">
                    <Row>
                        <Col lg="12" className="">
                            <div className="px-4">
                                <h2 className="mt-0" id="homecourseh2"><b>"Get excited about learning with our handpicked courses"</b></h2>
                                <p className="text-dark" ><b>Unlock your potential with our selection of courses. From beginner-friendly workshops to advanced programs, we offer something for everyone. Start your learning journey today!</b></p>
                            </div>
                        </Col>
                        <Col lg="12">
                            <div className="px-4">
                                <button className="viewmorebtn" onClick={()=>{setForward(true)}}>View More . . .</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default UserHomeCourses;

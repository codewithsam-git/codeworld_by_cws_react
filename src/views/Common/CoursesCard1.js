import React from "react";
import { Container, Row, Col } from "reactstrap";
import AboutCard1Img from "../../assets/img/CoursesCard1.jpg"
import "./AboutCard1.css";

const CoursesCard1 = () => {
    return (
        <section className="card border-0 mx-5 my-5">                    
            <Container fluid className="card-style">
                <Row>
                    <Col lg="6" md="6">
                        <div className="choose__content mt-5">
                            <h1 id="h1">Explore Our Popular Courses : </h1><h2>Unlock new skills and knowledge with our diverse selection of highly-rated courses.</h2>
                        </div>
                    </Col>

                    <Col lg="6" md="6">
                        <div className="choose__img">
                            <img src={AboutCard1Img} alt="" className="w-100" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default CoursesCard1;

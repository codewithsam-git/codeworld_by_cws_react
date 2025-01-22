import React from "react";
import { Container, Row, Col } from "reactstrap";
import AboutCard1Img from "../../assets/img/AboutCard1.png"
import "./AboutCard1.css";

const AboutCard1 = () => {
    return (
        <section className="mx-5 my-5">                    
            <Container fluid className="card-style">
                <Row>
                    <Col lg="6" md="6">
                        <div className="choose__content">
                            <h1>Here, we believe in nurturing creative minds to become tomorrow's innovators</h1>
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

export default AboutCard1;

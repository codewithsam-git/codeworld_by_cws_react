import React from "react";
import { Container, Row, Col } from "reactstrap";
import chooseImg from "../../assets/img/choose.png";
import "./Choose.css";

const Choose = () => {
    return (
        <section className="mx-5 my-5">
            <Container fluid>
                <Row>
                    <Col lg="6" md="6">
                        <div className="choose__content">
                            <h2>Why Choose Us</h2>
                            <p>
                                At CODEWORLD, we stand out as a beacon of excellence in the realm of education, offering a dynamic blend of offline and online learning experiences tailored to meet the diverse needs of our students. With a rich legacy of nurturing talent and fostering academic success, we take pride in our team of dedicated educators who are committed to empowering every learner to unlock their full potential. Our hybrid approach seamlessly integrates traditional classroom teachings with cutting-edge online resources, ensuring flexibility and accessibility without compromising on quality. Whether you prefer the interactive environment of our physical classrooms or the convenience of our virtual learning platform, we provide comprehensive support and personalized guidance every step of the way. With a proven track record of delivering exceptional results, backed by state-of-the-art facilities and innovative teaching methodologies, CODEWORLD is your trusted partner in shaping a brighter future."
                            </p>
                        </div>
                    </Col>

                    <Col lg="6" md="6">
                        <div className="choose__img">
                            <img src={chooseImg} alt="" className="w-100" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Choose;

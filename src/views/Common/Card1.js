import React from "react";
import { Container, Row, Col } from "reactstrap";
import Card1Img from "../../assets/img/Card1.png";
import CountUp from "react-countup";
import "./Card1.css";

const Card1 = () => {
  return (
    <section className="mx-5 my-5">
      <Container fluid>
        <Row>
          <Col lg="6" md="6">
            <div className="about__img">
              <img src={Card1Img} alt="" className="w-100" />
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__content">
              <h1>Learning that gets you</h1>
              <h3>
              Skills for your present (and your future). Get started with CODEWORLD
              </h3>

              <div className="about__counter mt-4">
                <div className=" d-flex">
                  <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={20} duration={2} suffix="K" />
                    </span>

                    <p className="counter__title">Completed Projects</p>
                  </div>

                  <div className="single__counter ml-5">
                    <span className="counter">
                      <CountUp start={0} end={12} duration={2} suffix="M" />
                    </span>

                    <p className="counter__title">Students Around World</p>
                  </div>
                </div>

                <div className=" d-flex">
                  <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={95} duration={2} suffix="M" />
                    </span>

                    <p className="counter__title">Ideas Raised Funds</p>
                  </div>

                  <div className="single__counter ml-5">
                    <span className="counter">
                      <CountUp start={0} end={1} duration={2} suffix="" />
                    </span>

                    <p className="counter__title">Institute</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Card1;

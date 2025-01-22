import React from "react";
import { Redirect } from "react-router";
import { Button, Container, Row, Col } from "reactstrap";

const HomeImage = () => {
  return (
    <>
       <div className="position-relative">
        <section className="section section-hero section-shaped">
          <div className="shape shape-style-1 shape-primary">
            <span className="span-150" />
            <span className="span-50" />
            <span className="span-50" />
            <span className="span-75" />
            <span className="span-100" />
            <span className="span-75" />
            <span className="span-50" />
            <span className="span-100" />
            <span className="span-50" />
            <span className="span-100" />
          </div>
          <Container className="shape-container d-flex align-items-center py-lg">
            <div className="col px-0">
              <Row className="align-items-center justify-content-center">
                <Col className="text-center" lg="6">
                  <h1 className="text-white">Codeworld</h1>
                  <p className="lead text-white">
                  An online course platform to help turn your passion to your profession
                  </p>
                  <div className="btn-wrapper mt-5">                    
                    <Button
                      className="btn-icon mb-3 mb-sm-0"
                      color="dark"
                      href="#"
                    >
                      {/* <span className="btn-inner--icon mr-1">
                      <i className="fab fa-contactus"></i>
                      </span> */}
                      <span className="btn-inner--text p-3">
                        <span className="text-warning">Contact </span>
                        US
                      </span>
                    </Button>
                  </div>
                  <div className="mt-5">
                    <p className="text-white font-weight-bold mb-0 mr-2">
                      *proudly coded by Samarth Bhandare
                    </p>                     
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-white"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomeImage;

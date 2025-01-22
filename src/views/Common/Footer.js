import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import "./Footer.css";

const footerQuickLinks = [
  {
    display: "Home",
    url: "#",
  },
  {
    display: "About US",
    url: "#",
  },

  {
    display: "Courses",
    url: "#",
  },

  {
    display: "Blog",
    url: "#",
  },
];

const footerInfoLinks = [
  {
    display: "Privacy Policy",
    url: "#",
  },
  {
    display: "Membership",
    url: "#",
  },

  {
    display: "Purchases Guide",
    url: "#",
  },

  {
    display: "Terms of Service",
    url: "#",
  },
];

const Footer = () => {
  return (
    <footer className="footer1">
      <Container>
        <Row className="d-flex justify-content-between">
          <Col lg="6" md="6" className="mb-4">
            <h2 className=" d-flex align-items-center gap-1 text-white">
              <i class="ri-pantone-line"></i> CODEWORLD.
            </h2>

            <div className="follows">
              <p className="mb-0 text-white">Follow us on social media</p>
              <span>
                {" "}
                <a href="https://www.facebook.com/codeworld24?mibextid=ZbWKwL">
                <i className="fab fa-facebook-square mx-3"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="https://instagram.com/codeworld.co.in?igshid=MzRlODBiNWFlZA==">
                <i className="fab fa-instagram-square mx-3"></i>
                </a>
              </span>

            </div>
          </Col>        

          <Col lg="6" md="6" className="text-white">
            <h3 className="fw-bold text-white">Get in Touch</h3>
            <p> Phone: +91 8857012009 </p>
            <p>Email: samarthb.2525@gmail.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

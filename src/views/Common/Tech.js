import React from "react";
import { Container, Row, Col } from "reactstrap";

const Tech = () => {
  return (
    <div className="p-5 my-5 bg-secondary">
      <section>
        <Container fluid>
          <Row>
            <Col>
              <h3 className="d-flex align-items-center gap-1">
                <i className="fab fa-html5 mx-3"></i> HTML-CSS
              </h3>
            </Col>

            <Col lg="2" md="3" sm="4" xs="6">
              <h3 className="d-flex align-items-center gap-1">
                <i className="fab fa-js mx-3"></i> JavaScript
              </h3>
            </Col>

            <Col lg="2" md="3" sm="4" xs="6">
              <h3 className="d-flex align-items-center gap-5">
                <i className="fab fa-react mx-3"></i> ReactJS
              </h3>
            </Col>

            <Col lg="2" md="3" sm="4" xs="6">
              <h3 className="d-flex align-items-center gap-1">
                <i className="fab fa-java mx-3"></i> Sprint Boot
              </h3>
            </Col>

            <Col lg="2" md="3" sm="4" xs="6">
              <h3 className="d-flex align-items-center gap-1">
                <i className="fab fa-php mx-4 "></i> CodeIgniter
              </h3>
            </Col>

            <Col lg="2" md="3" sm="4" xs="6">
              <h3 className="d-flex align-items-center gap-1">
                <i className="fab fa-python mx-3"></i> DJango
              </h3>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Tech;

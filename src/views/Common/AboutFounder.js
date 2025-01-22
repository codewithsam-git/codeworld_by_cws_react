import React from "react";
import { Container, Row, Col } from "reactstrap"
import FounderImg1 from "../../assets/img/sagarsir.jpg"
import FounderImg2 from "../../assets/img/abhisir.jpg"
import "./AboutFounder.css";
import FounderCard from "./FounderCard";

const coursesData = [
    {
        id: "01",
        title: "Sagarr Dudhankar",
        post : "Founder & CEO",     
        imgUrl: FounderImg1,
    },

    {
        id: "02",
        title: "Abhishek Lomte",
        post : "Founder & COO",       
        imgUrl: FounderImg2,
    }
];

const AboutFounder = () => {
    return (
        <section>
            <Container>
            <hr/>
                <Row className="text-center">
                    <Col lg="12" className="mb-5">
                        <h1><b>People are the key to success</b></h1>
                    </Col>
                </Row>
                <Row>
                    {coursesData.map((item) => (
                        <Col lg="6" md="6" sm="6">
                            <FounderCard key={item.id} item={item} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default AboutFounder;

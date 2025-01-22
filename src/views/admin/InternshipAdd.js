import React, { useState,useEffect } from "react";
import { XCircle } from "@phosphor-icons/react";
import { BASE_URL } from "commonApi";
import swal from "sweetalert2";
import axios from 'axios';

import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";

function InternshipAdd(props) {

  const [onTitle, setOnTitle] = useState('')
  const [onFees, setOnFees] = useState('')
  const [onStartDate, setOnStartDate] = useState('')
  const [onEndDate, setOnEndDate] = useState('')
  const [onDescription, setOnDescription] = useState('Welcome to my online classes! I\'m dedicated to providing engaging and informative lessons that will help you succeed in your learning journey. Whether you\'re a beginner or an experienced learner, my goal is to create a supportive environment where you can thrive. Join me and let\'s explore new horizons together!')
  const [pfile, setPfile] = useState('');

  useEffect(()=>{
    if (!sessionStorage.getItem('session')) {
      return <Redirect to="/admin/login" />
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('onTitle', onTitle);
    formData.append('onFees', onFees);
    formData.append('onStartDate', onStartDate);
    formData.append('onEndDate', onEndDate);
    formData.append('onDescription', onDescription);
    formData.append('onImage', pfile);

    axios.post(BASE_URL + '/onlinecourses.php', formData)
      .then(response => {
        console.log("data : ", response.data);
        swal.fire({
          icon: "success",
          title: "Online Course Added Successfully"
        });
        handleAddCancel();
      })
      .catch(error => {
        swal.fire({
          icon: "error",
          title: "Something Went Wrong"
        });
      });
  }

  const handleAddCancel = () => {
    props.handleCancel();
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Card className="p-2">
              <Card.Header className="d-flex">
                <Card.Title as="h4">Add New Internship</Card.Title>
              </Card.Header>
              <hr />

              <Card.Body>
                <Form>
                  <Row>
                    <Col className="" md="6">
                      <Form.Group>
                        <label>Course Title</label>
                        <Form.Control
                          placeholder="Enter Title Here"
                          type="text"
                          name="onTitle"
                          onChange={(e) => setOnTitle(e.target.value)}
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="6">
                      <Form.Group>
                        <label>Course Fees</label>
                        <Form.Control
                          placeholder="Enter Course Fees"
                          type="number"
                          name="onFees"
                          onChange={(e) => setOnFees(e.target.value)}
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="" md="6">
                      <Form.Group>
                        <label>Course Start Date</label>
                        <Form.Control
                          type="date"
                          name="onStartDate"
                          onChange={(e) => setOnStartDate(e.target.value)}
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="" md="6">
                      <Form.Group>
                        <label>Course End Date</label>
                        <Form.Control
                          type="date"
                          name="onEndDate"
                          onChange={(e) => setOnEndDate(e.target.value)}
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Course Description</label>
                        <Form.Control
                          cols="80"                          
                          placeholder="Here can be your description"
                          rows="4"
                          as="textarea"
                          value={onDescription}
                          onChange={(e) => { setOnDescription(e.target.value) }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                  </Row>
                  <Row>
                    <Col className="" md="6">
                      <Form.Group>
                        <label>Upload Thumbnail</label>
                        <Form.Control
                          placeholder="Enter Course Fees"
                          type="file"
                          name="onImage"
                          onChange={(e) => setPfile(e.target.files[0])}
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-end">
                    <Button
                      className="btn pull-right mt-3 mr-2"
                      type="submit"
                      variant="primary"
                      onClick={handleAddCancel}                    >
                      Cancel
                    </Button>
                    <Button
                      className="btn-fill pull-right mt-3"
                      type="submit"
                      variant="primary"
                      onClick={handleSubmit}
                    >
                      Add Course
                    </Button>
                  </div>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default InternshipAdd;

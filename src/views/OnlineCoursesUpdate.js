import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
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

function OnlineCoursesUpdate(props) {
  const [onTitle, setOnTitle] = useState('');
  const [onFees, setOnFees] = useState('');
  const [onStartDate, setOnStartDate] = useState('');
  const [onEndDate, setOnEndDate] = useState('');
  const [onDescription, setOnDescription] = useState('');
  const [pfile, setPfile] = useState('');
  
  const [fetchById, setFetchedById] = useState([]);

  const id = props.editId;
  console.log("Id : ",id);
  const formData = new FormData();

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
  formData.append('id',id);

  axios.post(BASE_URL + '/onlinecoursesupdatebyid.php', formData)
    .then(response => {
      console.log("data : ", response.data);
      swal.fire({
        icon: "success",
        title: "Online Course Updated Successfully"
      });
      handleUpdateCancel();
    })
    .catch(error => {
      swal.fire({
        icon: "error",
        title: "Something Went Wrong"
      });
    });
}

  const handleUpdateCancel = () => {
    props.handleCancel();
  }

  useEffect(() => {
    if (!sessionStorage.getItem('session')) {
      return <Redirect to="/admin/login" />;
    }
    axios.get(`${BASE_URL}/onlinecoursesfetchbyid.php?id=${id}`)
      .then(response => {
        console.log("response Data1 : ",response.data[0]);
        const fetchedData = response.data[0];
        setFetchedById(fetchedData);
        setOnTitle(fetchedData.on_title);
        setOnFees(fetchedData.on_fees);
        setOnStartDate(fetchedData.on_start_date);
        setOnEndDate(fetchedData.on_end_date);
        setOnDescription(fetchedData.on_description);
        console.log("FormData after response : ",formData);
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }, []); 

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Card className="p-2">
              <Card.Header className="d-flex">
                <Card.Title as="h4">Update Course Details</Card.Title>
              </Card.Header>
              <hr />

              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="" md="6">
                      <Form.Group>
                        <label>Course Title</label>
                        <Form.Control
                          placeholder="Enter Title Here"
                          type="text"
                          name="onTitle"
                          value={onTitle}
                          onChange={(e) => setOnTitle(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col className="" md="6">
                      <Form.Group>
                        <label>Course Fees</label>
                        <Form.Control
                          placeholder="Enter Course Fees"
                          type="number"
                          name="onFees"
                          value={onFees}
                          onChange={(e) => setOnFees(e.target.value)}
                          required
                        />
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
                          value={onStartDate}
                          onChange={(e) => setOnStartDate(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col className="" md="6">
                      <Form.Group>
                        <label>Course End Date</label>
                        <Form.Control
                          type="date"
                          name="onEndDate"
                          value={onEndDate}
                          onChange={(e) => setOnEndDate(e.target.value)}
                          required
                        />
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
                          onChange={(e) => setOnDescription(e.target.value)}
                        />
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
                        />
                      </Form.Group>
                    </Col>
                    <Col className="" md="6">
                      <div className="mt-3">
                        <img src={`${fetchById.on_image_path}`} style={{ maxWidth: '100px' }} alt="Course Image" />
                      </div>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-end">
                    <Button
                      className="btn pull-right mt-3 mr-2"
                      type="submit"
                      variant="primary"
                      onClick={handleUpdateCancel}                    >
                      Cancel
                    </Button>
                    <Button
                      className="btn-fill pull-right mt-3"
                      type="submit"
                      variant="primary"
                      onClick={handleSubmit}
                    >
                      Update
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

export default OnlineCoursesUpdate;

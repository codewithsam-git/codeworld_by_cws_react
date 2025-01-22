import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
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

function OfflineCoursesUpdate(props) {
  const [offTitle, setOffTitle] = useState('');
  const [offFees, setOffFees] = useState('');
  const [offDuration, setOffDuration] = useState('');
  const [offDescription, setOffDescription] = useState('');
  const [pfile, setPfile] = useState('');

  const [fetchById, setFetchedById] = useState([]);

  const id = props.editId;
  console.log("Id : ", id);
  const formData = new FormData();

  useEffect(() => {
    if (!sessionStorage.getItem('session')) {
      return <Redirect to="/admin/login" />
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('offTitle', offTitle);
    formData.append('offFees', offFees);
    formData.append('offDuration', setOffDuration);
    formData.append('offDescription', offDescription);
    formData.append('offImage', pfile);
    formData.append('id', id);

    axios.post(BASE_URL + '/offlinecoursesupdatebyid.php', formData)
      .then(response => {
        console.log("data : ", response.data);
        swal.fire({
          icon: "success",
          title: "Offline Course Updated Successfully"
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
    axios.get(`${BASE_URL}/offlinecoursesfetchbyid.php?id=${id}`)
      .then(response => {
        console.log("response Data1 : ", response.data[0]);
        const fetchedData = response.data[0];
        setFetchedById(fetchedData);
        setOffTitle(fetchedData.off_title);
        setOffFees(fetchedData.off_fees);
        setOffDuration(fetchedData.off_duration);
        setOffDescription(fetchedData.off_description);
        console.log("FormData after response : ", formData);
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
                          name="offTitle"
                          value={offTitle}
                          onChange={(e) => setOffTitle(e.target.value)}
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
                          name="offFees"
                          value={offFees}
                          onChange={(e) => setOffFees(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="" md="6">
                      <Form.Group>
                        <Form.Label>Course Duration</Form.Label>
                        <select
                          className="form-control"
                          name="offDuration"
                          value={offDuration}
                          onChange={(e) => {
                            console.log("e.target : ",e.target);
                            console.log("e.target.value : ",e.target.value);
                            setOffDuration(e.target.value);
                          }}
                          required
                        >
                          <option value="">Select Duration</option>
                          <option value="1 Month">1 Month</option>
                          <option value="3 Months">3 Months</option>
                          <option value="6 Months">6 Months</option>
                        </select>
                      </Form.Group>
                    </Col>
                    <Col className="" md="6">
                      <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control
                          type="text"
                          value={offDuration != "" ? offDuration : "Duration Not Selected"}
                          readOnly
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
                          name="offDescription"
                          value={offDescription}
                          onChange={(e) => setOffDescription(e.target.value)}
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
                          name="offImage"
                          onChange={(e) => setPfile(e.target.files[0])}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="" md="6">
                      <div className="mt-3">
                        <img src={`${fetchById.off_image_path}`} style={{ maxWidth: '100px' }} alt="Course Image" />
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

export default OfflineCoursesUpdate;

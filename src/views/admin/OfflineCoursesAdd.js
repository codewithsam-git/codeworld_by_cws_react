import React, { useState, useEffect } from "react";
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
 
function OfflineCoursesAdd(props) {

    const [offTitle, setOffTitle] = useState('')
    const [offFees, setOffFees] = useState('')
    const [offDuration, setOffDuration] = useState('')
    const [offDescription, setOffDescription] = useState('Welcome to my online classes! I\'m dedicated to providing engaging and informative lessons that will help you succeed in your learning journey. Whether you\'re a beginner or an experienced learner, my goal is to create a supportive environment where you can thrive. Join me and let\'s explore new horizons together!')
    const [pfile, setPfile] = useState('');

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
        formData.append('offDuration', offDuration);
        formData.append('offDescription', offDescription);
        formData.append('offImage', pfile);

        axios.post(BASE_URL + '/offlinecourses.php', formData)
            .then(response => {
                console.log("data : ", response.data);
                swal.fire({
                    icon: "success",
                    title: "Offline Course Added Successfully"
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
                                <Card.Title as="h4">Add New Course</Card.Title>
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
                                                    name="offTitle"
                                                    onChange={(e) => setOffTitle(e.target.value)}
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
                                                    name="offFees"
                                                    onChange={(e) => setOffFees(e.target.value)}
                                                    required
                                                ></Form.Control>
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
                                                    onChange={(e) => setOffDuration(e.target.value)}
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
                                                    value={offDuration!="" ? offDuration : "Duration Not Selected"}
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
                                                    value={offDescription}
                                                    onChange={(e) => { setOffDescription(e.target.value) }}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="" md="6">
                                            <Form.Group>
                                                <label>Add Thumbnail</label>
                                                <Form.Control
                                                    placeholder="Enter Course Fees"
                                                    type="file"
                                                    name="offImage"
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

export default OfflineCoursesAdd;

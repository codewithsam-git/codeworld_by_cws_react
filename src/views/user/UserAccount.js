import React, { useEffect, useState } from "react";
import UserNavbar from "./UserNavbar";
import { BASE_URL } from "commonApi";
import "./UserCourseDetail.css"
import axios from 'axios';
import "./UserAccount.css";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
} from "reactstrap";

const UserAccount = (props) => {
    useEffect(() => {
        document.documentElement.scrollTop = 0;
    });

    const [fetchedStud, setFetchedStud] = useState([]);
    const stud_id = sessionStorage.getItem('stud_id');

    useEffect(() => {
        if (stud_id) {
            axios
                .get(`${BASE_URL}/enrollmentsbyid.php?stud_id=${stud_id}`)
                .then((response) => {
                    const fetchedData = response.data;
                    setFetchedStud(fetchedData);
                    console.log("fetchedData by stud_id : ", fetchedData);
                })
                .catch((error) => {
                    console.log("Error:", error);
                });
        }
    }, []);   

    return (
        <>
            <UserNavbar />
            <Container fluid className="account">
                <div className="text-center my-3">                    
                        <h3>Your Enrollments</h3>                    
                </div>
                <div className="">
                    <Row>
                        <Col>
                            <table className="table strpied-tabled-with-hover table-striped table-hover border border-1" style={{ fontSize: '15px' }}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Course Name</th>
                                        <th>Payment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fetchedStud.map((course, index) => (
                                        <tr key={course.id}>
                                            <td>{index + 1}</td>
                                            <td>{course.on_course_name}</td>
                                            {/* <td>{course.payment}</td> */}
                                            <td>{course.payment === 'Paid' ? <button className="btn btn-success">{course.payment}</button> : <button className="btn btn-danger">{course.payment}</button> }</td>                                                                                   
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </div>
            </Container >
        </>
    )
}

export default UserAccount;
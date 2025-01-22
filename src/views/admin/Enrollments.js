import React, { useEffect, useState } from "react";
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
import { BASE_URL } from "commonApi";
import { Download, PlusCircle } from "phosphor-react";
import axios from 'axios';
import swal from "sweetalert2";
import OfflineCoursesAdd from "./OfflineCoursesAdd";
import OfflineCoursesUpdate from "./OfflineCoursesUpdate";

function Enrollments() {

  let i = 1;
  const [offlineCourses, setOfflineCourses] = useState([]);

  useEffect(() => {
    fetchCourses(); // Fetch data when the component mounts
  }, []);

  const fetchCourses = () => {
    axios.get(`${BASE_URL}/enrollments.php`)
      .then(response => {
        setOfflineCourses(response.data);
        const numberOfLines = response.data.length;
        localStorage.setItem("enrollments",numberOfLines);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  };

  const handleEdit = (id) => {
    swal.fire({
      title: 'Confirm Payment ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, confirm it!',
      cancelButtonText: 'No, cancel it'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get(`${BASE_URL}/enrollmentconfirmbyid.php?id=${id}`)
          .then(response => {
            console.log("data : ", response.data);
            swal.fire({
              icon: "success",
              title: "Payment Confirmed."
            });
            fetchCourses();
          })
          .catch(error => {
            swal.fire({
              icon: "error",
              title: "Something Went Wrong"
            });
          });
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire(
          'Cancelled',
          'Payment is still pending :)',
          'error'
        );
      }
    });
  }


  const handleDelete = (id) => {
    swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this offline course!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${BASE_URL}/enrollments.php?id=${id}`)
          .then(response => {
            console.log("data : ", response.data);
            swal.fire({
              icon: "success",
              title: "Deleted Successfully"
            });
            setOfflineCourses(offlineCourses.filter(course => course.id !== id));
          })
          .catch(error => {
            swal.fire({
              icon: "error",
              title: "Something Went Wrong"
            });
          });
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire(
          'Cancelled',
          'Enrollment is safe :)',
          'error'
        );
      }
    });
  }

  return (
    <>
      <Container fluid className="p-0" >
        <div className=" d-flex">
          <h3>Enrollments</h3>
        </div>
        <div className="">
          <Row>
            <Col>
              <table className="table strpied-tabled-with-hover table-striped table-hover border border-1" style={{ fontSize: '15px' }}>
                <thead>
                  <tr>
                    <th scope="col">Sr no</th>
                    <th scope="col">Course Name</th>
                    <th scope="col">Student Name</th>
                    <th scope="col">Student Mobile</th>
                    <th scope="col">Transaction ID</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {offlineCourses.map((course) => (
                    <tr key={course.id}>
                      <td>{i++}</td>
                      <td>{course.on_course_name}</td>
                      <td>{course.stud_display_name}</td>
                      <td>{course.stud_mobile}</td>
                      <td>{course.transaction_id}</td>
                      <td>{course.payment === 'Paid' ? <button className="btn btn-success">{course.payment}</button> : <button className="btn btn-danger">{course.payment}</button> }</td>                      
                      <td><button className="btn border-0 " onClick={() => handleEdit(course.id)} title="Edit"><i className="fa fa-edit text-primary"></i></button></td>
                      <td><button className="btn border-0" onClick={() => handleDelete(course.id)} title="Delete"><i className="fa fa-trash text-danger"></i></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default Enrollments;

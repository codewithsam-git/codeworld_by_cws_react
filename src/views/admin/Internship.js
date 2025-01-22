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
import InternshipAdd from "./InternshipAdd";
import InternshipUpdate from "./InternshipUpdate";

function Internship() {

  let i = 1;
  const [showCard, setShowCard] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [onlineCourses, setOnlineCourses] = useState([]);
  const [onlineCoursesEditId, setOnlineCoursesEditId] = useState("");

  const openAddCourse = () => {
    setShowAdd(true);
    setShowCard(false);
    setShowUpdate(false);
  }

  const openAddCourseCancel = () => {
    setShowAdd(false);
    setShowCard(true);
    setShowUpdate(false);
    fetchCourses();
  }
  
  const openUpdateCourseCancel = () => {
    setShowCard(true);
    setShowUpdate(false);
    setShowAdd(false);
    fetchCourses();
  }
  
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    if (!sessionStorage.getItem('session')) {
      return <Redirect to="/admin/login" />
    }
    axios.get(`${BASE_URL}/onlinecourses.php`)
      .then(response => {
        setOnlineCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  };

  const handleEdit = (id) => {
    setOnlineCoursesEditId(id);
    setShowUpdate(true);
    setShowCard(false);
    setShowAdd(false);
  }
    
  const handleDelete = (id) => {
    swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this online course!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${BASE_URL}/onlinecourses.php?id=${id}`)
          .then(response => {
            console.log("data : ", response.data);
            swal.fire({
              icon: "success",
              title: "Online Course Deleted Successfully"
            });
            setOnlineCourses(onlineCourses.filter(course => course.id !== id));
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
          'Your online course is safe :)',
          'error'
        );
      }
    });
  }
  
  
  const handleDownload = () => {
    // Prepare data for download (e.g., CSV format)
    const headers = ['ID', 'Title', 'Fees (Rs)', 'Start Date', 'End Date', 'Description', 'Thumbnail'];
    const csvData = [
      headers.join(','), // Include headers as the first row
      ...onlineCourses.map(course => [
        course.id,
        `"${course.on_title}"`,
        course.on_fees,
        `"${course.on_start_date}"`,
        `"${course.on_end_date}"`,
        `"${course.on_description}"`, // Wrap description in double quotes to preserve line breaks
        course.on_image ? `"${course.on_image_path}"` : "" // Wrap image path in double quotes
      ].join(','))
    ].join('\n');
    
    // Create a Blob containing the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });
    
    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'online_courses.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  

  return (
    <>
      {showCard &&
        <Container fluid className="p-0" >
          <div className=" d-flex justify-content-between">
            <h3>Available Internships</h3>
            <div>
            <h3 className="btn btn-fill btn-primary" onClick={openAddCourse} title="Add New Course"><PlusCircle size={28} /> Add Course</h3>
            <h3 className="btn btn-fill btn-success ml-2" onClick={handleDownload} title="Download"><Download size={27} /></h3>
            </div>
          </div>
          <div className="">
            <Row>
              <Col>
                <table className="table strpied-tabled-with-hover table-striped table-hover border border-1" style={{ fontSize: '15px' }}>
                  <thead>
                    <tr>
                      <th scope="col">Sr no</th>
                      <th scope="col">Course Title</th>
                      <th scope="col">Course Fees</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">End Date</th>
                      <th scope="col">Description</th>
                      <th scope="col">Thumbnail</th>
                      <th scope="col">Update</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {onlineCourses.map((course) => (
                      <tr key={course.id}>
                        <td>{i++}</td>
                        <td>{course.on_title}</td>
                        <td>{course.on_fees} Rs.</td>
                        <td>{course.on_start_date}</td>
                        <td>{course.on_end_date}</td>
                        <td>{course.on_description.split(' ').slice(0, 2).join(' ') + '...'}</td>                        
                        <td>{course.on_image && (
                          <img src={`${course.on_image_path}`} style={{ maxWidth: '75px' }} alt="Course Image" />                          
                        )}</td>
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
      }

      {showAdd && <InternshipAdd handleCancel={openAddCourseCancel} />}

      {showUpdate && <InternshipUpdate editId={onlineCoursesEditId} handleCancel={openUpdateCourseCancel} />}
    </>
  );
}

export default Internship;

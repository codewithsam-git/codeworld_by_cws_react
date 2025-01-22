import React, { useState } from "react";
import "./Courses.css"
import { Container } from "react-bootstrap";
import { Redirect } from "react-router";
import swal from "sweetalert2";
      
const CourseCard = (props) => {
  const { imgUrl, title, fees, courseId } = props;
  const [showDetailPage,setShowDetailPage] = useState(false);
  const [redirect, setRedirect] = useState(false);
  localStorage.setItem('courseId',courseId);
  const handleEnroll = () =>{
    if(sessionStorage.getItem('usersession'))
      setShowDetailPage(true);
    else{      
      swal.fire({
        title: "You must be logged In to Enroll the Course",
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Go to Login Page",
      }).then((result) => {
        if (result.isConfirmed) {
          setRedirect(true);
        }
      });
    }
  }

  if (redirect) {
    return <Redirect to="/user-login" />;
  }

  if(showDetailPage){
    return <Redirect to="/user-course-detail" />;
  }

  return (
    <div className="single__course__item p-0">
      <div className="course__details bg-white shadow p-1 mb-5 bg-body-tertiary p-0">
        <div className="course__img">
          <img src={imgUrl} alt="Img Not Available" className="w-100" />
        </div>

        <div className="p-2">
          <h4 className="course__title mb-2">{title}</h4>
          <div className=" d-flex justify-content-between align-items-center">
            <p className="lesson d-flex align-items-center gap-1">
              <h5>Price : {fees} \-</h5>
            </p>
            {/* <p className="students d-flex align-items-center">
              Enroll Now
            </p> */}
            <button className="enrollbtn border-0 p-2" onClick={handleEnroll}>Enroll Now</button>
          </div>
        </div>

      </div>
      <div className="course__img">
        <img src="" alt="" className="w-100" />
      </div>

    </div>
  );
};

export default CourseCard;

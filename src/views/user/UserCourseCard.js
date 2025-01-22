import React from "react";
import "./UserCourses.css"
import { Container } from "react-bootstrap";

const UserCourseCard = (props) => {
  const { imgUrl, title, fees } = props;

  return (
    <div className="single__course__item">
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
            <button className="enrollbtn border-0 p-2">Enroll Now</button>
          </div>
        </div>

      </div>
      <div className="course__img">
        <img src="" alt="" className="w-100" />
      </div>

    </div>
  );
};

export default UserCourseCard;

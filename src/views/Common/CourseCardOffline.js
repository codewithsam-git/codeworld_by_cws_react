import React, { useState } from "react";
import "./Courses.css"
import { Container } from "react-bootstrap";
import { Redirect } from "react-router";
import swal from "sweetalert2";

const CourseCardOffline = (props) => {
    const { imgUrl, title, fees } = props;
    return (
        <div className="single__course__item p-0">
            <div className="course__details bg-white shadow p-1 mb-5 bg-body-tertiary p-0">
                <div className="course__img">
                    <img src={imgUrl} alt="Img Not Available" className="w-100" />
                </div>

                <div className="p-2">
                    <div className=" d-flex justify-content-between py-1">                        
                            <h4 className="course__title mb-2">{title}</h4>
                            <h5>Price : {fees} \-</h5>                    
                    </div>
                </div>

            </div>
            <div className="course__img">
                <img src="" alt="" className="w-100" />
            </div>

        </div>
    );
};

export default CourseCardOffline;

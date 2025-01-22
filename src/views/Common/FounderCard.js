import React from "react";

const FounderCard = (props) => {
  const { imgUrl, title, post } = props.item;

  return (
    <div className="single__course__item mb-5">
      <div className="course__img">
        <img src={imgUrl} alt="" className="w-100" />
      </div>

      <div className="course__details text-center">
        <h2 className=""><b>{title}</b></h2>
        <h5 className="">{post}</h5>    
      </div>
    </div>
  );
};

export default FounderCard;

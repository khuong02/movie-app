import React from "react";

import { useNavigate } from "react-router-dom";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const LazyLoad = ({ image }) => {
  const navigation = useNavigate();

  const handleClick = () => {
    navigation(`detailsMovie/${image.id}`);
  };

  return (
    <LazyLoadImage
      src={process.env.REACT_APP_API_URL_IMAGE + "w500" + image.poster_path}
      alt={image.title}
      effect="blur"
      height="500px"
      width="400px"
      style={{ cursor: "pointer" }}
      onClick={handleClick}
    />
  );
};

export default LazyLoad;

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const LazyLoad = ({ image }) => {
  const navigation = useNavigate();
  const [check, setCheck] = useState(false);

  const handleClick = () => {
    navigation(`detailsMovie/${image.id}`);
  };

  return (
    <Box
      data-aos="fade-in"
      data-aos-duration="1000"
      style={{
        marginLeft: "5px",
        marginBlock: "15px",
        width: "280px",
      }}
    >
      <LazyLoadImage
        src={process.env.REACT_APP_API_URL_IMAGE + "w500" + image.poster_path}
        alt={image.title}
        // effect="blur"
        height="400px"
        width="280px"
        style={{
          cursor: "pointer",
          margin: "auto",
          transition: "0.2s ease-in-out",
          opacity: check ? 0.5 : 1,
        }}
        onClick={handleClick}
        onMouseLeave={() => setCheck(false)}
        onMouseEnter={() => setCheck(true)}
      />
      <Box>
        <Typography variant="p" component="h3">
          {image.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {image.title}
        </Typography>
      </Box>
    </Box>
  );
};

export default LazyLoad;

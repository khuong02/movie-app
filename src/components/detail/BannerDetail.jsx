import React from "react";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import getYear from "../moment/getYear";

const BannerDetail = (props) => {
  const navigation = useNavigate();
  const { classes, detail, error } = props;

  const convertHours = (time) => {
    return `${Math.floor(time / 60)}h${time % 60}`;
  };

  if (error) {
    return (
      <Card
        className={classes.bannerDetail}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) 150px, rgba(31.5, 31.5, 31.5, 0.84) 100%)
          )`,
          border: "none",
          borderRadius: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "25px",
          color: "tomato",
        }}
      >
        {error}
      </Card>
    );
  }

  return (
    <Card
      className={classes.bannerDetail}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) 150px, rgba(31.5, 31.5, 31.5, 0.84) 100%),url(
            "${process.env.REACT_APP_API_URL_IMAGE}/w1920_and_h600_multi_faces/${detail.backdrop_path}"
          )`,
        border: "none",
        borderRadius: 0,
      }}
    >
      <Box className={classes.containerContentDetail}>
        <Box
          data-aos="fade-in"
          data-aos-duration="1000"
          className={classes.posterDetail}
          style={{ zIndex: 3, textAlign: "center" }}
        >
          <CardMedia
            component="img"
            image={`${process.env.REACT_APP_API_URL_IMAGE}/w300/${detail.poster_path}`}
            alt={detail.original_title}
            style={{ minWidth: "180px" }}
          />
          <Button
            sx={{ marginTop: "15px", minWidth: "150px" }}
            variant="contained"
          >
            Play video
          </Button>
        </Box>
        <Box className={classes.contentDetail}>
          <Box>
            <Typography variant="h4" component="h2">
              {detail.title}
              <Typography
                variant="span"
                component="span"
                sx={{ display: "inline-block", marginLeft: "10px" }}
              >
                ({getYear(detail.release_date)})
              </Typography>
            </Typography>
            <Typography variant="p" component="p">
              Time: {convertHours(detail.runtime)}
            </Typography>
            <Typography variant="p" component="p">
              Score: {detail.vote_average}/10
            </Typography>
            <Typography variant="h5" component="h5">
              Overview:
            </Typography>
            <Typography
              variant="p"
              component="p"
              className="text"
              style={{
                lineHeight: "25px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                LineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {detail.overview}
            </Typography>
            <Button
              sx={{ marginTop: "10px" }}
              onClick={() => navigation("/")}
              variant="contained"
            >
              See more lists movie
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default BannerDetail;

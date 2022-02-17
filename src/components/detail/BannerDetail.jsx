import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import getYear from "../moment/getYear";

const BannerDetail = (props) => {
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
        <Box className={classes.posterDetail} style={{ zIndex: 3 }}>
          <CardMedia
            component="img"
            image={`${process.env.REACT_APP_API_URL_IMAGE}/w300/${detail.poster_path}`}
            alt={detail.original_title}
          />
        </Box>
        <Box className={classes.contentDetail}>
          <Box>
            <Typography variant="h4" component="h2">
              {detail.title}
              <Typography
                variant="span"
                component="span"
                style={{ marginLeft: "10px" }}
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
              style={{ lineHeight: "25px" }}
            >
              {detail.overview}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default BannerDetail;

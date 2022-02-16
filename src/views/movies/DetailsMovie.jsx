import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Carousel from "react-material-ui-carousel";

import productApi from "../../api/productApi";
import { useStyle } from "../../style/useStyle";
import getYear from "../../components/moment/getYear";

const DetailsMovie = () => {
  const { id } = useParams();

  const classes = useStyle();

  const [detail, setDetail] = useState();
  const [credits, setCredits] = useState();
  const numOfItems = 6;

  useEffect(() => {
    const getDetailMovie = async () => {
      try {
        const params = {
          api_key: process.env.REACT_APP_API_KEY,
        };
        const detailMovie = await productApi.getParams(`movie/${id}`, params);
        const creditsMovie = await productApi.getParams(
          `movie/${id}/credits`,
          params
        );

        if (!detailMovie) {
          console.error("Not found detail of this movie");
          return;
        }

        if (!creditsMovie) {
          console.error("Not found detail of this movie");
        } else {
          setCredits({
            id: creditsMovie.id,
            cast: creditsMovie.cast.filter((_, index) => index < 8),
            crew: creditsMovie.crew.filter((_, index) => index < 8),
          });
        }

        setDetail(detailMovie);
      } catch (err) {
        console.error(err);
      }
    };

    getDetailMovie();
  }, [id]);

  const convertHours = (time) => {
    return `${Math.floor(time / 60)}h${time % 60}`;
  };

  const startIndex = (n) => {
    console.log((n - 1) * numOfItems);
    return (n - 1) * numOfItems;
  };

  const endIndex = (n) => {
    return (n - 1) * numOfItems + numOfItems;
  };

  if (!detail) {
    return <h1>Loading ...</h1>;
  }

  return (
    <Box>
      <Card
        className={classes.bannerDetail}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) 150px, rgba(31.5, 31.5, 31.5, 0.84) 100%),url(
            "${process.env.REACT_APP_API_URL_IMAGE}/w1920_and_h600_multi_faces/${detail.backdrop_path}"
          )`,
          border: "none",
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
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
      <Box className="body-detail">
        <Carousel sx={{ minWidth: "200px", width: "auto" }} autoPlay={false}>
          {Array.from(
            Array(Math.ceil(credits.cast.length / numOfItems)).keys()
          ).map((_, num) => {
            return (
              <Stack
                direction="row"
                justifyContent="center"
                style={{ height: "400px" }}
                key="num"
              >
                {credits.cast
                  .slice(startIndex(num + 1), endIndex(num + 1))
                  .map((item, index) => {
                    console.log(item);
                    return (
                      <Card
                        key={item.id}
                        style={{
                          minWidth: "200px",
                          width: "200px",
                          marginLeft: `${index === 0 ? 0 : "15px"}`,
                          marginTop: "15px",
                          //   display: "flex",
                          //   justifyContent: "center",
                          //   alignItems: "center",
                          //   flexShrink: 1,
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={`${process.env.REACT_APP_API_URL_IMAGE}/w200/${item.profile_path}`}
                          alt={item.original_name}
                        />
                        <CardContent>
                          <Typography variant="p" component="p">
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.character}
                          </Typography>
                        </CardContent>
                      </Card>
                    );
                  })}
              </Stack>
            );
          })}
        </Carousel>
      </Box>
    </Box>
  );
};

export default DetailsMovie;

import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import productApi from "../../api/productApi";
import { useStyle } from "../../style/useStyle";
import BannerDetail from "../../components/detail/BannerDetail";
import ShowMember from "../../components/detail/ShowMember";
import Loading from "../../layout/Loading";

const DetailsMovie = () => {
  const { id } = useParams();

  const classes = useStyle();

  const [detail, setDetail] = useState();
  const [credits, setCredits] = useState();
  const [errorDetails, setErrorDetail] = useState();
  const [errorCredits, setErrorCredits] = useState();
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

        if (detailMovie.status !== 200) {
          setErrorDetail(detailMovie.data.status_message);
        } else {
          setDetail(detailMovie.data);
        }

        if (creditsMovie.status !== 200) {
          setErrorCredits(creditsMovie.data.status_message);
        } else {
          setCredits(creditsMovie.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getDetailMovie();
  }, [id]);

  if (!detail || !credits) {
    return <Loading />;
  }

  return (
    <Box>
      <BannerDetail classes={classes} detail={detail} error={errorDetails} />
      <Box className={classes.bodyDetail}>
        <Typography variant="h2" component="h1" style={{ textAlign: "center" }}>
          Casts
        </Typography>
        <ShowMember
          classes={classes}
          data={credits.cast?.filter((_, i) => i <= 8)}
          numOfItems={numOfItems}
          error={errorCredits}
        />
      </Box>
    </Box>
  );
};

export default DetailsMovie;

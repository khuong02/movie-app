import React from "react";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Carousel from "react-material-ui-carousel";

const ShowMember = (props) => {
  const { classes, data, numOfItems, error } = props;

  const startIndex = (n) => {
    return (n - 1) * numOfItems;
  };

  const endIndex = (n) => {
    return (n - 1) * numOfItems + numOfItems;
  };

  if (error) {
    return (
      <Typography
        variant="p"
        component="p"
        style={{ textAlign: "center", fontSize: "25px", color: "tomato" }}
      >
        {error}
      </Typography>
    );
  }

  return (
    <Carousel
      sx={{ minWidth: "200px", width: "auto" }}
      autoPlay={false}
      navButtonsAlwaysVisible
      cycleNavigation={false}
      indicators={false}
    >
      {Array.from(Array(Math.ceil(data.length / numOfItems)).keys()).map(
        (_, num) => {
          return (
            <Stack
              direction="row"
              justifyContent="center"
              style={{ height: "400px" }}
              key={num}
            >
              {data
                .slice(startIndex(num + 1), endIndex(num + 1))
                .map((item, index) => {
                  return (
                    <Card
                      data-aos="fade-in"
                      data-aos-duration="1000"
                      key={item.id}
                      className={classes.cardMembers}
                      style={{
                        marginLeft: `${index === 0 ? 0 : "15px"}`,
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
              {num === Math.ceil(data.length / numOfItems) - 1 && (
                <Card
                  style={{
                    minWidth: "200px",
                    width: "200px",
                    marginLeft: "15px",
                    marginTop: "15px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CardContent className={classes.seeMoreDetail}>
                    <Typography variant="p" component="p">
                      See more
                    </Typography>
                    <ArrowForwardIcon />
                  </CardContent>
                </Card>
              )}
            </Stack>
          );
        }
      )}
    </Carousel>
  );
};

ShowMember.propTypes = {
  data: PropTypes.array,
  classes: PropTypes.object.isRequired,
  numOfItems: PropTypes.number,
};

ShowMember.defaultProps = {
  numOfItems: 0,
};

export default ShowMember;

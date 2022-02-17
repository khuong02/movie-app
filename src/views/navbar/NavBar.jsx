import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

import productApi from "../../api/productApi";
import SearchMovie from "../../components/listMovie/SearchMovie";
import {
  searchSuccess,
  searchPending,
  searchFailed,
  turnOffError,
} from "../../redux/slice/search/searchSlice";
import { changeLink } from "../../redux/slice/changeLink/changeLinkSlice";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const NavBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [check, setCheck] = useState(false);
  const [checkTopRated, setCheckTopRated] = useState(false);

  useEffect(() => {
    let link;
    if (check) {
      link = "/movie/now_playing";
    } else if (checkTopRated) {
      link = "/movie/top_rated";
    } else {
      link = "/list";
    }

    dispatch(changeLink(link));
  }, [check, checkTopRated, dispatch]);

  const handleChangeInput = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const handleSearchMovie = async (e) => {
    if (searchTerm.trim() === "") return;
    try {
      searchPending();
      const params = {
        api_key: process.env.REACT_APP_API_KEY,
        query: searchTerm,
        page: 1,
      };

      const listsMovie = await productApi.getParams("/search/movie", params);

      setSearchTerm("");
      if (listsMovie.status !== 200) {
        dispatch(searchFailed(listsMovie.data.status_message));
        return;
      }

      if (listsMovie.data.results.length === 0) {
        dispatch(searchFailed("Not found this movie!"));

        return;
      }

      dispatch(searchSuccess(listsMovie.data.results));
    } catch (err) {
      console.error(err);
    }
  };

  //   const executeScroll = () => myRef.current.scrollIntoView();

  const handleLinkNowPlaying = () => {
    setCheck(!check);
    setCheckTopRated(false);
    dispatch(turnOffError());
    window.scrollTo(0, 0);
  };

  const handleLinkTopRated = () => {
    setCheckTopRated(!checkTopRated);
    setCheck(false);
    dispatch(turnOffError());
    window.scrollTo(0, 0);
  };

  return (
    <Box
      style={{
        position: "fixed",
        zIndex: 99999,
        // textAlign: "center",
        width: "100%",
        // boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
        background: "#ddd",
        height: "120px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        top: 0,
      }}
    >
      <SearchMovie
        searchTerm={searchTerm}
        handleSearchMovie={handleSearchMovie}
        handleChangeInput={handleChangeInput}
      />
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            {...label}
            checked={check}
            onChange={() => handleLinkNowPlaying()}
          />
          <Typography variant="p" component="p">
            Movie now-playing
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            {...label}
            checked={checkTopRated}
            onChange={() => handleLinkTopRated()}
          />
          <Typography variant="p" component="p">
            Movie top-rated
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;

import React, { useEffect, useState, useRef } from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";

import PullToRefresh from "react-simple-pull-to-refresh";

import productApi from "../../api/productApi";
import LazyLoadImage from "../../components/lazyLoadImage/LazyLoadImage";
import Loading from "../../layout/Loading";

const ListMovie = () => {
  const [listMovie, setListMovie] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    api_key: process.env.REACT_APP_API_KEY,
    query: searchTerm,
    page: 1,
  });
  const typingTimeoutRef = useRef(null);
  const currentListMovie = useRef(null);

  useEffect(() => {
    const getListMovie = async () => {
      try {
        const params = {
          api_key: process.env.REACT_APP_API_KEY,
        };
        const getListMovies = await productApi.getParams(`/list/1`, params);
        // console.log(getListMovies);
        setListMovie(getListMovies.data);
        currentListMovie.current = getListMovies.data;
      } catch (err) {
        console.error(err);
      }
    };

    getListMovie();
  }, []);

  useEffect(() => {
    if (filters.query.trim() === "") {
      setListMovie(currentListMovie.current);
    }
    const searchMovieApi = async () => {
      try {
        const listsMovie = await productApi.getParams("/search/movie", filters);
        setListMovie({ items: [...listsMovie.data.results] });
      } catch (err) {
        console.error(err);
      }
    };

    searchMovieApi();
  }, [filters]);

  const handleRefresh = () => {
    return new Promise.resolve(setTimeout(() => window.location.reload(), 300));
  };

  const handleChangeInput = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const newValue = {
        value,
      };

      handleSearchMovie(newValue);
    }, 300);
  };

  const handleSearchMovie = ({ value }) => {
    setFilters({ ...filters, query: value, page: 1 });
  };

  if (!listMovie) {
    return <Loading />;
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <Box style={{ width: "100vw" }}>
        <Box style={{ textAlign: "center", marginBlock: "35px" }}>
          <FormControl
            sx={{ m: 1, width: "35ch", minWidth: "220px", maxWidth: "400px" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-search">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-search"
              onChange={handleChangeInput}
              value={searchTerm}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Box>
        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "1200px",
            minWidth: "400px",
            width: "80%",
            margin: "auto",
          }}
        >
          <MessageError error={listMovie.data} />
          {listMovie.items?.map((item) => {
            return <LazyLoadImage image={item} key={item.id} />;
          })}
        </Box>
      </Box>
    </PullToRefresh>
  );
};

const MessageError = ({ error }) => {
  if (error) {
    return (
      <Typography variant="h3" component="h2" style={{ color: "tomato" }}>
        {error.status_message}
      </Typography>
    );
  }
  return <></>;
};

export default ListMovie;

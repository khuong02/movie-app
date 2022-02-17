import React, { useEffect, useState, useRef } from "react";

import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import PullToRefresh from "react-simple-pull-to-refresh";
import InfiniteScroll from "react-infinite-scroll-component";

import productApi from "../../api/productApi";
import LazyLoadImage from "../../components/lazyLoadImage/LazyLoadImage";
import Loading from "../../layout/Loading";
import MessageError from "../../components/listMovie/MessageError";
import NavBar from "../navbar/NavBar";

const ListMovie = () => {
  const { searchData, err, loading } = useSelector(
    (state) => state.searchSlice
  );

  const { link } = useSelector((state) => state.changeLinkSlice);

  const [listMovie, setListMovie] = useState();
  const [index, setIndex] = useState(1);

  const currentListMovie = useRef(null);

  useEffect(() => {
    const getListMovie = async () => {
      try {
        let params;
        let configLink;

        if (link === "/list") {
          params = {
            api_key: process.env.REACT_APP_API_KEY,
          };
          configLink = `${link}/1`;
        } else {
          params = {
            api_key: process.env.REACT_APP_API_KEY,
            page: 1,
          };
          configLink = link;
        }

        const getListMovies = await productApi.getParams(configLink, params);

        if (getListMovies.status !== 200) {
          setListMovie(getListMovies.data);
          return;
        }

        if (getListMovies.data && getListMovies.data.results) {
          setListMovie(getListMovies.data.results);
          currentListMovie.current = getListMovies.data.results;
          return;
        }

        setListMovie(getListMovies.data.items);
        currentListMovie.current = getListMovies.data.items;
      } catch (err) {
        console.error(err);
      }
    };

    getListMovie();
  }, [link]);

  useEffect(() => {
    if (!searchData) return;
    setListMovie(searchData);
  }, [searchData]);

  const fetchMoreData = async (e) => {
    try {
      let params;
      let configLink;

      if (link === "/list") {
        params = {
          api_key: process.env.REACT_APP_API_KEY,
        };
        configLink = `/list/${index + 1}`;
      } else {
        params = {
          api_key: process.env.REACT_APP_API_KEY,
          page: index + 1,
        };
        configLink = link;
      }

      const getListMovies = await productApi.getParams(configLink, params);
      if (getListMovies.status !== 200) {
        setListMovie(getListMovies.data);
        return;
      }

      console.log(getListMovies);

      if (getListMovies.data && getListMovies.data.results) {
        setListMovie([
          ...currentListMovie.current,
          ...getListMovies.data.results,
        ]);
        currentListMovie.current = [
          ...currentListMovie.current,
          ...getListMovies.data.results,
        ];
        return;
      }

      setIndex(index + 1);
      setListMovie([...currentListMovie.current, ...getListMovies.data.items]);
      currentListMovie.current = [...listMovie, ...getListMovies.data.items];
    } catch (err) {
      console.error(err);
    }
  };

  const handleRefresh = () => {
    return new Promise((resolve) =>
      resolve(setTimeout(() => window.location.reload(), 300))
    );
  };

  if (!listMovie) {
    return <Loading />;
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <NavBar />
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
          alignItems: "center",
          marginTop: "130px",
        }}
      >
        <Box
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MessageError error={err} loading={loading} />
          {!err && listMovie.length > 0 && !loading && (
            <InfiniteScroll
              dataLength={listMovie.length}
              loader={
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <CircularProgress />
                </Box>
              }
              hasMore={true}
              next={fetchMoreData}
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {listMovie?.map((item) => {
                return <LazyLoadImage image={item} key={item.id} />;
              })}
            </InfiniteScroll>
          )}
        </Box>
      </Box>
    </PullToRefresh>
  );
};

export default ListMovie;

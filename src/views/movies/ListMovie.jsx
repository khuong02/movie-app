import React, { useEffect, useState } from "react";

import productApi from "../../api/productApi";
import LazyLoadImage from "../../components/lazyLoadImage/LazyLoadImage";

const ListMovie = () => {
  const [listMovie, setListMovie] = useState();

  useEffect(() => {
    const getListMovie = async () => {
      try {
        const params = {
          api_key: process.env.REACT_APP_API_KEY,
        };
        const res = await productApi.getParams(`/list/1`, params);

        if (res.status === 404) {
          console.error("Get data failed");
        }

        setListMovie(res.items);
      } catch (err) {
        console.log(err);
      }
    };

    getListMovie();
  }, []);

  if (!listMovie) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {listMovie.map((item) => {
        return <LazyLoadImage image={item} key={item.id} />;
      })}
    </div>
  );
};

export default ListMovie;

import React, { Suspense } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Loading from "../layout/Loading";

const ListMovie = React.lazy(() => import("../views/movies/ListMovie"));
const DetailsMovie = React.lazy(() => import("../views/movies/DetailsMovie"));

const IndexRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Routes>
          <Route path="/" element={<ListMovie />} />
          <Route path="/detailsMovie/:id" element={<DetailsMovie />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default IndexRouter;

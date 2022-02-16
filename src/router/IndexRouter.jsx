import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListMovie from "../views/movies/ListMovie";
import DetailsMovie from "../views/movies/DetailsMovie";

const IndexRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListMovie />} />
        <Route path="/detailsMovie/:id" element={<DetailsMovie />} />
      </Routes>
    </Router>
  );
};

export default IndexRouter;

import React from "react";

import "./App.css";
import Box from "@mui/material/Box";

import Loading from "./layout/Loading";

const IndexRouter = React.lazy(() => import("./router/IndexRouter"));

function App() {
  return (
    <div className="App">
      {/* <h1>Movies App</h1> */}
      <React.Suspense fallback={<Loading />}>
        <Box component="main">
          <IndexRouter />
        </Box>
      </React.Suspense>
    </div>
  );
}

export default App;

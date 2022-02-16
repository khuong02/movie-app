import React from "react";
import IndexRouter from "./router/IndexRouter";

import "./App.css";
import Box from "@mui/material/Box";

function App() {
  return (
    <div className="App">
      {/* <h1>Movies App</h1> */}
      <Box component="main">
        <IndexRouter />
      </Box>
    </div>
  );
}

export default App;

import React, { useEffect } from "react";

import "./App.css";
import Box from "@mui/material/Box";

import Loading from "./layout/Loading";
import AOS from "aos";
import "aos/dist/aos.css";
// import NavBar from "./views/navbar/NavBar";

const IndexRouter = React.lazy(() => import("./router/IndexRouter"));

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="App">
      {/* <h1>Movies App</h1> */}
      <React.Suspense fallback={<Loading />}>
        <Box component="main">
          {/* <NavBar /> */}
          <IndexRouter />
        </Box>
      </React.Suspense>
    </div>
  );
}

export default App;

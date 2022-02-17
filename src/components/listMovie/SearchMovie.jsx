import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

const SearchMovie = (props) => {
  const { searchTerm, handleSearchMovie, handleChangeInput } = props;

  return (
    <Box
      style={{
        textAlign: "center",
        marginTop: "35px",
      }}
    >
      {/* <Box></Box> */}
      <TextField
        id="outlined-adornment-search"
        onChange={handleChangeInput}
        value={searchTerm}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSearchMovie}>
              <SearchIcon />
            </IconButton>
          ),
        }}
        style={{ background: "#fff", borderRadius: "8px", zIndex: 999999 }}
        label="Search movie's name"
        onKeyDown={async (e) => {
          if (e.keyCode === 13) {
            return await handleSearchMovie();
          }
        }}
      />
    </Box>
  );
};

SearchMovie.propTypes = {
  searchTerm: PropTypes.string,
  handleSearchMovie: PropTypes.func.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
};

export default SearchMovie;

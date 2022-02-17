import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Loading from "../../layout/Loading";

const MessageError = ({ error, loading }) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Box style={{ textAlign: "center" }}>
        <Typography variant="h3" component="h2">
          {error}
        </Typography>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Throw back
        </Button>
      </Box>
    );
  }

  return <></>;
};

MessageError.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
};

export default MessageError;

import React from "react";
import { Button } from "@mui/material";
import "./Banner.css";

const Banner = ({ onDiscoverClick }) => {
  return (
    <div className="banner-container">
      <div className="banner banner-firstimage">
        <Button
          variant="contained"
          className="banner-button"
          onClick={onDiscoverClick}
        >
          DISCOVER
        </Button>
      </div>
      <div className="banner banner-secondimage"></div>
    </div>
  );
};

export default Banner;

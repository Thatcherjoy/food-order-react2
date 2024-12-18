import React from 'react';
import { Typography, Button } from '@mui/material';
import './Banner.css';

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner banner-firstimage">
        <Button
          variant="contained"
          className="banner-button"
        >
          DISCOVER
        </Button>
      </div>
      <div className="banner banner-secondimage">
      </div>
    </div>
  );
};

export default Banner;
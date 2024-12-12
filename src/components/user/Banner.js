import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const Banner = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        my: 3,
        p: 4,
        textAlign: "center",
        backgroundColor: "primary.light",
        color: "white",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Delicious Food, Delivered To You
      </Typography>
      <Typography variant="body1">
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </Typography>
    </Paper>
  );
};

export default Banner;

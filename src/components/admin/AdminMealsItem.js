import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { useItems } from "../../store/items-context";

const AdminMealsItem = ({ id, name, description, price, image }) => {
  const { removeMeal } = useItems();

  const deleteMealHandler = () => {
    removeMeal(id);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="194"
        image={image || "https://via.placeholder.com/350x194"}
        alt={name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" color="text.primary">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Box sx={{ mt: 2, fontWeight: "bold", color: "primary.main" }}>
          ${price.toFixed(2)}
        </Box>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          color="error"
          onClick={deleteMealHandler}
        >
          Delete Meal
        </Button>
      </CardActions>
    </Card>
  );
};

export default AdminMealsItem;

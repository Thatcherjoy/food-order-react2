import React, { useContext, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";
import CartContext from "../../store/cart-context";

const MealsItem = ({ meal }) => {
  const [quantity, setQuantity] = useState(1);
  const cartContext = useContext(CartContext);

  const addToCartHandler = () => {
    cartContext.addItem({
      id: meal.id,
      name: meal.name,
      amount: quantity,
      price: meal.price,
    });
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        m: 2.5,
        borderRadius: 4,
        boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardMedia
        component="img"
        alt={meal.name}
        height="200"
        image={meal.image || "https://via.placeholder.com/140"}
        sx={{ borderRadius: "16px 16px 0 0" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {meal.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {meal.description}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              ml: 2.5,
              color: "black",
            }}
          >
            ${meal.price.toFixed(2)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <TextField
            type="number"
            label="Quantity"
            variant="outlined"
            size="small"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            inputProps={{ min: 1, max: 10 }}
            sx={{ width: 100 }}
          />
          <Button
            variant="contained"
            onClick={addToCartHandler}
            sx={{
              ml: 1.25,
              backgroundColor: "black",
              color: "white",
              borderRadius: "20px",
              px: 2.5,
              py: 1,
              "&:hover": {
                backgroundColor: "#333333",
              },
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MealsItem;

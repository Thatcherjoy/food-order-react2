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
    <Card>
      <CardMedia
        component="img"
        alt={meal.name}
        height="140"
        image={meal.image || "https://via.placeholder.com/140"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {meal.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {meal.description}
        </Typography>
        <Typography variant="h6" color="primary">
          ${meal.price.toFixed(2)}
        </Typography>

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
            color="primary"
            onClick={addToCartHandler}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MealsItem;

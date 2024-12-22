import React, { useContext, useState, useRef } from "react";
import { Typography, Grid, Container } from "@mui/material";
import Appbar from "../components/user/Appbar";
import MealsItem from "../components/user/MealsItem";
import Banner from "../components/user/Banner/Banner";
import Cart from "../components/user/Cart";
import ItemsContext from "../store/items-context";

const UserPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const itemsContext = useContext(ItemsContext);
  const mealsRef = useRef(null);

  const openCartHandler = () => {
    setIsCartOpen(true);
  };

  const closeCartHandler = () => {
    setIsCartOpen(false);
  };

  const scrollToMeals = () => {
    mealsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div>
      {/* App Bar */}
      <Appbar onShowCart={openCartHandler} />

      <Banner onDiscoverClick={scrollToMeals} />

      {/* Cart Modal */}
      {isCartOpen && <Cart onClose={closeCartHandler} />}

      {/* Meals Display */}
      <Container ref={mealsRef} sx={{ mt: 3, pb: 10 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Delicious Meals
        </Typography>
        <Grid container spacing={3}>
          {itemsContext.meals.map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal.id}>
              <MealsItem meal={meal} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default UserPage;

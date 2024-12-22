import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Sidebar from "../components/admin/Sidebar";
import Form from "../components/admin/Form";
import AdminMealsItem from "../components/admin/AdminMealsItem";
import OrderHistory from "../components/admin/OrderHistory";
import { useItems } from "../store/items-context";

const AdminPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showMeals, setShowMeals] = useState(true);
  const { meals } = useItems();

  const openFormHandler = () => {
    setIsFormOpen(true);
    setShowOrderHistory(false);
    setShowMeals(false);
  };

  const closeFormHandler = () => {
    setIsFormOpen(false);
    setShowMeals(true);
  };

  const openOrderHistoryHandler = () => {
    setShowOrderHistory(true);
    setIsFormOpen(false);
    setShowMeals(false);
  };

  const showMealsHandler = () => {
    setShowMeals(true);
    setShowOrderHistory(false);
    setIsFormOpen(false);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ width: "250px", height: "100%" }}>
        <Sidebar
          onOpenForm={openFormHandler}
          onOpenOrderHistory={openOrderHistoryHandler}
          onShowMeals={showMealsHandler}
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          Admin Page
        </Typography>
        {isFormOpen && <Form onClose={closeFormHandler} />}

        {showOrderHistory ? (
          <OrderHistory />
        ) : showMeals ? (
          <Box
            sx={{
              width: "100%",
              maxWidth: "1200px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 3,
              justifyContent: "center",
            }}
          >
            {meals.map((meal) => (
              <AdminMealsItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
                image={meal.image}
              />
            ))}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default AdminPage;

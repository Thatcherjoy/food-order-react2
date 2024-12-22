import React, { useContext } from "react";
import {
  Modal,
  Paper,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CartContext from "../../store/cart-context";

const Cart = ({ onClose }) => {
  const cartContext = useContext(CartContext);
  const totalAmount = cartContext.totalAmount.toFixed(2);

  const saveOrder = () => {
    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: cartContext.items,
      totalAmount: cartContext.totalAmount,
    };

    // Get existing orders from localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");

    const updatedOrders = [...existingOrders, order];

    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    alert("Order saved successfully!");

    cartContext.clearCart();
    onClose();
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          width: 500,
          maxHeight: "80vh",
          overflowY: "auto",
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5">Your Cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {cartContext.items.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: "center", my: 3 }}>
            Your cart is empty
          </Typography>
        ) : (
          <>
            {cartContext.items.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  my: 1,
                }}
              >
                <Box>
                  <Typography variant="subtitle1">{item.name}</Typography>
                  <Typography variant="body2">
                    ${item.price.toFixed(2)} x {item.amount}
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    size="small"
                    onClick={() => cartContext.removeItem(item.id)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1" sx={{ display: "inline", mx: 1 }}>
                    {item.amount}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => cartContext.addItem({ ...item, amount: 1 })}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 3,
              }}
            >
              <Typography variant="h6">Total Amount</Typography>
              <Typography variant="h6">${totalAmount}</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Button
                variant="contained"
                sx={{ backgroundColor: "green", color: "white" }}
                onClick={saveOrder}
              >
                {" "}
                Order{" "}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Modal>
  );
};

export default Cart;

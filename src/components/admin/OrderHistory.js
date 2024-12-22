import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load orders from localStorage
    const loadOrders = () => {
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      // Sort orders by earliest date first
      const sortedOrders = savedOrders.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setOrders(sortedOrders);
    };

    loadOrders();

    // Event listener
    window.addEventListener("storage", loadOrders);

    return () => window.removeEventListener("storage", loadOrders);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (orders.length === 0) {
    return (
      <Card sx={{ maxWidth: "2xl", mx: "auto", mt: 4, p: 4 }}>
        <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
          No orders found. Your order history will appear here once you make a
          purchase.
        </Typography>
      </Card>
    );
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "2xl", mx: "auto", mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Order History
      </Typography>

      {orders.map((order) => (
        <Accordion key={order.id} sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ bgcolor: "grey.50" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                mr: 4,
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>
                Order #{order.id.toString().slice(-6)}
              </Typography>
              <Box sx={{ display: "flex", gap: 4 }}>
                <Typography sx={{ color: "text.secondary" }}>
                  {formatDate(order.date)}
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  ${order.totalAmount.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            {order.items.map((item, index) => (
              <Box key={index} sx={{ py: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 500 }}>
                      {item.name}
                    </Typography>
                    <Typography
                      sx={{ color: "text.secondary", fontSize: "0.875rem" }}
                    >
                      Quantity: {item.amount} × ${item.price.toFixed(2)}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 500 }}>
                    ${(item.amount * item.price).toFixed(2)}
                  </Typography>
                </Box>
                {index < order.items.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
                pt: 2,
                borderTop: 1,
                borderColor: "divider",
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>Total Amount</Typography>
              <Typography sx={{ fontWeight: 500 }}>
                ${order.totalAmount.toFixed(2)}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default OrderHistory;

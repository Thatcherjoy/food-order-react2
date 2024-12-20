import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import { ChevronDown } from "lucide-react";

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

    // Cleanup
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
      <Card className="w-full max-w-2xl mx-auto mt-4 p-4">
        <Typography className="text-center text-gray-600">
          No orders found. Your order history will appear here once you make a
          purchase.
        </Typography>
      </Card>
    );
  }

  return (
    <Box className="w-full max-w-2xl mx-auto mt-4">
      <Typography variant="h4" className="mb-4 text-center">
        Order History
      </Typography>

      {orders.map((order) => (
        <Accordion key={order.id} className="mb-2">
          <AccordionSummary expandIcon={<ChevronDown />} className="bg-gray-50">
            <Box className="flex justify-between items-center w-full mr-4">
              <Typography className="font-medium">
                Order #{order.id.toString().slice(-6)}
              </Typography>
              <Box className="flex gap-4">
                <Typography className="text-gray-600">
                  {formatDate(order.date)}
                </Typography>
                <Typography className="font-medium">
                  ${order.totalAmount.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            {order.items.map((item, index) => (
              <Box key={index} className="py-2">
                <Box className="flex justify-between items-center">
                  <Box>
                    <Typography className="font-medium">{item.name}</Typography>
                    <Typography className="text-gray-600 text-sm">
                      Quantity: {item.amount} × ${item.price.toFixed(2)}
                    </Typography>
                  </Box>
                  <Typography className="font-medium">
                    ${(item.amount * item.price).toFixed(2)}
                  </Typography>
                </Box>
                {index < order.items.length - 1 && <Divider className="mt-2" />}
              </Box>
            ))}

            <Box className="flex justify-between items-center mt-4 pt-2 border-t">
              <Typography className="font-medium">Total Amount</Typography>
              <Typography className="font-medium">
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

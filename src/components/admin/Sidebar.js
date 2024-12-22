import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Button,
} from "@mui/material";
import {
  AddCircle as AddIcon,
  Inbox as InboxIcon,
  Restaurant as RestaurantIcon,
} from "@mui/icons-material";

const Sidebar = ({ onOpenForm, onOpenOrderHistory, onShowMeals }) => {
  return (
    <Paper elevation={3} sx={{ height: "100%", p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<AddIcon />}
          onClick={onOpenForm}
        >
          Add Food Item
        </Button>
      </Box>
      <List>
        <ListItem button onClick={onShowMeals}>
          <ListItemIcon>
            <RestaurantIcon />
          </ListItemIcon>
          <ListItemText primary="Meals List" />
        </ListItem>
        <ListItem button onClick={onOpenOrderHistory}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Order History" />
        </ListItem>
      </List>
    </Paper>
  );
};

export default Sidebar;

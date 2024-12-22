import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useItems } from "../../store/items-context";

const Form = ({ onClose }) => {
  const { addMeal } = useItems();
  const [mealData, setMealData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMealData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mealData.name || !mealData.description || !mealData.price) {
      alert("Please fill in all required fields");
      return;
    }

    const newMeal = {
      ...mealData,
      price: parseFloat(mealData.price),
    };

    await addMeal(newMeal, imageFile);
    onClose();
  };

  const handleImageUpload = (e) => {
    setImageFile(e.target.files[0]);
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
      <Box
        sx={{
          width: 400,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">Add New Food Item</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Meal Name"
            name="name"
            value={mealData.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={mealData.description}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            required
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={mealData.price}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            required
            inputProps={{
              step: "0.01",
              min: "0",
            }}
          />
          <input
            type="file"
            onChange={handleImageUpload}
            style={{ marginBottom: 16 }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="outlined" onClick={onClose} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Add Meal
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default Form;

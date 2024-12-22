import React, { createContext, useState, useContext } from "react";
import { uploadImage } from "./imageUploadService";
import sushiImage from "../images/sushi.jpg";
import schnitzelImage from "../images/schnitzel.jpg";
import nasilemakImage from "../images/nasilemak.jpg";

const initialMeals = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
    image: sushiImage,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
    image: schnitzelImage,
  },
  {
    id: "m3",
    name: "Nasi Lemak",
    description: "A malaysian favourite",
    price: 16.5,
    image: nasilemakImage,
  },
];

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [meals, setMeals] = useState(initialMeals);

  const addMeal = async (newMeal, image) => {
    try {
      console.log("Adding meal:", newMeal); // adodb
      const uploadedImage = await uploadImage(image);
      console.log("Image uploaded:", uploadedImage); // adodb
      const mealWithId = {
        ...newMeal,
        id: `m${meals.length + 1}`,
        image: uploadedImage.originalUrl,
      };
      setMeals((prevMeals) => [...prevMeals, mealWithId]);
      console.log("Meals updated:", meals); // adodb
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const removeMeal = (mealId) => {
    setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== mealId));
  };

  const value = {
    meals,
    addMeal,
    removeMeal,
  };

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useItems must be used within an ItemsProvider");
  }
  return context;
};

export default ItemsContext;

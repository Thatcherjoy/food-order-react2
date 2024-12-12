import React, { createContext, useState, useContext } from "react";
import { uploadImage } from "./imageUploadService";

const initialMeals = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
    image: "path_to_sushi_image",
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
    image: "path_to_schnitzel_image",
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

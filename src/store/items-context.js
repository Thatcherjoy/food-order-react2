import React, { createContext, useState } from 'react';

const ItemsContext = createContext({
  meals: [],
  addMeal: (meal) => {},
  removeMeal: (id) => {}
});

export const ItemsProvider = ({ children }) => {
  const [meals, setMeals] = useState([
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
      //image: 
    },
    {
      id: 'm2',
      name: 'Burger',
      description: 'Classic American burger',
      price: 15.50,
      // image: 
    },
    {
      id: 'm3',
      name: 'Pasta',
      description: 'Italian style pasta',
      price: 18.75,
      // image: 
    }
  ]);

  const addMealHandler = (meal) => {
    const newMeal = {
      ...meal,
      id: `m${meals.length + 1}`
    };
    setMeals(prevMeals => [...prevMeals, newMeal]);
  };

  const removeMealHandler = (id) => {
    setMeals(prevMeals => prevMeals.filter(meal => meal.id !== id));
  };

  return (
    <ItemsContext.Provider 
      value={{ 
        meals, 
        addMeal: addMealHandler, 
        removeMeal: removeMealHandler 
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsContext;
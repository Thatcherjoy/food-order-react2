import React, { createContext, useReducer, useContext } from "react";

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

    case "REMOVE_ITEM":
      const itemToRemoveIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const itemToRemove = state.items[itemToRemoveIndex];
      let remainingItems;
      let newTotalAmount;

      if (itemToRemove.amount === 1) {
        remainingItems = state.items.filter((item) => item.id !== action.id);
        newTotalAmount = state.totalAmount - itemToRemove.price;
      } else {
        const updatedItem = {
          ...itemToRemove,
          amount: itemToRemove.amount - 1,
        };
        remainingItems = [...state.items];
        remainingItems[itemToRemoveIndex] = updatedItem;
        newTotalAmount = state.totalAmount - itemToRemove.price;
      }

      return {
        items: remainingItems,
        totalAmount: newTotalAmount,
      };

    case "CLEAR_CART":
      return {
        items: [],
        totalAmount: 0,
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
  });

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR_CART" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

//Hook for CartContext
export const useCartState = () => {
  return useContext(CartContext);
};

export default CartContext;

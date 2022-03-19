import { createContext, useContext, useReducer } from "react";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const cartReducerFn = (totalCartItems, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        return {
          ...totalCartItems,
          cartItems: [
            ...totalCartItems.cartItems,
            { ...action.payload, quantity: action.payload.quantity + 1 },
          ],
        };
      default:
        return { ...totalCartItems };
    }
  };

  const [state, dispatch] = useReducer(cartReducerFn, {});
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);

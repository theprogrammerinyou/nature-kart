import { createContext, useContext, useReducer } from "react";

const CartContext = createContext({ cartItems: [] });

export const CartProvider = ({ children }) => {
  const cartReducerFn = (totalCartItems, action) => {
    switch (action.type) {
      case "ADD_ITEM_TO_CART":
        return {
          ...totalCartItems,
          cartItems: [
            ...totalCartItems.cartItems,
            { ...action.payload, quantity: 1 },
          ],
        };
      case "REMOVE_ITEM_FROM_CART":
        return {
          ...totalCartItems,
          cartItems: totalCartItems.cartItems.filter(
            (cartItem) => cartItem.id !== action.payload.id
          ),
        };
      default:
        return { ...totalCartItems };
    }
  };

  const [totalCartItems, cartDispatchFn] = useReducer(cartReducerFn, {
    cartItems: [],
  });
  return (
    <CartContext.Provider value={{ totalCartItems, cartDispatchFn }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);

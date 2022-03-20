import { createContext, useContext, useReducer } from "react";

const CartContext = createContext({ cartItems: [] });

const addItemToCart = (cartItems, itemToBeAdded) => {
  const isItemInCart = cartItems?.find((item) => item.id === itemToBeAdded.id);
  if (isItemInCart) {
    return cartItems?.map((item) =>
      item?.id === itemToBeAdded?.id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );
  }

  return [...cartItems, { ...itemToBeAdded, quantity: 1 }];
};

const removeItemFromCart = (cartItems, itemToBeRemoved) => {
  const isItemInCart = cartItems?.find(
    (item) => item.id === itemToBeRemoved.id
  );
  if (isItemInCart) {
    return cartItems?.map((item) =>
      item?.id === itemToBeRemoved?.id
        ? {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
          }
        : item
    );
  }
};

export const CartProvider = ({ children }) => {
  const cartReducerFn = (totalCartItems, action) => {
    switch (action.type) {
      case "ADD_ITEM_TO_CART":
        return {
          ...totalCartItems,
          totalPrice:
            Number(totalCartItems.totalPrice) + Number(action.payload.price),
          cartItems: addItemToCart(totalCartItems?.cartItems, action.payload),
        };
      case "DECREASE_QUANTITY":
        return {
          ...totalCartItems,
          totalPrice:
            Number(totalCartItems.totalPrice) + Number(action.payload.price),
          cartItems: removeItemFromCart(
            totalCartItems?.cartItems,
            action.payload
          ),
        };
      case "REMOVE_ITEM_FROM_CART":
        return {
          ...totalCartItems,
          cartItem: totalCartItems.cartItems.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      default:
        return { ...totalCartItems };
    }
  };

  const [totalCartItems, cartDispatchFn] = useReducer(cartReducerFn, {
    cartItems: [],
    totalPrice: 0,
  });
  return (
    <CartContext.Provider value={{ totalCartItems, cartDispatchFn }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);

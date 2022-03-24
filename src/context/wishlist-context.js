import { createContext, useContext, useReducer } from "react";

export const WishlistContext = createContext({ wishlistItems: [] });

export const WishlistProvider = ({ children }) => {
  const wishlistReducerFn = (prevWishlistItemsState, action) => {
    switch (action.type) {
      case "ADD_ITEM_TO_WISHLIST":
        return {
          ...prevWishlistItemsState,
          wishlistItems: [
            ...prevWishlistItemsState.wishlistItems,
            { ...action?.payload, quantity: 1 },
          ],
        };
      case "REMOVE_ITEM_FROM_WISHLIST":
        return {
          ...prevWishlistItemsState,
          wishlistItems: prevWishlistItemsState?.wishlistItems?.filter(
            (item) => item?.id !== action?.payload?.id
          ),
        };
    }
  };

  const [wishlistItems, wishlistDispatchFn] = useReducer(wishlistReducerFn, {
    wishlistItems: [],
  });
  return (
    <WishlistContext.Provider value={{ wishlistItems, wishlistDispatchFn }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => useContext(WishlistContext);

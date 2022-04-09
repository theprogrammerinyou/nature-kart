import { useContext, createContext, useReducer } from "react";

export const ProductsContext = createContext({ products: [] });

export const ProductsProvider = ({ children }) => {
  const productsReducer = (prevProductsState, action) => {
    switch (action.type) {
      case "PRODUCTS":
        return { ...prevProductsState, products: action.payload };
      default:
        return { ...prevProductsState };
    }
  };

  const [productsState, productsDispatchFn] = useReducer(productsReducer, []);
  return (
    <ProductsContext.Provider value={{ productsState, productsDispatchFn }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);

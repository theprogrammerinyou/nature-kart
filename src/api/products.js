import axios from "axios";

export const getProductsFromServer = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/products")
      .then((response) => {
        resolve(response?.data?.products);
      })
      .catch((error) => {
        reject(error?.response?.data);
        console.error("Error getting products", error?.response?.data);
      });
  });
};

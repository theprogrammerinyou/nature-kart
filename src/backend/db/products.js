import { v4 as uuid } from "uuid";

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  {
    _id: uuid(),
    title: "You Can WIN",
    author: "Shiv Khera",
    price: "5000",
    quantity: "5",
    categoryName: "non-fiction",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/51mlyN35U9L._SX292_BO1,204,203,200_.jpg",
  },
  {
    _id: uuid(),
    title: "You are Winner",
    author: "Junaid Qureshi",
    price: "3000",
    quantity: 6,
    categoryName: "horror",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/51mlyN35U9L._SX292_BO1,204,203,200_.jpg",
  },
  {
    _id: uuid(),
    title: "Think and Grow Rich",
    author: "Shiv Khera",
    price: "1000",
    quantity: 4,
    categoryName: "fiction",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/51mlyN35U9L._SX292_BO1,204,203,200_.jpg",
  },
];

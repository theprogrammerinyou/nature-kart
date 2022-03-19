import { useEffect, useState } from "react";
import { getProductsFromServer } from "../../api/products";
import Navbar from "../../components/Navbar";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { totalCartItems, cartDispatchFn } = useCartContext();
  const productsFromServer = async () => {
    const allProducts = await getProductsFromServer();
    setProducts(allProducts);
  };

  useEffect(() => productsFromServer(), []);

  const addToCartButtonClick = (productDetails) => {
    cartDispatchFn({ type: "ADD_ITEM_TO_CART", payload: productDetails });
  };

  const goToCartButtonClick = () => {
    navigate("/cart");
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      <Grid item sx={{ marginTop: "5rem" }}>
        <Grid container spacing={5}>
          {products?.map((product) => (
            <Grid item key={product.id}>
              <Card>
                <CardContent>{product.title}</CardContent>
                <CardMedia
                  component="img"
                  src={product.image}
                  alt="product-image"
                />
                <CardContent>
                  <Typography variant="p" component="span">
                    Quantity: {product.quantity}
                  </Typography>
                </CardContent>
                {totalCartItems?.cartItems?.find(
                  (cartItem) => cartItem.id === product.id
                ) ? (
                  <CardActions>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={goToCartButtonClick}
                      fullWidth
                    >
                      Go To Cart
                    </Button>
                  </CardActions>
                ) : (
                  <CardActions>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => addToCartButtonClick(product)}
                      startIcon={<AddShoppingCartIcon />}
                      fullWidth
                    >
                      Add To Cart
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

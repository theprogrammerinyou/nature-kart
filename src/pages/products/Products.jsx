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
  CircularProgress,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCartContext } from "../../context/cart-context";
import { useWishlistContext } from "../../context/wishlist-context";
import { useNavigate } from "react-router-dom";
import { ProductStyles } from "./ProductStyles";

export const Products = () => {
  const classes = ProductStyles();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { totalCartItems, cartDispatchFn } = useCartContext();
  const { wishlistDispatchFn } = useWishlistContext();

  const productsFromServer = async () => {
    setLoading(true);
    const allProducts = await getProductsFromServer();
    if (allProducts) {
      setLoading(false);
      setProducts(allProducts);
    }
  };

  useEffect(() => productsFromServer(), []);

  const addToCartButtonClick = (productDetails) => {
    cartDispatchFn({ type: "ADD_ITEM_TO_CART", payload: productDetails });
  };

  const addToWishlistButtonClick = (productDetails) => {
    wishlistDispatchFn({ type: "ADD_ITEM_WISHLIST", payload: productDetails });
  };

  const goToCartButtonClick = () => {
    navigate("/cart");
  };

  return (
    <Grid container>
      {loading ? (
        <div className={classes.overlay}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
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
                        Quantity: {product?.quantity}
                      </Typography>
                      <Typography variant="h6" component="div">
                        Rs. {product?.price}
                      </Typography>
                    </CardContent>
                    {totalCartItems?.cartItems?.find(
                      (cartItem) => cartItem?.id === product?.id
                    ) ? (
                      <CardActions>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={goToCartButtonClick}
                          startIcon={<ShoppingCartIcon />}
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
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => addToWishlistButtonClick(product)}
                          startIcon={<AddShoppingCartIcon />}
                          fullWidth
                        >
                          Add To Wishlist
                        </Button>
                      </CardActions>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getProductsFromServer } from "../../api/products";
import Navbar from "../../components/Navbar";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Divider,
  Typography,
  CircularProgress,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCartContext } from "../../context/cart-context";
import { useWishlistContext } from "../../context/wishlist-context";
import { useNavigate } from "react-router-dom";
import { ProductStyles } from "./ProductStyles";
import API from "../../api/apiConfig";
import { PrimaryButton } from "../../components/PrimaryButton";
import { SecondaryButton } from "../../components/SecondaryButton";
import { Filters } from "../../components/Filters/Filters";

const APIURL = process.env.REACT_APP_API_URL;

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
    API.post(`${APIURL}/api/user/cart`, {
      product: productDetails,
    })
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.error("error adding cart", error?.response?.data);
      });
    cartDispatchFn({ type: "ADD_ITEM_TO_CART", payload: productDetails });
  };

  const addItemToWishlist = (productDetails) => {
    API.post(`${APIURL}/api/user/wishlist`, {
      product: productDetails,
    })
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.error("error adding wishlist", error?.response?.data);
      });
    wishlistDispatchFn({
      type: "ADD_ITEM_TO_WISHLIST",
      payload: productDetails,
    });
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
          <Grid
            container
            sx={{
              marginTop: "5rem",
            }}
          >
            <Grid item xs={2}>
              <Filters />
            </Grid>
            <Grid item xs={10}>
              <Grid container spacing={10}>
                {products?.map((product) => (
                  <Grid item key={product.id}>
                    <Card sx={{ width: "15rem" }} raised>
                      <div className={classes.imgContainer}>
                        <img src={product.image} alt="product-image" />
                      </div>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {product.title}
                        </Typography>
                        <Typography variant="p" component="span">
                          Quantity: {product?.quantity}
                        </Typography>
                        <Typography variant="h6" component="div">
                          Rs. {product?.price}
                        </Typography>
                      </CardContent>
                      <CardActions className={classes.cardActions}>
                        {totalCartItems?.cartItems?.find(
                          (cartItem) => cartItem?.id === product?.id
                        ) ? (
                          <SecondaryButton
                            variant="contained"
                            color="success"
                            onClick={goToCartButtonClick}
                            startIcon={<ShoppingCartIcon />}
                            fullWidth
                            text="Go to Cart"
                          />
                        ) : (
                          <PrimaryButton
                            variant="contained"
                            color="secondary"
                            onClick={() => addToCartButtonClick(product)}
                            startIcon={<AddShoppingCartIcon />}
                            fullWidth
                            text="Add To Cart"
                          />
                        )}
                        <SecondaryButton
                          text="Add To Wishlist"
                          onClick={() => addItemToWishlist(product)}
                        />
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

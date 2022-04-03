import { useEffect, useState } from "react";
import { getProductsFromServer } from "../../api/products";
import Navbar from "../../components/Navbar";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  CircularProgress,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ProductStyles } from "./ProductStyles";
import API from "../../api/apiConfig";
import { PrimaryButton } from "../../components/PrimaryButton";
import { SecondaryButton } from "../../components/SecondaryButton";

const APIURL = process.env.REACT_APP_API_URL;

export const Products = () => {
  const classes = ProductStyles();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { totalCartItems, cartDispatchFn } = useCartContext();

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
                        <SecondaryButton
                          variant="contained"
                          color="success"
                          onClick={goToCartButtonClick}
                          startIcon={<ShoppingCartIcon />}
                          fullWidth
                          text="Go to Cart"
                        />
                      </CardActions>
                    ) : (
                      <CardActions>
                        <PrimaryButton
                          variant="contained"
                          color="secondary"
                          onClick={() => addToCartButtonClick(product)}
                          startIcon={<AddShoppingCartIcon />}
                          fullWidth
                          text="Add To Cart"
                        />
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

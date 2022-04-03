import { Grid, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useCartContext } from "../../context/cart-context";
import { useWishlistContext } from "../../context/wishlist-context";
import { CartStyles } from "./CartStyles";
import { PrimaryButton } from "../../components/PrimaryButton";
import { SecondaryButton } from "../../components/SecondaryButton";
import { TertiaryButton } from "../../components/TertiaryButton";

export const Cart = () => {
  const navigate = useNavigate();
  const classes = CartStyles();
  const { totalCartItems, cartDispatchFn } = useCartContext();
  const { wishlistDispatchFn } = useWishlistContext();
  const removeItemFromCart = (productDetails) => {
    cartDispatchFn({
      type: "DECREASE_QUANTITY",
      payload: productDetails,
    });
  };
  const increaseQuantity = (productDetails) => {
    cartDispatchFn({ type: "ADD_ITEM_TO_CART", payload: productDetails });
  };
  const handleRemoveItemFromCart = (productDetails) => {
    cartDispatchFn({ type: "REMOVE_ITEM_FROM_CART", payload: productDetails });
  };
  const onShowProductsButtonClick = () => {
    navigate("/products");
  };
  const addItemToWishlist = (productDetails) => {
    wishlistDispatchFn({
      type: "ADD_ITEM_TO_WISHLIST",
      payload: productDetails,
    });
  };
  return (
    <>
      <Navbar />
      <Grid container spacing={2} mt="5rem">
        {totalCartItems?.cartItems?.length >= 1 ? (
          totalCartItems?.cartItems?.map((cartItem) => (
            <Grid
              container
              key={cartItem?.id}
              className={classes.gridContainer}
            >
              <Grid item xs={6}>
                <img
                  className={classes.imgStyles}
                  src={cartItem?.image}
                  alt="product-img"
                />
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="div">
                      {cartItem.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="p" component="div">
                      Price: Rs.{cartItem.price}
                    </Typography>
                    <Typography variant="p" component="div">
                      Total: Rs.
                      {(cartItem?.quantity * cartItem?.price).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className={classes.buttons} spacing={2}>
                  <Grid item xs={4}>
                    <TertiaryButton
                      onClick={() => removeItemFromCart(cartItem)}
                      text="-"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="p" component="span">
                      {cartItem?.quantity}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <TertiaryButton
                      onClick={() => increaseQuantity(cartItem)}
                      text="+"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <SecondaryButton
                      onClick={() => handleRemoveItemFromCart(cartItem)}
                      text="Remove Item"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <PrimaryButton
                      onClick={() => addItemToWishlist(cartItem)}
                      text="Add To Wishlist"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))
        ) : (
          <Grid container spacing={3} sx={{ margin: "auto" }}>
            <Grid item xs={12}>
              <Typography variant="h5" component="div">
                No Items in Cart. Check wishlist or continue shopping
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                onClick={onShowProductsButtonClick}
              >
                Explore Products
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

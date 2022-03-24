import { Grid, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useCartContext } from "../../context/cart-context";
import { useWishlistContext } from "../../context/wishlist-context";
import { CartStyles } from "./CartStyles";

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
  const addItemToCart = (productDetails) => {
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
            <div className={classes.wrapperContainer} key={cartItem?.id}>
              <div>
                <h3>{cartItem.title}</h3>
                <div className="information">
                  <p>Price: Rs.{cartItem.price}</p>
                  <p>
                    Total: Rs.
                    {(cartItem?.quantity * cartItem?.price).toFixed(2)}
                  </p>
                </div>
                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    onClick={() => removeItemFromCart(cartItem)}
                  >
                    -
                  </Button>
                  <p>{cartItem?.quantity}</p>
                  <Button
                    variant="contained"
                    onClick={() => addItemToCart(cartItem)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  onClick={() => handleRemoveItemFromCart(cartItem)}
                  variant="contained"
                  color="secondary"
                >
                  Remove Item From Cart
                </Button>
                <Button
                  onClick={() => addItemToWishlist(cartItem)}
                  variant="contained"
                  color="secondary"
                >
                  Add To Wishlist
                </Button>
              </div>
              <img src={cartItem?.image} alt="product-img" />
            </div>
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

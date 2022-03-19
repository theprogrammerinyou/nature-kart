import { useCartContext } from "../../context/CartContext";
import {
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
} from "@mui/material";
import Navbar from "../../components/Navbar";

export const Cart = () => {
  const { totalCartItems, cartDispatchFn } = useCartContext();
  const removeItemFromCart = (productDetails) => {
    cartDispatchFn({ type: "REMOVE_ITEM_FROM_CART", payload: productDetails });
  };
  return (
    <>
      <Navbar />
      <Grid container spacing={2} mt="5rem">
        {totalCartItems?.cartItems?.length >= 0 ? (
          totalCartItems?.cartItems?.map((cartItem) => (
            <Card key={cartItem.id} raised>
              <CardContent>{cartItem.title}</CardContent>
              <CardMedia
                component="img"
                src={cartItem.image}
                alt="product-icon"
              />
              <CardContent>
                <Typography variant="p" component="span">
                  Quantity: {cartItem.quantity}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeItemFromCart(cartItem)}
                >
                  Remove From Cart
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Grid container justifyContent="center" alignItems="center">
            <Typography variant="h4" component="div">
              No Items in Cart. Check wishlist or continue shopping
            </Typography>
            <Button variant="contained" color="secondary">
              Explore Products
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
};

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
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const productsFromServer = async () => {
    const allProducts = await getProductsFromServer();
    setProducts(allProducts);
  };

  useEffect(() => productsFromServer(), []);
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
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddShoppingCartIcon />}
                    fullWidth
                  >
                    Add To Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

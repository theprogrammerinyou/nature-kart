import { Grid, Checkbox, Typography, FormControlLabel } from "@mui/material";
import React, { useReducer } from "react";

export const CategoryFilters = () => {
  const categoryReducer = (prevCategoryState, action) => {
    switch (action.type) {
      case "BOOKS":
        return { ...prevCategoryState, books: action.payload };
      case "POTS":
        return { ...prevCategoryState, pots: action.payload };
      case "STICKERS":
        return { ...prevCategoryState, stickers: action.payload };
      default:
        return { ...prevCategoryState };
    }
  };

  const [categoryState, categoryDispatchFn] = useReducer(categoryReducer, {});

  return (
    <Grid container>
      <Typography variant="h5" component="div">
        Category
      </Typography>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={categoryState.booksChecked}
              onChange={(event) => {
                categoryDispatchFn({
                  type: "BOOKS",
                  payload: event.target.checked,
                });
              }}
            />
          }
          label="Books"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={categoryState.potsChecked}
              onChange={(event) => {
                categoryDispatchFn({
                  type: "POTS",
                  payload: event.target.checked,
                });
              }}
            />
          }
          label="Pots"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={categoryState.stickersChecked}
              onChange={(event) => {
                categoryDispatchFn({
                  type: "STICKERS",
                  payload: event.target.checked,
                });
              }}
            />
          }
          label="Stickers"
        />
      </Grid>
    </Grid>
  );
};

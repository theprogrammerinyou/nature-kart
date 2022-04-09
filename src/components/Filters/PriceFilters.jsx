import { FormControlLabel, Grid, Checkbox, Typography } from "@mui/material";
import React, { useReducer } from "react";

export const PriceFilters = () => {
  const priceReducer = (prevCategoryState, action) => {
    switch (action.type) {
      case "lessThan1000":
        return { ...prevCategoryState, threeStar: action.payload };
      case "lessThan2000":
        return { ...prevCategoryState, fourStar: action.payload };
      case "lessThan3000":
        return { ...prevCategoryState, fiveStar: action.payload };
      default:
        return { ...prevCategoryState };
    }
  };

  const [priceState, priceDispatchFn] = useReducer(priceReducer, {});

  return (
    <Grid container>
      <Typography variant="h5" component="div">
        Price
      </Typography>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={priceState.lessThan1000}
              onChange={(event) => {
                priceDispatchFn({
                  type: "lessThan1000",
                  payload: event.target.checked,
                });
              }}
            />
          }
          label="> 1000"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={priceState.lessThan2000}
              onChange={(event) => {
                priceDispatchFn({
                  type: "lessThan2000",
                  payload: event.target.checked,
                });
              }}
            />
          }
          label="> 2000"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={priceState.lessThan3000}
              onChange={(event) => {
                priceDispatchFn({
                  type: "lessThan3000",
                  payload: event.target.checked,
                });
              }}
            />
          }
          label="> 3000"
        />
      </Grid>
    </Grid>
  );
};

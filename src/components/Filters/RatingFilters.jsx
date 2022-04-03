import {
  FormControlLabel,
  Grid,
  Checkbox,
  Typography,
  Divider,
} from "@mui/material";
import React, { useReducer } from "react";

export const RatingFilters = () => {
  const ratingReducer = (prevCategoryState, action) => {
    switch (action.type) {
      case "threeStar":
        return { ...prevCategoryState, threeStar: action.payload };
      case "fourStar":
        return { ...prevCategoryState, fourStar: action.payload };
      case "fiveStar":
        return { ...prevCategoryState, fiveStar: action.payload };
      default:
        return { ...prevCategoryState };
    }
  };

  const [ratingsState, ratingDispatchFn] = useReducer(ratingReducer, {});

  return (
    <Grid container>
      <Divider />
      <Typography variant="h5" component="div">
        Rating
      </Typography>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={ratingsState.threeStarChecked}
              onChange={(event) => {
                ratingDispatchFn({
                  type: "threeStar",
                  payload: event.target.checked,
                });
              }}
            />
          }
          label="3 Stars"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={ratingsState.fourStarChecked}
              onChange={(event) => {
                ratingDispatchFn({
                  type: "fourStar",
                  payload: event.target.checked,
                });
              }}
            />
          }
          label="4 Stars"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={ratingsState.fiveStarChecked}
              onChange={(event) => {
                ratingDispatchFn({
                  type: "fiveStar",
                  payload: event.target.checked,
                });
              }}
            />
          }
          label="5 Stars"
        />
      </Grid>
    </Grid>
  );
};

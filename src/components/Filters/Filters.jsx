import { CategoryFilters } from "./CategoryFilters";
import { PriceFilters } from "./PriceFilters";
import { RatingFilters } from "./RatingFilters";
import { Divider, Typography } from "@mui/material";

export const Filters = () => {
  return (
    <div>
      <Typography variant="h4" component="div">
        Filters
      </Typography>
      <Divider />
      <CategoryFilters />
      <Divider />
      <RatingFilters />
      <Divider />
      <PriceFilters />
    </div>
  );
};

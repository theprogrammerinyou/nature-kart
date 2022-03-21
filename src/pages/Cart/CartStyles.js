import { makeStyles } from "@mui/styles";

export const CartStyles = makeStyles(() => ({
  wrapperContainer: {
    marginLeft: "3rem",
    width: "25rem",
    border: "1px solid black",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
  },
}));

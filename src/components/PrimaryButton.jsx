import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  buttonStyles: {
    backgroundColor: "#606c38!important",
    borderRadius: "40px!important",
  },
}));

export const PrimaryButton = ({ text, onClick }) => {
  const classes = useStyles();

  return (
    <Button
      onClick={onClick}
      variant="contained"
      className={classes.buttonStyles}
    >
      {text}
    </Button>
  );
};

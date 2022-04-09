import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  buttonStyles: {
    borderRadius: "40px!important",
    border: "2px solid #606c38!important",
    color: "#606c38!important",
  },
}));

export const SecondaryButton = ({ text, onClick }) => {
  const classes = useStyles();

  return (
    <Button
      onClick={onClick}
      variant="outlined"
      className={classes.buttonStyles}
      fullWidth
    >
      {text}
    </Button>
  );
};

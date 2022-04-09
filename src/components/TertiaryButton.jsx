import { Button } from "@mui/material";

export const TertiaryButton = ({ text, onClick }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      style={{
        border: "1px solid #PDA15E!important",
        borderRadius: "20px!important",
      }}
    >
      {text}
    </Button>
  );
};

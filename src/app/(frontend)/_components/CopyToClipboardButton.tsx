"use client";
import { PropsWithChildren, useState } from "react";
import { Box, Snackbar } from "@mui/material";

const CopyToClipboardButton = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(window.location.toString());
  };

  return (
    <Box onClick={handleClick}>
      {children}
      <Snackbar
        message="Therapist link copied to clipboard"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
        sx={{
          "&.MuiSnackbar-root .MuiSnackbarContent-message": {
            mx: "auto",
          },
        }}
      />
    </Box>
  );
};

export default CopyToClipboardButton;

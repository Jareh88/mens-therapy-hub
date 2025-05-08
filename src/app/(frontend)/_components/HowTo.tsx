"use client";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { HowToDrawer } from "./HowToDrawer";
import { themeBlue, themeWhite } from "@/app/constants";

export default function HowToComponent() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Box
        sx={{
          border: `2px solid ${themeBlue}`,
          width: "100%",
          maxWidth: "200px",
          py: 2,
          px: 3,
          backgroundColor: themeBlue,
          color: themeWhite,
          borderRadius: "20px",
          "&:hover": {
            backgroundColor: "transparent",
            cursor: "pointer",
          },
        }}
        onClick={toggleDrawer(true)}
      >
        <Typography variant="h5" align="center">
          How to choose a therapist
        </Typography>
      </Box>
      <HowToDrawer open={open} onClick={toggleDrawer(false)} />
    </>
  );
}

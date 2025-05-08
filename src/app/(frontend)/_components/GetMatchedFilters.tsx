"use client";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ExtensionIcon from "@mui/icons-material/Extension";
import { FilterDrawer } from "./filter/FilterDrawerComponent";
import { useSearchParams } from "next/navigation";
import { themeDeepBlue, themeYellow } from "@/app/constants";

export default function GetMatchedFilters() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams(); //=== "/therapists";
  const isForced = searchParams.get("openFilter");

  // For when we link to page with openFilter=true start page with drawer open
  useEffect(() => {
    if (isForced) {
      setOpen(!!isForced);
    }
  }, [isForced]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Box
        className="pulse"
        sx={{
          border: `2px solid ${themeYellow}`,
          p: 3,
          lineHeight: 1,
          transition: "all .2s ease-in-out",
          backgroundColor: themeYellow,
          color: themeDeepBlue,
          "&:hover": {
            backgroundColor: "transparent",
            color: themeYellow,
            cursor: "pointer",
          },
          borderRadius: "4px",
        }}
        onClick={toggleDrawer(true)}
      >
        <Box className="pulse-delay" justifyItems="center">
          <Box sx={{ fontSize: "62px" }}>
            <ExtensionIcon fontSize="inherit" />
          </Box>
          <Box>
            <Typography variant="h5">Get Matched</Typography>
          </Box>
        </Box>
      </Box>
      <FilterDrawer open={open} onClick={toggleDrawer(false)} />
    </>
  );
}

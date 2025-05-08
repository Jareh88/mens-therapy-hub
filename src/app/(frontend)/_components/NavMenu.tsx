"use client";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Button } from "@mui/material";
import { NavDrawer } from "./NavDrawer";
import { useState } from "react";

export const NavMenu = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Button
        size="large"
        onClick={toggleDrawer(true)}
        className="header-link nav-btn"
      >
        <MenuRoundedIcon fontSize="large" />
      </Button>
      <NavDrawer open={open} onClick={toggleDrawer(false)} />
    </>
  );
};

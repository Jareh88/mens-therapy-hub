"use client";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import Link from "next/link";

export default function HeaderDropdown() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        onMouseEnter={handleMouseEnter}
        aria-controls={open ? "dropdown-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        className="header-link"
        size="medium"
      >
        Resources
      </Button>
      <Menu
        id="resources-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            onMouseEnter: () => setAnchorEl(anchorEl),
            onMouseLeave: handleClose,
          },
        }}
      >
        <Link href="/getting-started">
          <MenuItem onClick={handleClose}>Getting Started</MenuItem>
        </Link>
        <Link href="/common-therapy-topics">
          <MenuItem onClick={handleClose}>Common Therapy Topics</MenuItem>
        </Link>
        <Link href="/articles">
          <MenuItem onClick={handleClose}>Articles</MenuItem>
        </Link>
      </Menu>
    </Box>
  );
}

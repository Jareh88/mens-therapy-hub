"use client";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import { themeDeepBlue, themeYellow } from "@/app/constants";

export default function FooterNav({}) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List className="footer-nav-list" component="div" sx={{ sm: { ml: -2 } }}>
      <ListItemButton disableRipple onClick={handleClick} component="div">
        <ListItemText
          primary="Resources"
          slotProps={{
            primary: { variant: "body2", sx: { color: `${themeYellow}` } },
          }}
        />
        {!open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={!open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href="/articles">
            <ListItemButton disableRipple sx={{ pl: 4 }} component="div">
              <ListItemText
                primary="Articles"
                slotProps={{
                  primary: {
                    variant: "body2",
                    sx: { color: `${themeYellow}` },
                  },
                }}
              />
            </ListItemButton>
          </Link>
          <Link href="/getting-started">
            <ListItemButton disableRipple sx={{ pl: 4 }} component="div">
              <ListItemText
                primary="Getting Started"
                slotProps={{
                  primary: {
                    variant: "body2",
                    sx: { color: `${themeYellow}` },
                  },
                }}
              />
            </ListItemButton>
          </Link>
          <Link href="/common-therapy-topics">
            <ListItemButton disableRipple sx={{ pl: 4 }} component="div">
              <ListItemText
                primary="Common Therapy Topics"
                slotProps={{
                  primary: {
                    variant: "body2",
                    sx: { color: `${themeYellow}` },
                  },
                }}
              />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
      <Link href="/therapists">
        <ListItemButton
          disableRipple
          component="div"
          sx={{
            backgroundColor: "#ff9000",
            color: themeDeepBlue,
            borderRadius: 1,

            "&:hover p": { color: "#ff9000 !important" },
          }}
        >
          <ListItemText
            primary="Find your therapist"
            slotProps={{
              primary: {
                variant: "body2",
                sx: {
                  textTransform: "uppercase",
                  fontWeight: "bold",
                },
              },
            }}
          />
        </ListItemButton>
      </Link>
      <Link href="/about-mth">
        <ListItemButton disableRipple component="div">
          <ListItemText
            primary="About MTH"
            slotProps={{
              primary: { variant: "body2", sx: { color: `${themeYellow}` } },
            }}
          />
        </ListItemButton>
      </Link>
      <Link href="/contact-us">
        <ListItemButton disableRipple component="div">
          <ListItemText
            primary="Contact Us"
            slotProps={{
              primary: { variant: "body2", sx: { color: `${themeYellow}` } },
            }}
          />
        </ListItemButton>
      </Link>
    </List>
  );
}

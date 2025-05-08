import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import React from "react";

type NavDrawerProps = {
  onClick: () => void;
  open: boolean;
};

type NavItem = {
  text: string;
  link?: string;
  children?: { text: string; link: string }[];
};

const navItems: NavItem[] = [
  {
    text: "Resources",
    children: [
      { text: "Getting Started", link: "/getting-started" },
      { text: "Common Therapy Topics", link: "/common-therapy-topics" },
      { text: "Articles", link: "/articles" },
    ],
  },
  { text: "Find Your Therapist", link: "/therapists" },
  { text: "Join The Directory", link: "/join" },
  { text: "About MTH", link: "/about" },
];

function DrawerLinks({ items }: { items: NavItem[] }) {
  return items.map((item, i) =>
    item.children ? (
      <React.Fragment key={i}>
        <ListItem
          disablePadding
          sx={{ pointerEvents: "none", "& *": { pointerEvents: "none" } }}
        >
          <ListItemButton>
            <ListItemText primary={item.text} className="mobile-nav-link" />
          </ListItemButton>
        </ListItem>

        {item.children.map((c, ci) => (
          <Link href={c.link} key={`${i}-${ci}`} passHref>
            <ListItem disablePadding sx={{ pl: 2 }}>
              <ListItemButton>
                <ListItemText primary={c.text} className="mobile-nav-link" />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </React.Fragment>
    ) : (
      <Link href={item.link!} key={i} passHref>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={item.text} className="mobile-nav-link" />
          </ListItemButton>
        </ListItem>
      </Link>
    )
  );
}

export const NavDrawer = ({ onClick, open }: NavDrawerProps) => {
  const DrawerList = (
    <Box
      sx={{
        width: 300,
        height: "100%",
        color: "text.secondary",
        backgroundColor: "secondary.main",
      }}
      role="presentation"
      onClick={onClick}
    >
      <List>
        <DrawerLinks items={navItems} />
      </List>
      <Divider />
      <List>
        {[
          { text: "Search", link: "/search" },
          { text: "Login", link: "/login" },
        ].map((navItem, index) => (
          <Link href={navItem.link} key={index}>
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={navItem.text}
                  className="mobile-nav-link"
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      <Drawer open={open} onClose={onClick} anchor="right">
        {DrawerList}
      </Drawer>
    </Box>
  );
};

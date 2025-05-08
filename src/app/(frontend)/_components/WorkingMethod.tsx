import { Typography } from "@mui/material";
import LaptopOutlinedIcon from "@mui/icons-material/LaptopOutlined";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import HouseIcon from "@mui/icons-material/House";
import Grid from "@mui/material/Grid2";
import React from "react";

type WorkingMethodComponentProps = {
  status?: string[];
};

export default function WorkingMethodComponent({
  status = [],
}: WorkingMethodComponentProps) {
  const icons: React.ReactElement[] = [];

  // none selected
  if (status.length === 0) {
    icons.push(
      <Grid
        size={12}
        sx={{ display: "flex", justifyContent: "center" }}
        key="none"
      >
        <Typography variant="body2" color="warning">
          No communication method selected
        </Typography>
      </Grid>
    );
  }

  const add = (key: string, label: string, Icon: typeof LaptopOutlinedIcon) =>
    icons.push(
      <Grid
        key={key}
        size={status.length > 1 ? 6 : 12}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Icon sx={{ p: "2px" }} />
        <Typography variant="body2" sx={{ pl: 0.5 }}>
          {label}
        </Typography>
      </Grid>
    );

  if (status.includes("Online")) add("online", "Online", LaptopOutlinedIcon);
  if (status.includes("In Person"))
    add("in‑person", "In Person", ChairOutlinedIcon);
  if (status.includes("Phone")) add("phone", "Phone", PhoneIcon);
  if (status.includes("Home Visits"))
    add("home‑visits", "Home Visits", HouseIcon);

  return (
    <Grid container width="100%" justifyContent="center" sx={{ px: 1 }}>
      {icons}
    </Grid>
  );
}

import { Button, Typography } from "@mui/material";
import Link from "next/link";
import Grid from "@mui/material/Grid2";
import { User } from "@/payload-types";

type AdminBarProps = {
  user: User;
};

export default function AdminBar({ user }: AdminBarProps) {
  return (
    <Grid
      container
      sx={{
        backgroundColor: "#f0f0f0",
        alignItems: "center",
        px: 2,
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        py: 0.5,
        zIndex: 99999,
      }}
    >
      <Grid size={4}>
        <Typography variant="body1" component="h6">
          Admin Nav for {user.email}
        </Typography>
      </Grid>
      <Grid
        size={8}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Link href="/admin" target="_blank">
          <Button sx={{ m: 1 }} size="small">
            Admin Panel
          </Button>
        </Link>
        <Link href="/admin/account" target="_blank">
          <Button sx={{ m: 1 }} size="small">
            Account Settings
          </Button>
        </Link>
        <Link href="/admin/logout" target="_blank">
          <Button variant="contained" size="small">
            Logout
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

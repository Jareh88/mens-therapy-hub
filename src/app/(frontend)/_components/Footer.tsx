import Grid from "@mui/material/Grid2";
import FooterNav from "./FooterNav";
import Image from "next/image";
import {
  Box,
  Container,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { themeWhite, themeYellow } from "@/app/constants";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <Grid container sx={{ py: 4 }} spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Image
              src={`/assets/MTH rectangle orange transparent.png`}
              alt="logo"
              width="240"
              height="69"
              priority
            />
            <Typography
              variant="h4"
              component="h3"
              color="primary"
              sx={{ fontStyle: "italic", my: 2 }}
            >
              Psychotherapy & Counselling by men, for men.
            </Typography>
            {/* TODO CMS editable address */}
            <address>
              <Typography variant="body1" color="primary">
                28 Enter Address Here
                <br />
                And Town <br />
                And Postcode <br />
                UK <br />
              </Typography>
            </address>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ md: { px: 2 } }}>
            <Typography variant="h5">Get Involved</Typography>
            <List sx={{ sm: { ml: -2 } }}>
              <Link href="javascript:;">
                <ListItemButton disableRipple component="div">
                  <ListItemText
                    primary="Join The Directory"
                    slotProps={{
                      primary: {
                        variant: "body2",
                        sx: { color: `${themeYellow}` },
                      },
                    }}
                  />
                </ListItemButton>
              </Link>
              <Link href="javascript:;">
                <ListItemButton disableRipple component="div">
                  <ListItemText
                    primary="Login"
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
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h5">Site Links</Typography>
            <FooterNav />
          </Grid>
        </Grid>
      </Container>

      <Box
        sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", py: 1, px: 2 }}
      >
        <Container>
          <Grid container>
            <Grid size={6}>
              <Typography variant="body2" color="primary">
                {"Copyright © "}
                <Link color="inherit" href="/">
                  {"Men's Therapy Hub"}
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography
                variant="body2"
                color="primary"
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  "& a:hover": { color: themeWhite },
                }}
              >
                <Link href="javascript:;">Terms and Conditions</Link>
                &nbsp;{"|"}&nbsp;
                <Link href="javascript:;">Privacy Policy</Link>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}

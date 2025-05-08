import Image from "next/image";
import { NavMenu } from "./NavMenu";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import { Button, Container /*, Typography */ } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HeaderDropdown from "./HeaderDropdown";

export const Header = ({ isSticky = false }) => {
  return (
    <Container>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{ py: isSticky ? 1 : 4, mx: "auto" }}
      >
        <Link href="/">
          <Image
            src={`/assets/MTH rectangle orange transparent.png`}
            alt="logo"
            width="240"
            height="69"
            priority
          />
        </Link>
        <HeaderDropdown />
        <Link href="/therapists">
          <Button
            variant="contained"
            size="large"
            disableElevation
            className="header-link header-link--em"
          >
            {/* <Typography variant="h3" component="span"> */}
            Find your
            <br />
            therapist
            {/* </Typography> */}
          </Button>
        </Link>
        {/* <Link href="/join"> */}
        <Button className="header-link" size="medium">
          Join The
          <br />
          Directory
        </Button>
        {/* </Link> */}
        <Link href="/about">
          <Button className="header-link" size="medium">
            About MTH
          </Button>
        </Link>
        {/* <Link href="/therapists"> */}
        <Button className="header-link header-link--icon" size="large">
          <SearchIcon />
        </Button>
        {/* </Link> */}
        {/* <Link href="/log-in"> */}
        <Button className="header-link header-link--login" size="large">
          Login
        </Button>
        {/* </Link> */}
        <NavMenu />
      </Grid>
    </Container>
  );
};

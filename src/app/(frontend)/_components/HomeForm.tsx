"use client";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import placeholderOptions from "../_helpers/placeholderSpecialisms";
import SearchIcon from "@mui/icons-material/Search";
import LaptopOutlinedIcon from "@mui/icons-material/LaptopOutlined";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import { useState } from "react";
import Link from "next/link";
import { Filter, filterToSearch, DEFAULT_FILTER } from "./filter/filterQuery";
import { themeBlue, themeWhite, themeYellow } from "@/app/constants";

export const HomeForm = () => {
  const [selectedInPerson, setSelectedInPerson] = useState(true);
  const [selectedOnline, setSelectedOnline] = useState(false);
  const [location, setLocation] = useState("");
  const [speciality, setSpeciality] = useState<string | undefined>();

  const filter: Filter = {
    ...DEFAULT_FILTER,
    communication: [
      selectedInPerson && "In Person",
      selectedOnline && "Online",
    ].filter(Boolean) as Filter["communication"],
    specialisms: speciality && speciality !== "Any" ? [speciality] : [],
    address: location || undefined,
  };

  const href = `/therapists?${filterToSearch(filter)}`;

  const handleInPersonClick = () => {
    if (!selectedInPerson) {
      setSelectedInPerson(true);
    } else {
      setLocation("");
      setSelectedInPerson(false);
    }
  };

  const handleOnlineClick = () => {
    setSelectedOnline(!selectedOnline);
  };

  return (
    <Card
      raised={true}
      sx={{
        bgcolor: "primary.dark",
        color: "primary.contrastText",
        p: { xs: 3, sm: 4, lg: 6 },
        border: {
          xs: `4px solid ${themeYellow}`,
          sm: `6px solid ${themeYellow}`,
        },
        borderRadius: "16px",
        mb: { xs: 0, md: 6 },
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{ mb: 2, textDecoration: "underline" }}
        >
          Let&apos;s get you started:
        </Typography>
        <FormControl fullWidth>
          <FormLabel id="sessions-group-label" focused={false}>
            <Typography variant="h5" component="h4" mb={2}>
              How would you like your sessions?
            </Typography>
          </FormLabel>
          {/* <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              mb: 2,
            }}
          >
            <FormControlLabel
              control={<Checkbox onChange={(e) => handleChange(e)} />}
              label="In person"
            />
            <FormControlLabel control={<Checkbox />} label="Online" />
          </FormGroup> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              mb: 4,
            }}
          >
            <Button
              variant="outlined"
              size="large"
              startIcon={<ChairOutlinedIcon />}
              onClick={handleInPersonClick}
              sx={{
                width: "50%",
                mr: 1,
                p: 2,
                ...(selectedInPerson && {
                  backgroundColor: "rgba(2, 136, 209, 0.2)",
                  fontWeight: 700,
                  borderColor: themeBlue,
                  "& p": {
                    fontWeight: 700,
                  },
                }),
              }}
            >
              <Typography variant="body1">In Person</Typography>
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<LaptopOutlinedIcon />}
              onClick={handleOnlineClick}
              sx={{
                width: "50%",
                ml: 1,
                p: 2,
                ...(selectedOnline && {
                  backgroundColor: "rgba(2, 136, 209, 0.2)",
                  borderColor: themeBlue,
                  "& p": {
                    fontWeight: 700,
                  },
                }),
              }}
            >
              <Typography variant="body1">Online</Typography>
            </Button>
          </Box>
          {selectedInPerson && (
            <>
              <FormLabel id="sessions-group-label" focused={false}>
                <Typography variant="h5" component="h4">
                  Where are you based?
                </Typography>
              </FormLabel>
              <TextField
                variant="filled"
                id="input-with-icon-textfield"
                placeholder="Postcode, town, etc"
                value={location ?? ""}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnOutlinedIcon color="secondary" />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ mb: 3 }}
              />
            </>
          )}

          <FormLabel
            id="sessions-group-label"
            focused={false}
            sx={{ color: "primary.contrastText", mb: 2 }}
          >
            <Typography variant="h5" component="h4">
              What do you need help with?
            </Typography>
          </FormLabel>
          <Autocomplete
            options={placeholderOptions}
            openOnFocus
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={{ color: themeWhite }}
                label="Please select..."
              />
            )}
            sx={{
              mb: 4,
            }}
            value={
              placeholderOptions.find((o) => o.label === speciality) ?? null
            }
            onChange={(e, newOpt) => setSpeciality(newOpt ? newOpt.label : "")}
          />
          <Link href={href}>
            <Button
              variant="contained"
              type="submit"
              size="large"
              startIcon={<SearchIcon />}
              fullWidth
            >
              Search
            </Button>
          </Link>
        </FormControl>
      </Box>
    </Card>
  );
};

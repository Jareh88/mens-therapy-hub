"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ButtonCheckboxGroup from "../form/ButtonCheckboxGroupComponent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PriceSlider } from "../form/PriceSliderComponent";
import DividerComponent from "../Divider";
import placeholderSpecialisms from "@frontend/_helpers/placeholderSpecialisms";
import Close from "@mui/icons-material/Close";
import placeholderTherapyTypes from "@frontend/_helpers/placeholderTherapyTypes";
import SkateboardingIcon from "@mui/icons-material/Skateboarding";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import placeholderEthnicities from "@frontend/_helpers/placeholderEthnicities";
import placeholderLanguages from "@frontend/_helpers/placeholderLanguages";
import { useRouter } from "next/navigation";
import { useFilter } from "./FilterProvider";
import placeholderCommunicationMethods from "../../_helpers/placeholderCommunicationMethods";
import { themeDeepBlue, themeWhite } from "@/app/constants";

type FilterDrawerProps = {
  onClick(): void;
  open: boolean;
};

export const FilterDrawer = ({ onClick, open }: FilterDrawerProps) => {
  const { filter, update, total } = useFilter();
  const router = useRouter();

  const clearFilters = () => {
    router.replace("/therapists", { scroll: false });

    update({
      communication: [],
      ethnicity: "",
      price: [40, 200],
      specialisms: [],
      age: undefined,
      therapyTypes: [],
      language: "",
    });
  };

  const Filters = (
    <Box
      sx={{
        width: 900,
        height: "100%",
        backgroundColor: themeWhite,
        color: themeDeepBlue,
        py: "56px",
        overflow: "auto",
      }}
      role="presentation"
    >
      <Box
        sx={{
          backgroundColor: "#e5f3fb",
          p: 1,
          position: "absolute",
          top: "0",
          right: "0",
          left: "0",
          zIndex: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          component="h3"
          sx={{
            px: 2,
          }}
        >
          Get Matched
        </Typography>
        <Typography component="h6" variant="body2">
          Use our filter tools to narrow down your options
        </Typography>
        <Button variant="text" endIcon={<Close />} onClick={onClick}>
          Close
        </Button>
      </Box>
      <Box sx={{ px: 2 }}>
        {/* Type of Session
      4 Checkboxes */}
        <Accordion
          defaultExpanded
          sx={{
            backgroundColor: themeWhite,
            "& .MuiAccordionSummary-expandIconWrapper": {
              color: themeDeepBlue,
            },
          }}
          elevation={0}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="session-type-content"
            id="session-type-header"
          >
            <Typography variant="h5" component="h4" sx={{ fontSize: "16px" }}>
              Type of Session
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ButtonCheckboxGroup
              buttonSize="small"
              options={placeholderCommunicationMethods}
              value={filter.communication ?? []}
              onChange={(comm) =>
                update({ communication: comm.length ? comm : undefined })
              }
            />
          </AccordionDetails>
        </Accordion>

        <Box sx={{ px: 2 }}>
          <DividerComponent width="100%" />
        </Box>

        {/* Price per session
      slider */}
        <Accordion
          defaultExpanded
          sx={{
            backgroundColor: themeWhite,
            "& .MuiAccordionSummary-expandIconWrapper": {
              color: themeDeepBlue,
            },
            "& .MuiSlider-track": {
              borderColor: themeDeepBlue,
            },
            "&.MuiAccordion-root": {
              margin: "8px 0",
            },
          }}
          elevation={0}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="price-content"
            id="price-header"
          >
            <Typography variant="h5" component="h4" sx={{ fontSize: "16px" }}>
              Price per session
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PriceSlider
              passedValue={filter.price}
              onChange={(next) => update({ price: next })}
            />
          </AccordionDetails>
        </Accordion>

        <Box sx={{ px: 2 }}>
          <DividerComponent width="100%" />
        </Box>

        {/* Specialities 
      autocomplete multi select */}
        <Accordion
          defaultExpanded
          sx={{
            backgroundColor: themeWhite,
            "& .MuiAccordionSummary-expandIconWrapper": {
              color: themeDeepBlue,
            },
            "& .MuiSlider-track": {
              borderColor: themeDeepBlue,
            },
          }}
          elevation={0}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="specialisms-content"
            id="specialisms-header"
          >
            <Typography variant="h5" component="h4" sx={{ fontSize: "16px" }}>
              What do you need help with? &nbsp;
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Autocomplete
              multiple
              id="Specialities"
              options={placeholderSpecialisms}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  sx={{ color: themeWhite }}
                  label="Therapist specialities"
                  placeholder="Start typing to select..."
                />
              )}
              value={(filter.specialisms ?? []).map(
                (id) => placeholderSpecialisms.find((p) => p.id === id)!
              )}
              onChange={(e, next) =>
                update({
                  specialisms: next.length ? next.map((p) => p.id) : undefined,
                })
              }
            />
          </AccordionDetails>
        </Accordion>

        <Box sx={{ px: 2 }}>
          <DividerComponent width="100%" />
        </Box>

        {/* Therapy types */}
        <Accordion
          defaultExpanded
          sx={{
            backgroundColor: themeWhite,
            "& .MuiAccordionSummary-expandIconWrapper": {
              color: themeDeepBlue,
            },
            "& .MuiSlider-track": {
              borderColor: themeDeepBlue,
            },
            "&.MuiAccordion-root": {
              margin: "8px 0",
            },
          }}
          elevation={0}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="therapy-types-content"
            id="therapy-types-header"
          >
            <Typography variant="h5" component="h4" sx={{ fontSize: "16px" }}>
              Therapy Types
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Autocomplete
              multiple
              id="therapy-types"
              options={placeholderTherapyTypes}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  sx={{ color: themeWhite }}
                  label="Types of therapy"
                  placeholder="Start typing to select..."
                />
              )}
              value={(filter.therapyTypes ?? []).map(
                (id) => placeholderTherapyTypes.find((p) => p.id === id)!
              )}
              onChange={(_, next) =>
                update({
                  therapyTypes: next.length ? next.map((p) => p.id) : undefined,
                })
              }
            />
          </AccordionDetails>
        </Accordion>

        <Box sx={{ px: 2 }}>
          <DividerComponent width="100%" />
        </Box>
        {/* Age  - Multi select like type of session */}
        <Accordion
          defaultExpanded
          sx={{
            backgroundColor: themeWhite,
            "& .MuiAccordionSummary-expandIconWrapper": {
              color: themeDeepBlue,
            },
          }}
          elevation={0}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="age-content"
            id="age-header"
          >
            <Typography variant="h5" component="h4" sx={{ fontSize: "16px" }}>
              Your Age
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ButtonCheckboxGroup
              options={[
                {
                  label: "14-18",
                  icon: <SkateboardingIcon />,
                },
                {
                  label: "18-65",
                  icon: <EmojiPeopleIcon />,
                },
                {
                  label: "65+",
                  icon: <EmojiEventsIcon />,
                },
              ]}
              buttonSize="small"
              selectOne
              value={filter.age ?? ""}
              onChange={(next) => update({ age: next })}
            />
          </AccordionDetails>
        </Accordion>

        <Box sx={{ px: 2 }}>
          <DividerComponent width="100%" />
        </Box>

        {/* Ethnicity - Dropdown single select */}
        <Accordion
          defaultExpanded
          sx={{
            backgroundColor: themeWhite,
            "& .MuiAccordionSummary-expandIconWrapper": {
              color: themeDeepBlue,
            },
          }}
          elevation={0}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="ethnicity-content"
            id="ethnicity-header"
          >
            <Typography variant="h5" component="h4" sx={{ fontSize: "16px" }}>
              Therapist Ethnicity
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl variant="standard" sx={{ minWidth: 120 }} fullWidth>
              <InputLabel id="ethnicity-label">Ethnicity</InputLabel>
              <Select
                labelId="ethnicity-label"
                id="label-standard"
                value={filter.ethnicity ?? ""}
                label="Ethnicity"
                onChange={(e) =>
                  update({ ethnicity: e.target.value || undefined })
                }
              >
                {placeholderEthnicities.map((ethnicity, index) => {
                  return (
                    <MenuItem key={index} value={ethnicity.id}>
                      {ethnicity.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ px: 2 }}>
          <DividerComponent width="100%" />
        </Box>

        {/* Preferred language - Dropdown single select */}
        <Accordion
          defaultExpanded
          sx={{
            backgroundColor: themeWhite,
            "& .MuiAccordionSummary-expandIconWrapper": {
              color: themeDeepBlue,
            },
          }}
          elevation={0}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="language-content"
            id="language-header"
          >
            <Typography variant="h5" component="h4" sx={{ fontSize: "16px" }}>
              Preferred Language
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl variant="standard" sx={{ minWidth: 120 }} fullWidth>
              <InputLabel id="ethnicity-label">Language</InputLabel>
              <Select
                labelId="preferredLanguage-label"
                id="preferredLanguage"
                value={filter.language ?? ""}
                label="Preferred Language"
                onChange={(e) =>
                  update({ language: e.target.value || undefined })
                }
              >
                {placeholderLanguages.map((language, index) => {
                  return (
                    <MenuItem key={index} value={language.id}>
                      {language.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </AccordionDetails>
        </Accordion>

        <Box
          sx={{
            backgroundColor: "#e5f3fb",
            px: 4,
            py: 1,
            position: "absolute",
            bottom: "0",
            right: "0",
            left: "0",
            zIndex: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button variant="text" onClick={clearFilters}>
            Clear Filters
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={onClick}
          >{`Show ${total} Therapists`}</Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box>
      <Drawer
        open={open}
        onClose={onClick}
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            top: "20px",
            bottom: "20px",
            height: "auto",
            right: "20px",
            borderRadius: "4px",
          },
        }}
      >
        {Filters}
      </Drawer>
    </Box>
  );
};

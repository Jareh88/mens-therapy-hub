"use client";

import { grey } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import {
  themeBlue,
  themeBrown,
  themeDeepBlue,
  themeWhite,
  themeYellow,
} from "../constants";

let theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: themeYellow,
      dark: themeWhite,
      contrastText: themeDeepBlue,
    },
    secondary: {
      main: themeDeepBlue,
      dark: themeBrown,
    },
    background: {
      default: themeDeepBlue,
      paper: themeDeepBlue,
    },
    text: {
      primary: themeDeepBlue,
      secondary: themeWhite,
    },
    info: {
      main: themeBlue,
    },
  },
  spacing: 8,
  typography: {
    fontSize: 16,
    fontFamily: "var(--font-roboto)",
    h1: {
      fontFamily: "Rubik",
      fontWeight: 700,
      fontSize: 36,
    },
    h2: {
      fontFamily: "Rubik",
      fontWeight: 700,
      fontSize: 26,
    },
    h3: {
      fontFamily: "Rubik",
      fontWeight: 700,
      fontSize: 22,
    },
    h4: {
      fontFamily: "Rubik",
      fontWeight: 700,
      fontSize: 20,
    },
    h5: {
      fontFamily: "Rubik",
      fontWeight: 700,
      fontSize: 16,
    },
    h6: {
      fontFamily: "Rubik",
      fontWeight: 700,
      fontSize: 14,
    },
    subtitle1: {
      fontFamily: "Rubik",
      fontWeight: 700,
      fontSize: 22,
    },
    subtitle2: {
      fontFamily: "Rubik",
      fontWeight: 700,
      fontSize: 20,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.8rem",
      opacity: "1",
      lineHeight: "1.8",
      color: themeDeepBlue,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        article: {
          "& h1, & h2, & h3, & h4, & h5, & h6": {
            fontFamily: "Roboto, sans-serif",
            fontWeight: 700,
            marginBottom: "1rem",
          },
          "& h1": {
            fontSize: 36,
          },
          "& h2": {
            fontSize: 26,
          },
          "& h3": {
            fontSize: 22,
          },
          "& h4": {
            fontSize: 20,
          },
          "& h5": {
            fontSize: 16,
          },
          "& h6": {
            fontSize: 14,
          },
          "& p": {
            fontSize: "1rem",
            marginBottom: "1rem",
          },
          "& blockquote": {
            marginBottom: "1rem",
            paddingLeft: "2rem",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            borderLeft: `3px solid ${themeYellow}`,
            backgroundColor: "rgba(255, 153, 0, 0.1)",
            borderRadius: "4px",
            "::before": {
              content: '"“"',
              fontSize: "1rem",
            },
            "::after": {
              content: '"”"',
              fontSize: "1rem",
            },
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          "&:hover": {
            backgroundColor: themeYellow,
            color: themeWhite,
          },
          "&.header-link": {
            color: themeYellow,
            textTransform: "uppercase",
            letterSpacing: "4px",
            padding: "6px 16px",
            border: "2px solid transparent",
            lineHeight: "1.2",
          },
          "&.header-link:hover": {
            color: themeDeepBlue,
            transition:
              "color .2s ease-in-out, background-color .2s ease-in-out , border-color .2s ease-in-out",
          },
          "&.header-link--em": {
            backgroundColor: themeYellow,
            color: themeDeepBlue,
            // textTransform: "none",
            // letterSpacing: "initial",
          },
          "&.header-link--em:hover": {
            color: themeYellow,
            // backgroundColor: "rgba(255, 153, 0, 0.7)",
            backgroundColor: "rgba(2, 136, 209, 0.2)",
            borderColor: themeYellow,
          },
          "&.header-link--icon": {
            color: themeWhite,
          },
          "&.header-link--icon:hover": {
            color: themeDeepBlue,
          },
          "&.header-link--login": {
            backgroundColor: themeBlue,
            color: themeWhite,
            letterSpacing: "2px",
          },
          "&.header-link--login:hover": {
            backgroundColor: themeYellow,
            color: themeDeepBlue,
            letterSpacing: "2px",
          },
        },
      },
      variants: [
        {
          props: { variant: "text" },
          style: {
            color: themeDeepBlue,
          },
        },
        {
          props: { variant: "contained" },
          style: {
            color: themeWhite,
            backgroundColor: themeDeepBlue,
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            borderColor: grey[400],
            color: themeDeepBlue,

            "&:hover": {
              color: themeDeepBlue,
              borderColor: "transparent",
              backgroundColor: "rgba(2, 136, 209, 0.1)",
            },
          },
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:not(.MuiAutocomplete-popupIndicator,.MuiAutocomplete-clearIndicator)":
            {
              backgroundColor: themeDeepBlue,
              // "&.bookmark-btn": {
              // },
              "&:hover": {
                backgroundColor: themeYellow,
              },
            },
          "&.MuiAutocomplete-popupIndicator": {
            color: themeDeepBlue,
          },
          "&.MuiAutocomplete-popupIndicatorOpen": {
            color: themeYellow,
          },
          "&.MuiAutocomplete-clearIndicator": {
            color: themeDeepBlue,
          },
          "&.MuiAutocomplete-clearIndicatorOpen": {
            color: themeYellow,
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          borderColor: themeDeepBlue,
          backgroundColor: "transparent",

          // .mui-19jubgg-MuiAutocomplete-root .MuiInput-root .MuiInput-input
          // "& .MuiInput-root .MuiInput-input": {
          //   padding: "20px",
          // },
          "& .MuiAutocomplete-clearIndicator:hover": {
            backgroundColor: themeYellow,
            color: themeWhite,
          },
        },
        option: {
          backgroundColor: themeWhite,
          "&:hover": {
            color: themeWhite,
          },
        },
        listbox: {
          backgroundColor: themeWhite,
          "& .MuiAutocomplete-option.Mui-focused": {
            backgroundColor: themeBlue,
          },
          "& .MuiAutocomplete-option[aria-selected='true']": {
            backgroundColor: themeDeepBlue,
            color: themeWhite,
          },
          // "& .MuiAutocomplete-option[aria-selected='true'].Mui-focused": {
          //   backgroundColor: themeYellow,
          // },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderColor: themeDeepBlue,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: themeDeepBlue,
          "&.Mui-focused": {
            color: themeDeepBlue,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: themeDeepBlue,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: themeWhite,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: themeDeepBlue,
          color: themeWhite,
          "& .MuiChip-deleteIcon": {
            color: themeWhite,
          },
          "& .MuiChip-deleteIcon:hover": {
            color: themeYellow,
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          margin: "8px 0",
          "&.Mui-expanded": {
            margin: "8px 0",
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          minHeight: "24px",
          padding: "8px 16px",
          "&:hover:not(.MuiDisabled)": {
            backgroundColor: "#e5f3fb",
          },
          "&:hover:not(.MuiDisabled)[aria-expanded='false']": {
            backgroundColor: "transparent",
          },
          "& .MuiAccordionSummary-contentGutters": {
            margin: 0,
          },
          "&.Mui-expanded": {
            minHeight: "24px",
            padding: "8px 16px",
            "& .MuiAccordionSummary-contentGutters": {
              margin: 0,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          "& .MuiMenu-list": {
            backgroundColor: themeWhite,
          },
          "& .MuiMenuItem-root:hover": {
            backgroundColor: themeBlue,
            color: themeWhite,
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;

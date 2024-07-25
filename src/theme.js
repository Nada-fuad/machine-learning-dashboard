import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0500ff",
      marker: "#443373",
      font: "#2d2d34",
      box: "#ffffff",
      light: "#333454",
      contentbackground: "#EAF6F6",
      head: "#35A29F",
      side: "#35A29F",
      learnLine: "#6C22A6",
      learnLine1: "#0B666A",
      shadedLearnLine: "#6C22A677",
      shadedLearnLine1: "#0B666A77",
      confusion0: "#97FEED",
      confusion1: "#35A29F",
      confusion2: "#0B666A",
      learnRate: "#0B666A",
    },
  },
});
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0500ff",
      box: "#2d2d34",
      marker: "#443343",
      font: "#d1d3da",
      light: "#333454",
      head: "#2d2d34",
      side: "#2d2d34",
      learnLine: "#cccc00",
      learnLine1: "#207DFF",
      shadedLearnLine: "#cccc0077",
      shadedLearnLine1: "#207DFF77",
      confusion0: "#00b5ff",
      confusion1: "#0500ff",
      confusion2: "#191D87",
      contentbackground: "#1f2026",
      learnRate: "#0500ff",
    },
  },
});

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#19357c",
      light: "#2d2d",
      hover: "#31363F",
    },
  },
});

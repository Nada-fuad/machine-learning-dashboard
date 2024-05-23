import { createTheme } from "@mui/material";

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
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#19357c",
      light: "#19357c",
      hover: "",
      gradientColor: "linear-gradient(45deg, #19357c 30%, #7184b8 90%)",
      box: "#fff",
    },
  },
});
export const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#19357c",
      light: "#19357c",
      hover: "",
      gradientColor: "linear-gradient(45deg, #19357c 30%, #7184b8 90%)",
      box: "#fff",
    },
  },
});

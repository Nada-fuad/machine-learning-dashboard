import { Box } from "@mui/material";
import Navbar from "./layout/Navbar";
import Content from "./layout/Content";
import { useEffect, useState } from "react";
import { createTheme } from "@mui/material";

function App() {
  const [expermintData, setExpermintData] = useState([]);
  const [mode, setMode] = useState("light");

  const getExpermintData = async () => {
    const response = await fetch("/machine-learning-dashboard/dashboard.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();

    let dataObjekt = data.experiments;

    setExpermintData(dataObjekt);
  };
  useEffect(() => {
    getExpermintData();
  }, []);
  const darkTheme = createTheme({
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

        contentbackground: "#1f2026",
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#0500ff",
        marker: "#443373",
        font: "#2d2d34",
        box: "#ffffff",
        light: "#333454",
        contentbackground: "#EAF6F6",
        head: "#66BFBF",
        side: "#66BFBF",
      },
    },
  });

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <Box sx={{ backgroundColor: theme.palette.primary.contentbackground }}>
      <Navbar theme={theme} mode={mode} setMode={setMode} />
      <Box display="flex" flexDirection="column">
        <Content expermintData={expermintData} theme={theme} />
      </Box>
    </Box>
  );
}

export default App;

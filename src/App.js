import { Box } from "@mui/material";
import Navbar from "./layout/Navbar";
import Content from "./layout/Content";
import { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import Sidebar from "./layout/Sidebar";

function App() {
  const [expermintData, setExpermintData] = useState([]);
  const [mode, setMode] = useState("dark");
  const [jsonExperiment, setJsonExperiment] = useState("");
  const [jsonSubexperiment, setJsonSubExperiment] = useState("");
  const [jsonModel, setJsonModel] = useState("");
  const [isExperiment, setIsExperiment] = useState(false);
  const [isSubexperiment, setIsSubexperiment] = useState(false);
  const [isModel, setIsModel] = useState(false);

  const handleExperimentButton = (experiment) => {
    setJsonExperiment(experiment);
    setJsonSubExperiment(true);
    setJsonModel("");
    setIsExperiment(true);
    setIsSubexperiment(false);
    setIsModel(false);
  };

  const handleSubExperimentButton = (subExperiment) => {
    setJsonSubExperiment(subExperiment);
    setJsonModel("");
    setIsExperiment(false);
    setIsSubexperiment(true);
    setIsModel(false);
  };

  const handleModelButton = (model) => {
    setJsonModel(model);
    setIsExperiment(false);
    setIsSubexperiment(false);
    setIsModel(true);
  };

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

  console.log("🚀 ~ App ~ expermintData:", expermintData);

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

  const theme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <>
      <Navbar theme={theme} mode={mode} setMode={setMode} />

      <Box
        sx={{
          backgroundColor: theme.palette.primary.contentbackground,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box display="flex">
          <Box
            sx={{
              color: theme.palette.primary.font,
              flex: "100px 100px 200px",
            }}
          >
            <Sidebar
              theme={theme}
              expermintData={expermintData}
              onExperimentButton={handleExperimentButton}
              onSubExperimentButton={handleSubExperimentButton}
              onModelButton={handleModelButton}
            />
          </Box>
          <Content
            expermintData={expermintData}
            theme={theme}
            jsonSubexperiment={jsonSubexperiment}
            jsonExperiment={jsonExperiment}
            jsonModel={jsonModel}
            isExperiment={isExperiment}
            isSubexperiment={isSubexperiment}
            isModel={isModel}
          />
        </Box>
      </Box>
    </>
  );
}

export default App;

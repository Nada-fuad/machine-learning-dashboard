import { Box } from "@mui/material";
import Navbar from "./layout/Navbar";
import Content from "./layout/Content";
import { useEffect, useState } from "react";
import Sidebar from "./layout/Sidebar";
import { lightTheme, darkTheme } from "./theme";

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

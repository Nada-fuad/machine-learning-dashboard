import { Box } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Models from "../scenes/Models";
import Experiment from "../scenes/Expermint";
import SubExpermint from "../scenes/Subexpermint";

export default function Content({ expermintData, theme }) {
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
  return (
    <Box display="flex">
      <Box sx={{ color: theme.palette.primary.font }}>
        <Sidebar
          theme={theme}
          expermintData={expermintData}
          onExperimentButton={handleExperimentButton}
          onSubExperimentButton={handleSubExperimentButton}
          onModelButton={handleModelButton}
        />
      </Box>
      {jsonExperiment && (
        <>
          {isExperiment && (
            <Box>
              <Experiment jsonExperiment={jsonExperiment} theme={theme} />
            </Box>
          )}
          {isSubexperiment && (
            <SubExpermint
              expermintData={expermintData}
              jsonSubexperiment={jsonSubexperiment}
              jsonExperiment={jsonExperiment}
              theme={theme}
            />
          )}
          {isModel && (
            <Models
              jsonExperiment={jsonExperiment}
              jsonSubexperiment={jsonSubexperiment}
              jsonModel={jsonModel}
              expermintData={expermintData}
              theme={theme}
            />
          )}
        </>
      )}
    </Box>
  );
}

import { Box } from "@mui/material";
import React from "react";
import Models from "../scenes/Models";
import Experiment from "../scenes/Expermint";
import SubExpermint from "../scenes/Subexpermint";

export default function Content({
  expermintData,
  theme,
  jsonExperiment,
  jsonModel,
  jsonSubexperiment,
  isExperiment,
  isSubexperiment,
  isModel,
}) {
  // Rendern der Komponente für Experimenten,
  // Unterexperimenten oder Modellen je nach Auswahl

  return (
    <Box mr={4}>
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

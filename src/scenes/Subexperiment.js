import React from "react";
import { Box, styled, useMediaQuery } from "@mui/material";
import BarTestAccuracy from "../subExperimentDashboard/BarTestAccuracy";
import ValAccuracyOverwiev from "../subExperimentDashboard/ValAccuracyOverwiev";
import BarValAccuracy from "../subExperimentDashboard/BarValAccuracy";
import TestAccuracyOverwiev from "../subExperimentDashboard/TestAccuracyOverwiev";
import ValLossBar from "../subExperimentDashboard/ValLossBar";
import TestLossBar from "../subExperimentDashboard/TestLossBar";
const StyledBox = styled(Box)(({ theme }) => ({
  borderRadius: "1rem",
  boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, .4)",
  padding: "",
}));
const displayTowColum = `
"a b "
"a b "
"a b "
"a b "
"a b "
"c d "
"c d "
"c d "
"c d"
"c d "
"e f "
"e f "
"e f "
"e f "
"e f "`;

const displayOneColum = `
"a "
"a "
"a"
"a "
"a"
"b"
"b"
"b"
"b"
"b"
"c"
"c"
"c"
"c"
"c"
"d"
"d"
"d"
"d"
"d"
"e"
"e"
"e"
"e"
"e"
"f"
"f"
"f"
"f"
"f"
`;

export default function SubExpermints({
  theme,
  jsonSubexperiment,
  jsonExperiment,
}) {
  const toSmall = useMediaQuery("(min-width:1300px)");
  const selectedHistoryData = jsonExperiment.historyPath;
  // Rendern sechs Komponenten, die die grafische
  //Darstellung des ausgewählten Unterexperiments zeigt.
  return (
    <Box
      width="100%"
      height="100%"
      maxHeight={1600}
      p={2}
      display="grid"
      gap="0.6rem"
      sx={
        toSmall
          ? {
              gridTemplateColumns: "repeat(2 ,minmax(590px,1fr))",
              gridTemplateRows: "repeat(16,minmax(60px,1fr))",
              gridTemplateAreas: displayTowColum,
              backgroundColor: theme.palette.primary.contentbackground,
            }
          : {
              gridTemplateAreas: displayOneColum,
              gridAutoColumns: "1fr",
              gridAutoRows: "90px",
              backgroundColor: theme.palette.primary.contentbackground,
            }
      }
    >
      <StyledBox gridArea="a" backgroundColor={theme.palette.primary.box}>
        <BarValAccuracy
          path={selectedHistoryData}
          jsonSubexperiment={jsonSubexperiment}
          theme={theme}
        />
      </StyledBox>
      <StyledBox gridArea="b" backgroundColor={theme.palette.primary.box}>
        <BarTestAccuracy
          path={selectedHistoryData}
          jsonSubexperiment={jsonSubexperiment}
          theme={theme}
        />
      </StyledBox>

      <StyledBox gridArea="c" backgroundColor={theme.palette.primary.box}>
        <ValAccuracyOverwiev
          path={selectedHistoryData}
          jsonSubexperiment={jsonSubexperiment}
          theme={theme}
        />
      </StyledBox>

      <StyledBox gridArea="d" backgroundColor={theme.palette.primary.box}>
        <TestAccuracyOverwiev
          path={selectedHistoryData}
          jsonSubexperiment={jsonSubexperiment}
          theme={theme}
        />
      </StyledBox>
      <StyledBox gridArea="e" backgroundColor={theme.palette.primary.box}>
        <ValLossBar
          path={selectedHistoryData}
          jsonSubexperiment={jsonSubexperiment}
          theme={theme}
        />
      </StyledBox>
      <StyledBox gridArea="f" backgroundColor={theme.palette.primary.box}>
        <TestLossBar
          path={selectedHistoryData}
          jsonSubexperiment={jsonSubexperiment}
          theme={theme}
        />
      </StyledBox>
    </Box>
  );
}

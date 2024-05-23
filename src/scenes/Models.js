import React from "react";
import { Box, styled, useMediaQuery } from "@mui/material";
import LearningsRate from "../modelsDashboard/LearningsRate";
import RocCurve from "../modelsDashboard/RocCurve";
import RecallCurve from "../modelsDashboard/RecallCurve";
import ConfusionMatrix from "../modelsDashboard/ConfusionMatrix";
import AccuracyLearningCurve from "../modelsDashboard/AccuracyLearningCurve";
import LossLearningCurve from "../modelsDashboard/LossLearningCurve";
const StyledBox = styled(Box)(({ theme }) => ({
  borderRadius: "1rem",
  boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, .8)",
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

export default function Models({ theme, jsonSubexperiment, jsonModel }) {
  const toSmall = useMediaQuery("(min-width:1300px)");

  const modelName = jsonModel.name;

  const selectedModelData = jsonSubexperiment.models.find(
    (model) => model.name === modelName
  );

  if (!selectedModelData) {
    return null;
  }

  const { confusionPath, dataPath, rocPath, curvePath } = selectedModelData;

  return (
    <Box
      maxHeight={1650}
      width="100%"
      height="100%"
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
        <AccuracyLearningCurve path={dataPath} theme={theme} />
      </StyledBox>
      <StyledBox gridArea="b" backgroundColor={theme.palette.primary.box}>
        {" "}
        <LossLearningCurve path={dataPath} theme={theme} />
      </StyledBox>

      <StyledBox gridArea="c" backgroundColor={theme.palette.primary.box}>
        <ConfusionMatrix path={confusionPath} theme={theme} />
      </StyledBox>

      <StyledBox gridArea="d" backgroundColor={theme.palette.primary.box}>
        <LearningsRate path={dataPath} theme={theme} />
      </StyledBox>
      <StyledBox gridArea="e" backgroundColor={theme.palette.primary.box}>
        <RocCurve path={rocPath} theme={theme} />
      </StyledBox>
      <StyledBox gridArea="f" backgroundColor={theme.palette.primary.box}>
        <RecallCurve path={curvePath} theme={theme} />
      </StyledBox>
    </Box>
  );
}

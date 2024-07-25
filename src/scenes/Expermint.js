import { Box, styled, useMediaQuery } from "@mui/material";
import TestRange from "../expermintsDashboard/TestRange";
import ValRange from "../expermintsDashboard/ValRange";
import ValOverview from "../expermintsDashboard/ValOverview";
import TestOverview from "../expermintsDashboard/TestOverview";
const StyledBox = styled(Box)(({ theme }) => ({
  borderRadius: "1rem",
  boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, .8)",
  padding: "0",
}));
const displayTowColum = `

"a b "
"a b "
"a b "
"a b "
"c d "
"c d "
"c d "
"c d "
`;

const displayOneColum = `

"a"
"a"
"a "
"a"
"b"
"b"
"b"
"b"
"c"
"c"
"c"
"c"
"d"
"d"
"d"
"d"

`;
export default function Experiment({ jsonExperiment, theme }) {
  const toSmall = useMediaQuery("(min-width:1000px)");

  const selectedHistoryData = jsonExperiment.historyPath;
  // Rendern vier Komponenten,  die grafische Darstellungen
  // für alle Unterexperimente und Modelle für ein
  // einzelnes Experiment angezeigt.
  return (
    <Box
      maxHeight={1200}
      width="100%"
      height="100%"
      pt={2}
      pl={1}
      display="grid"
      gap="0.6rem"
      sx={
        toSmall
          ? {
              gridTemplateColumns: "repeat(2 ,minmax(590px,1fr))",
              gridTemplateRows: "repeat(10 ,minmax(60px,1fr))",
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
        {" "}
        <ValOverview path={selectedHistoryData} theme={theme} />
      </StyledBox>
      <StyledBox gridArea="b" backgroundColor={theme.palette.primary.box}>
        <ValRange path={selectedHistoryData} theme={theme} />
      </StyledBox>

      <StyledBox gridArea="c" backgroundColor={theme.palette.primary.box}>
        <TestOverview path={selectedHistoryData} theme={theme} />
      </StyledBox>

      <StyledBox gridArea="d" backgroundColor={theme.palette.primary.box}>
        <TestRange path={selectedHistoryData} theme={theme} />
      </StyledBox>
    </Box>
  );
}

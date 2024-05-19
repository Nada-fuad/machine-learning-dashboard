import React from "react";
import { Box, styled, useMediaQuery } from "@mui/material";
const StyledBox = styled(Box)({
  backgroundColor: "#fff",

  borderRadius: "1rem",
  boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, .8)",
  padding: "",
});
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

export default function Models() {
  const toSmall = useMediaQuery("(min-width:1300px)");

  return (
    <Box
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
            }
          : {
              gridTemplateAreas: displayOneColum,
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
            }
      }
    >
      <StyledBox gridArea="a"></StyledBox>
      <StyledBox gridArea="b"></StyledBox>

      <StyledBox gridArea="c"></StyledBox>

      <StyledBox gridArea="d"></StyledBox>
      <StyledBox gridArea="e"></StyledBox>
      <StyledBox gridArea="f"></StyledBox>
    </Box>
  );
}

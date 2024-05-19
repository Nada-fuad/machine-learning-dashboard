import { Brightness4, Home, LightMode, Menu } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";

export default function Navbar() {
  const [mode, setMode] = useState("light");
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height="60px"
    >
      {/* link */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap="0.75rem"
        color="#fff"
        padding={4}
      >
        <Typography variant="h6" fontWeight="bold" ml={4}>
          hannah Dashboard
        </Typography>
      </Box>

      {/* right */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap="2rem"
        color="#fff"
      >
        <Box bgcolor="#fff">
          {mode === "light" ? (
            <IconButton onClick={() => setMode("dark")}>
              <LightMode />
            </IconButton>
          ) : (
            <IconButton onClick={() => setMode("light")}>
              <Brightness4 />
            </IconButton>
          )}
        </Box>
        <Menu sx={{ mr: "16px" }} />
      </Box>
    </Box>
  );
}

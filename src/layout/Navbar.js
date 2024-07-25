import { Brightness4, Insights, LightMode, Menu } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

export default function Navbar({ mode, setMode, theme }) {
  // Rendern von Titel, Logo und Hell- und Dunkelmodus-Button

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height="60px"
      bgcolor={theme.palette.primary.head}
    >
      {/* link */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap="0.75rem"
        color={theme.palette.primary.font}
        padding={4}
      >
        <Insights ml={4} sx={{ fontSize: "40px" }} />
        <Typography
          variant="h6"
          fontWeight="bold"
          textAlign="center"
          justifyContent="center"
          fontSize="22px"
        >
          Hannah Dashboard
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
        <Box>
          {mode === "light" ? (
            <IconButton onClick={() => setMode("dark")}>
              <LightMode sx={{ color: theme.palette.primary.font }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => setMode("light")}>
              <Brightness4 sx={{ color: theme.palette.primary.font }} />
            </IconButton>
          )}
        </Box>
        <IconButton>
          <Menu sx={{ mr: "16px", color: theme.palette.primary.font }} />
        </IconButton>
      </Box>
    </Box>
  );
}

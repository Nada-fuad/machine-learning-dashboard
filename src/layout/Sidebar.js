import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItemButton,
  Typography,
  styled,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
const StyledAcc = styled(Accordion)(({ theme }) => ({
  width: "200px",

  margin: "0 0",

  color: theme.palette.primary.font,
}));

const StyledSubAcc = styled(AccordionSummary)(({ theme }) => ({
  color: theme.palette.primary.font,
  marginBottom: "0px",
  marginTop: "0px",
  padding: "0px 14px",
  borderRadius: "1px",
}));
const StyledSubAccDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: "0px 0px 0px",
  marginTop: "0px",
}));

export default function Sidebar({
  expermintData,
  onExperimentButton,
  onSubExperimentButton,
  onModelButton,
  theme,
}) {
  return (
    <>
      <Box
        sx={{
          bgcolor: theme.palette.primary.contentbackground,
        }}
        mt={2}
      >
        {expermintData.map((experiment, index) => (
          <StyledAcc
            key={index}
            sx={{
              bgcolor: theme.palette.primary.side,
              color: theme.palette.primary.font,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              onClick={() => onExperimentButton(experiment)}
            >
              <Typography
                fontFamily="Times New Roman"
                fontWeight="semibold"
                fontSize={18}
              >
                {experiment.name}
              </Typography>
            </AccordionSummary>
            <StyledSubAccDetails
              sx={{
                bgcolor: theme.palette.primary.side,
                color: theme.palette.primary.font,
              }}
            >
              <List>
                {experiment.subexperiments.map((subexperiment, subIndex) => (
                  <Accordion key={subIndex}>
                    <StyledSubAcc
                      sx={{
                        bgcolor: theme.palette.primary.side,
                        color: theme.palette.primary.font,
                      }}
                      expandIcon={<ExpandMore />}
                      onClick={() => onSubExperimentButton(subexperiment)}
                    >
                      <Typography>{subexperiment.name}</Typography>
                    </StyledSubAcc>
                    <StyledSubAccDetails>
                      <List
                        sx={{
                          bgcolor: theme.palette.primary.side,
                        }}
                      >
                        {subexperiment.models.map((model, modelIndex) => (
                          <ListItemButton
                            sx={{
                              bgcolor: theme.palette.primary.side,
                              color: theme.palette.primary.font,
                            }}
                            key={modelIndex}
                          >
                            <Typography onClick={() => onModelButton(model)}>
                              {model.name}
                            </Typography>
                          </ListItemButton>
                        ))}
                      </List>
                    </StyledSubAccDetails>
                  </Accordion>
                ))}
              </List>
            </StyledSubAccDetails>
          </StyledAcc>
        ))}
      </Box>
    </>
  );
}

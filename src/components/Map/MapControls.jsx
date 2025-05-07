import React from "react";
import { Fab, Box } from "@mui/material";
import { Add, Home, Remove } from "@mui/icons-material";
import { useLanguage } from "../../context/LanguageContext";

const MapControls = ({ view }) => {
  const { language } = useLanguage();

  const handleZoomIn = () => {
    if (view) {
      const zoom = view.zoom + 1;
      view.goTo({ zoom });
    }
  };

  const handleZoomOut = () => {
    if (view) {
      const zoom = view.zoom - 1;
      view.goTo({ zoom });
    }
  };

  const handleGoHome = () => {
    if (view) {
      view.goTo({
        center: [46.738586, 24.774265],
        zoom: 3,
      });
    }
  };

  const rtl = {
    right: 16,
  };

  const ltr = {
    left: 16,
  };

  return (
    <Box
      sx={{
        ...(language === "ar" ? rtl : ltr),
        position: "absolute",
        bottom: 16,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        zIndex: 1,
      }}
    >
      <Fab
        color="default"
        size="small"
        onClick={handleZoomIn}
        aria-label="Zoom in"
      >
        <Add />
      </Fab>
      <Fab
        color="default"
        size="small"
        onClick={handleZoomOut}
        aria-label="Zoom out"
      >
        <Remove />
      </Fab>
      <Fab
        color="default"
        size="small"
        onClick={handleGoHome}
        aria-label="Go home"
      >
        <Home />
      </Fab>
    </Box>
  );
};

export default MapControls;

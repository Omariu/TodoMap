import React, { useEffect, useRef } from "react";
import { Fab, Box } from "@mui/material";
import { Add, Home, Remove } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const MapControls = ({ view }) => {
  const controlsRef = useRef();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!view || !controlsRef.current) return;

    const position = i18n.language === "en" ? "bottom-right" : "bottom-left";
    view.ui.add(controlsRef.current, position);

    return () => {
      view.ui.remove(controlsRef.current);
    };
  }, [view, i18n.language]);

  const handleZoomIn = () => {
    if (view) {
      view.goTo({ zoom: view.zoom + 1 });
    }
  };

  const handleZoomOut = () => {
    if (view) {
      view.goTo({ zoom: view.zoom - 1 });
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

  return (
    <Box
      ref={controlsRef}
      sx={{
        zIndex: 100,
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        gap: 1,
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

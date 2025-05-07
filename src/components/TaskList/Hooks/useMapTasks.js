// hooks/useMapTasks.js
import { useState, useEffect } from "react";

export const useMapTasks = (view) => {
  const [graphic, setGraphic] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [addingMode, setAddingMode] = useState(false);

  const startAddTaskProcess = () => {
    setAddingMode(true);
    view.container.style.cursor = "crosshair";
  };

  const cancelAddTaskProcess = () => {
    if (!view) return;
    setAddingMode(false);
    if (graphic) {
      view.graphics.remove(graphic);
      setGraphic(null);
    }
    setSelectedLocation(null);
    view.container.style.cursor = "";
    view.graphics.removeAll();
  };

  useEffect(() => {
    if (!view) return;
    view.ui.move("zoom", "bottom-right");
  }, [view]);

  useEffect(() => {
    if (!view) return;

    const handleMapClick = (event) => {
      if (!addingMode) return;

      const point = {
        type: "point",
        longitude: event.mapPoint.longitude,
        latitude: event.mapPoint.latitude,
      };

      const tempGraphic = {
        geometry: point,
        symbol: {
          type: "simple-marker",
          color: "red",
          size: 15,
          outline: null,
        },
      };

      const newGraphic = view.graphics.add(tempGraphic);
      setGraphic(newGraphic);
      setSelectedLocation([event.mapPoint.longitude, event.mapPoint.latitude]);

      setAddingMode(false);
      view.container.style.cursor = "";
    };

    const handler = view.on("click", handleMapClick);

    return () => {
      handler.remove(); // Proper cleanup
    };
  }, [view, addingMode]);

  return {
    graphic,
    selectedLocation,
    addingMode,
    startAddTaskProcess,
    cancelAddTaskProcess,
    setSelectedLocation,
    setGraphic,
  };
};

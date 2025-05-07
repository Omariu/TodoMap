import { useEffect } from "react";
import Graphic from "@arcgis/core/Graphic";

export const useTaskGraphics = (view, tasks) => {
  const createGraphics = (data) => {
    return data
      .filter((task) => !task.deleted)
      .map((task) => {
        const point = {
          type: "point",
          longitude: task.coordinates?.[0],
          latitude: task.coordinates?.[1],
        };
        const symbol = {
          type: "simple-marker",
          color: task.completed ? "green" : "red",
          size: 15,
          outline: null,
        };
        const attributes = {
          id: task.id,
          text: task.text,
          completed: task.completed,
        };
        return new Graphic({
          geometry: point,
          symbol,
          attributes,
          popupTemplate: {
            title: task.text,
            content: `Status: ${
              task.completed ? "Completed" : "Not Completed"
            }`,
          },
        });
      });
  };

  useEffect(() => {
    if (!view || tasks.length === 0) return;

    const tasksLayer = view.map.layers.find(
      (layer) => layer.id === "tasksLayer"
    );

    if (!tasksLayer) return;

    const graphics = createGraphics(tasks);
    view.graphics.removeAll();
    tasksLayer.removeAll();

    tasksLayer.addMany(graphics);
  }, [tasks, view]);
};

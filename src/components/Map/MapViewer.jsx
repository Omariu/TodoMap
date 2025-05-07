import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { useEffect, useRef, useState } from "react";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import TaskManager from "../TaskList/TaskManager.jsx";
import TaskNavbar from "../../components/TaskList/TaskNavbar.jsx";
import AppLayout from "../../layout/AppLayout.jsx";
import MapControls from "./MapControls.jsx";

const MapViewer = () => {
  const mapRef = useRef(null);
  const [view, setView] = useState(null);

  useEffect(() => {
    new MapView({
      container: mapRef.current,
      map: new Map({
        basemap: "dark-gray",
        layers: [
          new GraphicsLayer({
            id: "tasksLayer",
          }),
        ],
      }),
      zoom: 5,
      center: [46.738586, 24.774265],
      ui: {
        components: [],
      },
    }).when((view) => setView(view));
  }, []);

  return (
    <AppLayout
      view={view}
      sidebar={view && <TaskManager view={view} />}
      mapContent={
        <div
          ref={mapRef}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <MapControls view={view} />
        </div>
      }
    />
  );
};

export default MapViewer;

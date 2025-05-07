import { Box, Grid } from "@mui/material";
import TaskNavbar from "../components/TaskList/TaskNavbar";

const AppLayout = ({ view, sidebar, mapContent }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {view && <TaskNavbar view={view} />}
      <Grid container sx={{ height: "calc(100vh - 65px)" }}>
        <Grid size={3}> {sidebar}</Grid>
        <Grid size={9}>{mapContent}</Grid>
      </Grid>
    </Box>
  );
};

export default AppLayout;

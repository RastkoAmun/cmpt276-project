import React, { useContext } from "react";
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { UserContext } from "../index";

const paperStyle = {
  p: 2,
};

const buttonStyle = {
  p: 0,
  bgcolor: "white",
  color: "black",
  border: "1px solid black",
  borderRadius: 1,
};

const MainPage = () => {
  const { globalUser } = useContext(UserContext);

  return (
    <Box>
      <Grid container spacing={5}>
        <Grid item xs={8}></Grid>
        <Grid item xs={4}>
          <Paper sx={paperStyle}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h5"> Profile </Typography>
              <Button variant="contained" sx={buttonStyle}>
                Edit
              </Button>
            </Box>
            <Box sx={{ height: 300 }}>
              <Typography pt={2}>
                Name: {globalUser ? globalUser.username : null}
              </Typography>
              <Typography pt={2}>Height: </Typography>
              <Typography pt={2}>Weight: </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainPage;

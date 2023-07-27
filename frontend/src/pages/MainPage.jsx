import React, { useContext } from "react";
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { UserContext } from "../index";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HydrationTable from "../components/tables/HydrationTable";

const buttonStyle = {
  p: 0,
  bgcolor: "white",
  color: "black",
  border: "1px solid black",
  borderRadius: 1,
};

const MainPage = () => {
  const { globalUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Typography variant="h3">Welcome, {globalUser.username}</Typography>
      <Grid container spacing={5} mt={1}>
        <Grid item xs={8}>
          <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
            fullWidth
          >
            Options
          </Button>
          <Menu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            classes={{
              paper: "menu-paper",
            }}
          >
            <MenuItem onClick={handleClose} disableRipple>
              Food
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              Sleep
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              Exercise
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              Hydration
            </MenuItem>
          </Menu>

          <HydrationTable globalUser={globalUser} />
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
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

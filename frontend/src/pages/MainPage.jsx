import React, { useCallback, useContext, useEffect, useState } from "react";
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
import ExerciseTable from "../components/tables/ExerciseTable";
import FoodTable from "../components/tables/FoodTable";
import SleepTable from "../components/tables/SleepTable";
import { useNavigate, Link } from "react-router-dom";

const buttonStyle = {
  p: 0,
  bgcolor: "white",
  color: "black",
  border: "1px solid black",
  borderRadius: 1,
};

const MainPage = () => {
  const { globalUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentTable, setCurrentTable] = useState("Select Table");
  const [username, setUsername] = useState("");

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (globalUser) {
      setUsername(globalUser.username);
    } else {
      navigate("/login");
    }
  }, [navigate, globalUser]);

  const displayTable = () => {
    switch (currentTable) {
      case "hydration":
        return <HydrationTable globalUser={globalUser} />;
      case "food":
        return <FoodTable globalUser={globalUser} />;
      case "exercise":
        return <ExerciseTable globalUser={globalUser} />;
      case "sleep":
        return <SleepTable globalUser={globalUser} />;
      default:
        return <></>;
    }
  };

  const handleFoodOption = useCallback(() => {
    setCurrentTable("food");
    handleClose();
  }, []);
  const handleHydrationOption = useCallback(() => {
    setCurrentTable("hydration");
    handleClose();
  }, []);
  const handleExerciseOption = useCallback(() => {
    setCurrentTable("exercise");
    handleClose();
  }, []);
  const handleSleepOption = useCallback(() => {
    setCurrentTable("sleep");
    handleClose();
  }, []);

  const capitalizeCharacteristic = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  useEffect(() => {

  }, [globalUser])

  return (
    <Box>
      <Typography variant="h3">Welcome, {username}</Typography>
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
          // sx={{ textTransform: 'capitalize' }}
          >
            {/* {currentTable} */}
            {currentTable !== "Select Table" ? currentTable
              : "Select which table you want to check"}
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
            <MenuItem onClick={handleFoodOption} disableRipple>
              Food
            </MenuItem>
            <MenuItem onClick={handleSleepOption} disableRipple>
              Sleep
            </MenuItem>
            <MenuItem onClick={handleExerciseOption} disableRipple>
              Exercise
            </MenuItem>
            <MenuItem onClick={handleHydrationOption} disableRipple>
              Hydration
            </MenuItem>
          </Menu>
          <Typography variant="body1" textAlign="center" mt={3} mb={1}>
            Displaying your history for {currentTable !== "Select Table" ? currentTable : "specific"} feature
          </Typography>
          {displayTable()}
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h5"> Profile </Typography>
              <Button variant="contained" sx={buttonStyle} component={Link} to='/settings/profile'>
                Edit
              </Button>
            </Box>
            <Box sx={{ height: 300 }}>
              <Typography pt={2}>
                Name: {globalUser ? globalUser.username : null}
              </Typography>
              <Typography pt={2}>Gender: {
                globalUser
                  ? globalUser.userProfile.sex
                    ? capitalizeCharacteristic(globalUser.userProfile.sex)
                    : "N/A"
                  : null}
              </Typography>
              <Typography pt={2}>Age: {globalUser ? globalUser.userProfile.age : null}</Typography>
              <Typography pt={2}>Height: {globalUser ? globalUser.userProfile.height : null} cm</Typography>
              <Typography pt={2}>Weight: {globalUser ? globalUser.userProfile.weight : null} kg</Typography>
              <Typography pt={2}>Activity Level: {
                globalUser
                  ? globalUser.userProfile.activityLevel
                    ? capitalizeCharacteristic(globalUser.userProfile.activityLevel)
                    : "N/A"
                  : null}
              </Typography>
              <Typography pt={2}>Climate: {
                globalUser
                  ? globalUser.userProfile.climate
                    ? capitalizeCharacteristic(globalUser.userProfile.climate)
                    : "N/A"
                  : null}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainPage;

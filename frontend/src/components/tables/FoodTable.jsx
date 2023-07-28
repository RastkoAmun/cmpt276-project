import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const HydrationTable = ({ globalUser }) => {
  const navigate = useNavigate();
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    if (globalUser) {
      axios
        .get(`http://localhost:8080/foodsummary/${globalUser.uid}`)
        .then((results) => {
          setFoodData(results.data);
        });
    } else {
      navigate("/login");
    }
  }, [globalUser, navigate]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Goal</TableCell>
            <TableCell align="left">Consumed Calories</TableCell>
            <TableCell align="left">Achieved</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foodData.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left">{row.targetCalories}</TableCell>
              <TableCell align="left">{row.consumedCalories}</TableCell>
              <TableCell align="left">
                {row.targetCalories <= row.consumedCalories ? "Yes" : "No"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HydrationTable;

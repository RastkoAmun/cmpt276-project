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
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    if (globalUser) {
      axios
        .get(`/exercisesummary/${globalUser.uid}`)
        .then((results) => {
          setExerciseData(results.data);
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
            <TableCell align="left">Calories Burned</TableCell>
            <TableCell align="left">Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exerciseData.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.exerSumDate}</TableCell>
              <TableCell align="left">{row.totalCalBurned}</TableCell>
              <TableCell align="left">{row.totalDuration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HydrationTable;

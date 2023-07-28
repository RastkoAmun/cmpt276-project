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
  const [sleepData, setSleepData] = useState([]);

  useEffect(() => {
    if (globalUser) {
      axios
        .get(`http://localhost:8080/sleep/sleep-data/${globalUser.uid}`)
        .then((results) => {
          setSleepData(results.data);
        });
    } else {
      navigate("/login");
    }
  }, [globalUser, navigate]);

  console.log(sleepData)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Bed Time</TableCell>
            <TableCell align="left">WakeUp Time</TableCell>
            <TableCell align="left">Satisfaction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sleepData.map((row) => (
            <TableRow
              key={row.sleepId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left">{row.bedTime}</TableCell>
              <TableCell align="left">{row.wakeUpTime}</TableCell>
              <TableCell align="left">{row.satisfactionLevel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HydrationTable;

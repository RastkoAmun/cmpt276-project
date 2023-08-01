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
  const [hydrationData, setHydrationData] = useState([]);

  useEffect(() => {
    if (globalUser) {
      axios
        .get(`/data/hydration/${globalUser.uid}`)
        .then((results) => {
          setHydrationData(results.data);
        });
    } else {
      navigate("/login");
    }
  }, [globalUser]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Goal</TableCell>
            <TableCell align="left">Intake</TableCell>
            <TableCell align="left">Achieved</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hydrationData.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.intakeDate}</TableCell>
              <TableCell align="left">{row.goal}</TableCell>
              <TableCell align="left">{row.intake}</TableCell>
              <TableCell align="left">
                {row.goal === row.intake ? "Yes" : "No"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HydrationTable;

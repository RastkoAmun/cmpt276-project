import React, { useState, useEffect } from 'react';
import UserRowView from '../../components/custom/AdminUserView';
import axios from 'axios';
import { TableContainer, Table, TableHead, TableBody, Paper, TableRow, TableCell } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [open, setOpen] = useState(false);

  const fetchData = () => {
    axios.get('http://localhost:8080/admin/view')
      .then(res => {
        setUsers(res.data);
      })
      .catch(e => {
        console.log(e);
      })
  }

  // Hacky solution until Redux
  const incrementRefresh = () => {
    setRefresh(refresh + 1)
  }

  const handleClick = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  )

  useEffect(() => {
    fetchData();
  }, [refresh])

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>UID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <UserRowView key={user.uid} user={user} incrementRefresh={incrementRefresh} handleClick={handleClick} />
            ))}
          </TableBody>
        </Table>
      </TableContainer >
      <Snackbar open={open} autoHideDuration={6000} message="Success!" onClose={handleClose} action={action} />
    </>
  )
}

export default Admin
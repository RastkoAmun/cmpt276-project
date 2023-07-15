import DeleteIcon from '@mui/icons-material/Delete';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import { TableRow, TableCell } from '@mui/material';
import axios from 'axios';

const UserRowView = ({ user, incrementRefresh, handleClick }) => {

  const deleteUser = async () => {
    await axios.delete('http://localhost:8080/admin/delete', {
      data: {
        username: user.username
      }
    }).catch(e => {
      console.log(e);
    })

    incrementRefresh();
  }

  const giveAdminUserRole = async () => {
    await axios.patch('http://localhost:8080/admin/permissions', {
      username: user.username,
      isAdmin: 'true'
    }).catch(e => {
      console.log(e);
    })

    incrementRefresh();
    handleClick();
  }

  const revokeAdminUserRole = async () => {
    await axios.patch('http://localhost:8080/admin/permissions', {
      username: user.username,
      isAdmin: 'false'
    }).catch(e => {
      console.log(e);
    })

    incrementRefresh();
    handleClick();
  }

  return (
    <TableRow>
      <TableCell>{user.uid}</TableCell>
      <TableCell>{user.username || "null"}</TableCell>
      <TableCell>
        {
          !user.isAdmin
            ? <AddModeratorIcon onClick={giveAdminUserRole} />
            : <RemoveModeratorIcon onClick={revokeAdminUserRole} />
        }
        <DeleteIcon onClick={deleteUser} sx={{ ml: '0.5rem' }} />
      </TableCell>
    </TableRow >
  );
}

export default UserRowView
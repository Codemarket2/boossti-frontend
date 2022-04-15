import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Checkbox, FormControlLabel, Switch } from '@mui/material';

interface IPermission {
  name: string;
  create: boolean;
  view: boolean;
  update: boolean;
  remove: boolean;
}

function createData(
  name: string,
  create: boolean,
  view: boolean,
  update: boolean,
  remove: boolean,
) {
  return { name, create, view, update, remove };
}

const sampleData = [
  {
    name: 'superadmin',
    create: true,
    view: true,
    update: true,
    remove: true,
  },
  {
    name: 'admin',
    create: true,
    view: true,
    update: true,
    remove: false,
  },
  {
    name: 'manager',
    create: true,
    view: true,
    update: false,
    remove: false,
  },
  {
    name: 'developer',
    create: true,
    view: true,
    update: true,
    remove: false,
  },
  {
    name: 'user',
    create: false,
    view: true,
    update: false,
    remove: false,
  },
];

const rows = [
  createData('superadmin', true, true, true, true),
  createData('admin', true, true, false, false),
  createData('manager', true, false, true, false),
  createData('developer', false, true, false, false),
  createData('user', false, true, false, false),
];
export default function Permissions() {
  const [permissions, setPermissions] = useState<IPermission[]>([]);

  // if (error || !section) {
  //   return <ErrorLoading error={error} />;
  // }
  React.useEffect(() => {
    setPermissions(sampleData);
  }, [sampleData]);

  const handleChecked = (e) => {
    const { id } = e.target;
    const [action, index] = id.split('-');
    const temp: IPermission[] = permissions?.map((permission, i) =>
      i.toString() === index ? { ...permission, [`${action}`]: e.target.checked } : permission,
    );
    setPermissions(temp);
  };
  return (
    <>
      <Paper variant="outlined" className="pb-5">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="permission table">
            <TableHead>
              <TableRow hover>
                <TableCell>Users Group</TableCell>
                <TableCell align="left">Create</TableCell>
                <TableCell align="left">View</TableCell>
                <TableCell align="left">Update</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissions?.map((row, i) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">
                    <Checkbox
                      id={`create-${i}`}
                      onChange={handleChecked}
                      checked={row.create}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Checkbox
                      id={`view-${i}`}
                      onChange={handleChecked}
                      checked={row.view}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Checkbox
                      id={`update-${i}`}
                      onChange={handleChecked}
                      checked={row.update}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Checkbox
                      id={`remove-${i}`}
                      onChange={handleChecked}
                      checked={row.remove}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';
import { useGetResponses } from '@frontend/shared/hooks/response';
import ErrorLoading from '../common/ErrorLoading';

interface IPermission {
  name: string;
  create: boolean;
  view: boolean;
  update: boolean;
  remove: boolean;
  createAll: boolean;
  viewAll: boolean;
  updateAll: boolean;
  removeAll: boolean;
}
interface IPermissionProps {
  formId: string;
  form: any;
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

export default function Permissions(props: IPermissionProps) {
  const { form, formId } = props;
  const [permissions, setPermissions] = useState<IPermission[]>([]);
  const { data, error, loading, state, setState, refetch } = useGetResponses(formId);

  if (error) return <ErrorLoading error={error} />;

  useEffect(() => {
    const responses = data?.getResponses?.data;
    const fieldId = form?.settings?.actions[0]?.cognitoGroupName;
    const tempPermissions: IPermission[] = responses?.map((response) => {
      const n = response?.values?.filter((e) => e.field === fieldId)[0]?.value;
      return {
        name: n,
        create: true,
        view: true,
        update: true,
        remove: true,
        createAll: true,
        viewAll: true,
        updateAll: true,
        removeAll: true,
      };
    });
    setPermissions(tempPermissions);
  }, [data]);

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
                <TableCell align="left">Users Group</TableCell>
                <TableCell align="center">Create</TableCell>
                <TableCell align="center">View</TableCell>
                <TableCell align="center">Update</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissions?.map((row, i) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell padding="checkbox" align="center">
                    <Accordion
                      sx={{
                        minWidth: 200,
                        margin: 'auto',
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Checkbox
                          id={`create-${i}`}
                          onChange={handleChecked}
                          checked={row.create}
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                        />
                        <Typography align="center">Current</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Checkbox
                          id={`createAll-${i}`}
                          onChange={handleChecked}
                          checked={row.createAll}
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                        />
                        <Typography align="center">All</Typography>
                      </AccordionDetails>
                    </Accordion>
                  </TableCell>
                  <TableCell padding="checkbox" align="center">
                    <Accordion
                      sx={{
                        minWidth: 200,
                        margin: 'auto',
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Checkbox
                          id={`view-${i}`}
                          onChange={handleChecked}
                          checked={row.view}
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                        />
                        <Typography align="center">Current</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Checkbox
                          id={`viewAll-${i}`}
                          onChange={handleChecked}
                          checked={row.viewAll}
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                        />
                        <Typography align="center">All</Typography>
                      </AccordionDetails>
                    </Accordion>
                  </TableCell>
                  <TableCell padding="checkbox" align="center">
                    <Accordion
                      sx={{
                        minWidth: 200,
                        margin: 'auto',
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Checkbox
                          id={`update-${i}`}
                          onChange={handleChecked}
                          checked={row.update}
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                        />
                        <Typography align="center">Current</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Checkbox
                          id={`updateAll-${i}`}
                          onChange={handleChecked}
                          checked={row.updateAll}
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                        />
                        <Typography align="center">All</Typography>
                      </AccordionDetails>
                    </Accordion>
                  </TableCell>
                  <TableCell padding="checkbox" align="center">
                    <Accordion
                      sx={{
                        minWidth: 200,
                        margin: 'auto',
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Checkbox
                          id={`remove-${i}`}
                          onChange={handleChecked}
                          checked={row.remove}
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                        />
                        <Typography align="center">Current</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Checkbox
                          id={`removeAll-${i}`}
                          onChange={handleChecked}
                          checked={row.removeAll}
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                        />
                        <Typography align="center">All</Typography>
                      </AccordionDetails>
                    </Accordion>
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

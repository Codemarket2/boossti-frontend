import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import { useGetPagesByTemplate, useCreatePage } from '@frontend/shared/hooks/template';

export default function BasicTable({ fields, types }) {
  const { data, loading, error, state, setState } = useGetPagesByTemplate({ types });
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table aria-label="simple table" style={{ overflow: 'scroll' }}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Description</TableCell>
            {fields.map((field, i) => (
              <TableCell key={i} align="right">
                {field.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.getPages &&
            data.getPages.data.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {(error || !data || !data.getPages) && (
        <>
          <Skeleton height={70} />
          <Skeleton height={70} />
          <Skeleton height={70} />
        </>
      )}
    </TableContainer>
  );
}

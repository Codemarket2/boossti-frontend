import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import { useGetPagesByTemplate } from '@frontend/shared/hooks/template';

export default function PagesGrid({ fields, templateId }: any) {
  const { data, loading, error, state, setState } = useGetPagesByTemplate(templateId);
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table aria-label="simple table" style={{ overflow: 'scroll' }}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Description</TableCell>
            {fields?.map((field, i) => (
              <TableCell key={i} align="right">
                {field.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.getPages?.data?.map((row) => (
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

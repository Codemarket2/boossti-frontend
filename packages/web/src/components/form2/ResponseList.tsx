import { useRouter } from 'next/router';
import { useState } from 'react';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Delete from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import { useGetResponses, useDeleteResponse } from '@frontend/shared/hooks/response';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';

interface IProps {
  form: any;
  hideDelete?: boolean;
}

export default function ResponseList({ form, hideDelete = false }: IProps): any {
  const { data, error, state, setState } = useGetResponses(form._id);
  const { handleDelete, deleteLoading } = useDeleteResponse({ onAlert });
  const router = useRouter();

  let design = null;
  if (form?.settings?.design?.value) {
    design = form?.settings?.design;
  }

  return (
    <>
      <Backdrop open={deleteLoading} />
      <TableContainer component={Paper} variant="outlined">
        <TablePagination
          component="div"
          rowsPerPageOptions={[10, 25, 50]}
          count={data?.getResponses?.count || 0}
          rowsPerPage={state.limit}
          page={state.page - 1}
          onChangePage={(e, newPage) => setState({ ...state, page: newPage + 1 })}
          onChangeRowsPerPage={(e) => setState({ ...state, limit: parseInt(e.target.value) })}
        />
        {error || !data || !data.getResponses ? (
          <Paper variant="outlined" className="p-5">
            <ErrorLoading error={error} />
          </Paper>
        ) : (
          <Table
            aria-label="response table"
            size="small"
            style={{ overflow: 'scroll', width: '100%' }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Action</TableCell>
                {form?.fields?.map((field, i) => (
                  <TableCell key={i}>{field.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.getResponses?.data?.map((response) => (
                <TableRow key={response._id}>
                  <TableCell>
                    {!hideDelete && (
                      <Tooltip title="Delete response">
                        <IconButton
                          onClick={() => {
                            const anwser = confirm('Are you sure you want to delete this response');
                            if (anwser) {
                              handleDelete(response._id, form._id);
                            }
                          }}
                          edge="start"
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Open Response">
                      <IconButton
                        onClick={() => {
                          router.push(`/response/${response._id}`);
                        }}
                        edge="start"
                      >
                        <LaunchIcon />
                      </IconButton>
                    </Tooltip>
                    {`${moment(response.createdAt).format('l')} ${moment(response.createdAt).format(
                      'LT',
                    )}`}
                  </TableCell>
                  {form?.fields?.map((field, i) => (
                    <TableCell key={i}>
                      <ShowValue
                        field={field}
                        value={response?.values?.filter((v) => v.field === field._id)[0]}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </>
  );
}

export const ShowValue = ({ field, value }: any) => {
  switch (field.fieldType) {
    case 'text':
    case 'textarea':
    case 'url':
    case 'select':
    case 'email':
    case 'password':
      return <>{value?.value}</>;
    case 'date':
      return <>{value?.valueDate && moment(value?.valueDate).format('L')}</>;
    case 'dateTime':
      return <>{value?.valueDate && moment(value?.valueDate).format('lll')}</>;
    case 'number':
    case 'phoneNumber':
      return <>{value?.valueNumber}</>;
    case 'checkbox':
      return <>{value?.valueBoolean?.toString()}</>;
    case 'image':
      return (
        <>
          {value?.media?.map((image, i) => (
            <Avatar key={i} alt={`image-${i + 1}`} src={image?.url} />
          ))}
        </>
      );
    default:
      return <>{value?.value}</>;
  }
};

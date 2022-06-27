import { useState } from 'react';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { getUserName } from '@frontend/shared/hooks/user/getUserForm';
import ErrorLoading from '../common/ErrorLoading';
import DisplayValue from '../form2/DisplayValue';
import Authorization from '../common/Authorization';
import DeleteButton from '../common/DeleteButton';
import EditResponseDrawer from './EditResponseDrawer';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { Search } from '@mui/icons-material';
import Link from 'next/link';

interface IProps {
  search: string;
  onSearchChange: (search: string) => void;
  form: any;
  loading: boolean;
  count: number;
  responses: any[];
  onDelete: (_id: string) => any;
  isTemplateInstance: string;
  error: any;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (newLimit: number) => void;
}

export default function ResponseTable({
  loading,
  search,
  form,
  onSearchChange,
  count = 0,
  responses,
  onDelete,
  isTemplateInstance,
  error,
  page,
  limit,
  onPageChange,
  onLimitChange,
}: IProps) {
  const [selectedResponse, setSelectedResponse] = useState(null);
  const userForm = useSelector(({ setting }: any) => setting.userForm);
  return (
    <div>
      <TableContainer component={Paper} variant="outlined">
        <div className="d-flex justify-content-between align-items-center">
          <TextField
            className="ml-2"
            size="small"
            variant="outlined"
            label="Search"
            InputProps={{
              endAdornment:
                search && loading ? <CircularProgress color="inherit" size={20} /> : <Search />,
            }}
            value={search}
            onChange={({ target: { value } }) => onSearchChange(value)}
          />
          <TablePagination
            component="div"
            rowsPerPageOptions={[10, 25, 50]}
            count={count}
            rowsPerPage={limit}
            page={page - 1}
            onPageChange={(e, newPage) => onPageChange(newPage + 1)}
            onRowsPerPageChange={({ target }) => onLimitChange(parseInt(target.value))}
          />
        </div>
        {error || !responses ? (
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
                <TableCell>ID</TableCell>
                {form?.fields?.map((field, i) => (
                  <TableCell key={i}>{field.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {responses?.map((response) => (
                <TableRow key={response._id} hover>
                  <TableCell>
                    <div className="d-flex align-items-center">
                      <div className="d-flex">
                        <Authorization _id={[response?.createdBy?._id]} allowAdmin returnNull>
                          <DeleteButton
                            tooltip="Delete Response"
                            onClick={async () => onDelete(response._id)}
                            edge="start"
                          />
                          <Tooltip title="Edit Response">
                            <IconButton onClick={() => setSelectedResponse(response)} edge="start">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          {selectedResponse?._id === response?._id && (
                            <>
                              <EditResponseDrawer
                                open
                                form={form}
                                response={selectedResponse}
                                onClose={() => setSelectedResponse(null)}
                              />
                            </>
                          )}
                        </Authorization>
                      </div>
                      <span>
                        <Link href={`/forms/users/response/${response?.createdBy?.count}`}>
                          <a>
                            <u>{getUserName(userForm, response?.createdBy)}</u>
                          </a>
                        </Link>
                        <br />
                        <span>{`${moment(response.createdAt).format('l')} ${moment(
                          response.createdAt,
                        ).format('LT')}`}</span>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={
                        isTemplateInstance
                          ? `/${isTemplateInstance}/${response.count}`
                          : `/forms/${form.slug}/response/${response.count}`
                      }
                    >
                      <a>
                        <Tooltip title="Open Response">
                          <u>{response?.count}</u>
                        </Tooltip>
                      </a>
                    </Link>
                  </TableCell>
                  {form?.fields?.map((field, i) => (
                    <TableCell key={i}>
                      {response?.values
                        ?.filter((v) => v.field === field._id)
                        ?.map((value) => (
                          <div key={value?._id}>
                            <DisplayValue field={field} value={value} />
                          </div>
                        ))}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
}

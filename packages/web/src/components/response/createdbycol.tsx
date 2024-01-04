import React from 'react';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Search from '@mui/icons-material/Search';
import Link from 'next/link';
import { getUserName } from '@frontend/shared/hooks/user/getUserForm';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { IField } from '@frontend/shared/types/form';
import ErrorLoading from '../common/ErrorLoading';
import FieldTitlemap from './Fieldtitlemap';
import WorkflowButtons from './workflow/WorkflowButtons';

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
  onClickResponse?: (response, form) => void;
}

export default function CreatedbyCol({
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
  onClickResponse,
}: IProps) {
  const userForm = useSelector(({ setting }: any) => setting.userForm);
  const router = useRouter();
  // console.log(form, 'form data');
  const onDragStart = (e, response) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(response));
  };

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
            onRowsPerPageChange={({ target }) => onLimitChange(parseInt(target.value, 10))}
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
                <TableCell>Form</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {responses?.map((response) => (
                <TableRow
                  key={response._id}
                  hover
                  draggable
                  onDragStart={(e) => onDragStart(e, response)}
                >
                  <TableCell key="1">
                    <FieldTitlemap
                      field={{
                        _id: '6593d4dcd464f3401e28fdf4',
                        label: 'Webpage',
                        fieldType: 'webpage',
                        options: {
                          physicalQuantity: '',
                          unit: '',
                          default: true,
                          selectItem: false,
                          dependentRelationship: false,
                          twoWayRelationship: false,
                          relationLabel: '',
                          relationFieldId: '',
                          showOptionCreatedByUser: false,
                          showOptionCreatedOnTemplate: false,
                          required: true,
                          multipleValues: false,
                          unique: true,
                          caseInsensitiveUnique: false,
                          staticText: '',
                          formField: '',
                          showCommentBox: false,
                          showStarRating: false,
                          notEditable: false,
                          systemCalculatedAndSaved: false,
                          systemValue: null,
                          systemCalculatedAndView: false,
                          formula: null,
                          showAsCheckbox: false,
                          selectAllowCreate: false,
                          selectOptions: [''],
                          conditions: [],
                          defaultValue: null,
                          hidden: false,
                          hiddenConditions: null,
                          style: {
                            backgroundColor: '#ffffff',
                          },
                          uniqueBetweenMultipleValues: false,
                          uniqueSubField: false,
                          disabled: false,
                          disabledConditions: [],
                          showAsAddButton: false,
                        },
                      }}
                      response={response}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
}

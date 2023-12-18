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
import { getUserName } from '@frontend/shared/hooks/user/getUserForm';
import ErrorLoading from '../common/ErrorLoading';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Search from '@mui/icons-material/Search';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IField } from '@frontend/shared/types/form';
import WorkflowButtons from './workflow/WorkflowButtons';
import FieldValuesMap from './FieldValuesMap';
import { useGetForm } from '@frontend/shared/hooks/form';
import ResponsiveGridLayout, { WidthProvider, Responsive } from 'react-grid-layout';
const initialState = {
  layouts: {},
  styles: {},
  selectedField: null,
  selectedElement: null,
  layoutEdit: true,
  editMode: false,
};

const layout = [
  { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
  { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  { i: 'c', x: 4, y: 0, w: 1, h: 2 },
];
const ResponsiveReactGridLayout = WidthProvider(Responsive);

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
  onClickResponse,
}: IProps) {
  const userForm = useSelector(({ setting }: any) => setting.userForm);
  const router = useRouter();

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
                <TableCell>CreatedBy</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Workflow</TableCell>
                {form?.fields?.map((field, i) => (
                  <TableCell key={i}>{field.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {responses?.map((response) => (
                <ResponsiveGridLayout
                  // breakpoints = {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}
                  className="layout"
                  layout={layout}
                  cols={100}
                  rowHeight={30}
                  width={1200}
                  allowOverlap={true}
                  isDraggable={true}
                  preventCollosion={false}
                >
                  <div key="c" style={{ backgroundColor: 'violet' }}>
                    <TableRow key={response._id} hover>
                      <TableCell>
                        <span>
                          <Link href={`/form/users/response/${response?.createdBy?.count}`}>
                            <a>
                              <u>{getUserName(userForm, response?.createdBy)}</u>
                            </a>
                          </Link>
                          <br />
                          <span>{`${moment(response.createdAt).format('l')} ${moment(
                            response.createdAt,
                          ).format('LT')}`}</span>
                        </span>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Open Response">
                          <span>
                            {onClickResponse ? (
                              <span
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  if (onClickResponse) {
                                    onClickResponse(response, form);
                                  } else {
                                    router.push(`/form/${form.slug}/response/${response.count}`);
                                  }
                                }}
                              >
                                <u>{response?.count}</u>
                              </span>
                            ) : (
                              <Link href={`/form/${form.slug}/response/${response.count}`}>
                                <a>{response?.count}</a>
                              </Link>
                            )}
                          </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <DisplayWorkflowName workflowId={response?.workflowId} />
                      </TableCell>
                      {form?.fields?.map((field: IField, i) => (
                        <TableCell key={i}>
                          <FieldValuesMap field={field} response={response} />
                        </TableCell>
                      ))}
                      {response?.workflowId && !response?.parentResponseId && (
                        <WorkflowButtons response={response} tableCellView />
                      )}
                    </TableRow>
                  </div>
                </ResponsiveGridLayout>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
}

const DisplayWorkflowName = ({ workflowId }: { workflowId: string }) => {
  const { data } = useGetForm(workflowId);
  if (data?.getForm?.name) {
    return (
      <>
        <Link href={`/workflow/${data?.getForm?.slug}`}>{data?.getForm?.name}</Link>
      </>
    );
  }
  return null;
};

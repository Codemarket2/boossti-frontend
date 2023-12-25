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
  // console.log(responses,"Responses")
  return (
    <div>
      {responses?.map((response) => (
        <div
          key={response._id}
          // key={i}
          className="draggable-form-item"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify(response));
          }}
        >
          <div>
            <span>
              <Link href={`/form/users/response/${response?.createdBy?.count}`}>
                <a>
                  <u>{getUserName(userForm, response?.createdBy)}</u>
                </a>
              </Link>
              <br />
              <span>{`${moment(response.createdAt).format('l')} ${moment(response.createdAt).format(
                'LT',
              )}`}</span>
            </span>
          </div>
        </div>
      ))}
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

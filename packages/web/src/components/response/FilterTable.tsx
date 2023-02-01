import { DataGrid, GridColDef, GridToolbar  } from '@mui/x-data-grid';
import moment from 'moment';
import { getUserName } from '@frontend/shared/hooks/user/getUserForm';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useGetForm } from '@frontend/shared/hooks/form';
import FieldValuesMap from './FieldValuesMap';

interface filterProps {
    form: any;
    responses: any[];
}

const FilterTable = ({form, responses}: filterProps) => {

    const userForm = useSelector(({ setting }: any) => setting.userForm);

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

    const fieldValuesArray:GridColDef[] = form.fields.map((field) => {
        return {
            field: field?.label,
            headerName: field?.label,
            width: 130,
            renderCell: (params) => (
                <FieldValuesMap field={field} response={params.row} />
            )
        }
    })
    const columns:GridColDef[] = [
      {
        field: 'createdBy',
        headerName: 'CreatedBy',
        width: 130,
        renderCell: (params) => (
            <>
                <span>
                    <Link href={`/form/users/response/${params.row?.createdBy?.count}`}>
                        <a>
                        <u>{getUserName(userForm, params.row?.createdBy)}</u>
                        </a>
                    </Link>
                <br />
                <span>{`${moment(params.row?.createdAt).format('l')} ${moment(
                    params.row?.createdAt,
                ).format('LT')}`}</span>
                </span>
            </>
        ),
        valueGetter: (params) => `${getUserName(userForm, params.row?.createdBy)} ${moment(params.row?.createdAt).format('l')} ${moment(
            params.row?.createdAt,
        ).format('LT')}`
      },
      {
        field: 'id',
        headerName: 'ID',
        width: 50,
        renderCell: (params) => (
            <Link href={`/form/${form.slug}/response/${params.row?.count}`}>
                <a>{params.row?.count}</a>
            </Link>
        ),
        valueGetter: (params) => `${params.row?.count}`
      },
      {
        field: 'workflow',
        headerName: 'Workflow',
        width: 130,
        renderCell: (params) => (
            <DisplayWorkflowName workflowId={params.row?.workflowId} />
        )
      },
      ...fieldValuesArray
    ]

    const rows = responses?.map((res) => {
        return {
            id: res._id,
            ...res
        }
    })

    return (
        <>
            <DataGrid style={{height: 600, width: '100%'}} rowHeight={200} rows={rows} columns={columns} components={{ Toolbar: GridToolbar }}/>
        </>
    )
}

export default FilterTable
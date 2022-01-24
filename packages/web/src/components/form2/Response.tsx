import { useState } from 'react';
import { useGetForm } from '@frontend/shared/hooks/form';
import { useGetResponse } from '@frontend/shared/hooks/response';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import EditResponseDrawer from './EditResponseDrawer';
import Breadcrumbs from '../common/Breadcrumbs';
import DisplayValue from './DisplayValue';
import Authorization from '../common/Authorization';
import CommentLikeShare from '../common/commentLikeShare/CommentLikeShare';
import ErrorLoading from '../common/ErrorLoading';

interface IProps {
  responseId: string;
  hideBreadcrumbs?: boolean;
}

export default function Response({ responseId, hideBreadcrumbs }: IProps) {
  const { data, error } = useGetResponse(responseId);

  return error || !data?.getResponse ? (
    <ErrorLoading error={error} />
  ) : (
    <ResponseChild response={data?.getResponse} hideBreadcrumbs={hideBreadcrumbs} />
  );
}

interface IProps2 {
  response: any;
  hideBreadcrumbs?: boolean;
}

export function ResponseChild({ response, hideBreadcrumbs }: IProps2) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { data: formData, error: formError } = useGetForm(response?.formId);

  if (formError || !formData?.getForm) {
    return <ErrorLoading error={formError} />;
  }

  const form = formData?.getForm;

  return (
    <>
      {!hideBreadcrumbs && (
        <div className="d-flex justify-content-between align-items-center">
          <Breadcrumbs>
            <Link href="/forms">Forms</Link>
            <Link href={`/forms/${form?._id}`}>{form?.name}</Link>
            <Typography>Response</Typography>
          </Breadcrumbs>
          <Authorization
            returnNull
            _id={[response?.createdBy?._id, form?.createdBy?._id]}
            allowAdmin
          >
            <div>
              <Button
                onClick={() => setOpenDrawer(true)}
                startIcon={<EditIcon />}
                variant="contained"
                size="small"
                color="primary"
              >
                Edit
              </Button>
              {openDrawer && (
                <EditResponseDrawer
                  form={form}
                  response={response}
                  open={openDrawer}
                  onClose={() => {
                    setOpenDrawer(false);
                  }}
                />
              )}
            </div>
          </Authorization>
        </div>
      )}
      <Paper variant="outlined">
        <div className="p-2">
          <ListItemText
            primary={`Response submitted by ${
              response?.createdBy ? response?.createdBy?.name : 'Unauthorised user'
            }`}
            secondary={`${moment(response?.createdAt).format('l')} ${moment(
              response?.createdAt,
            ).format('LT')}`}
          />
          {form?.fields?.map((field, index) => {
            return (
              <div key={field?._id}>
                <Typography>
                  {index + 1}) {field?.label}
                </Typography>
                {response?.values
                  ?.filter((v) => v.field === field._id)
                  .map((value) => (
                    <div key={value?._id}>
                      <DisplayValue field={field} value={value} />
                      <CommentLikeShare parentId={value?._id} />
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      </Paper>
    </>
  );
}

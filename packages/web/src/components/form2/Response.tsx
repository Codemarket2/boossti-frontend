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
import NotFound from '../common/NotFound';
import CommentLikeShare from '../common/commentLikeShare/CommentLikeShare';
import ErrorLoading from '../common/ErrorLoading';

interface IProps {
  responseId: string;
  hideBreadcrumbs?: boolean;
  hideNavigation?: boolean;
  hideAuthor?: boolean;
}

export default function Response({
  responseId,
  hideBreadcrumbs,
  hideNavigation,
  hideAuthor,
}: IProps) {
  const { data, error } = useGetResponse(responseId);

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getResponse) {
    return <NotFound />;
  }

  return (
    <ResponseChild2
      response={data?.getResponse}
      formId={data?.getResponse?.formId}
      hideBreadcrumbs={hideBreadcrumbs}
      hideNavigation={hideNavigation}
      hideAuthor={hideAuthor}
    />
  );
}

interface IProps2 {
  formId: any;
  response: any;
  hideBreadcrumbs?: boolean;
  hideNavigation?: boolean;
  hideAuthor?: boolean;
}

export function ResponseChild2({
  formId,
  response,
  hideBreadcrumbs,
  hideNavigation,
  hideAuthor,
}: IProps2) {
  const { data, error, loading } = useGetForm(formId);

  if (error || !data || loading) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getForm) {
    return <NotFound />;
  }

  return (
    <ResponseChild3
      response={response}
      form={data?.getForm}
      hideBreadcrumbs={hideBreadcrumbs}
      hideNavigation={hideNavigation}
      hideAuthor={hideAuthor}
    />
  );
}

interface IProps3 {
  form: any;
  response: any;
  hideBreadcrumbs?: boolean;
  hideNavigation?: boolean;
  hideAuthor?: boolean;
}

export function ResponseChild3({
  form,
  response,
  hideBreadcrumbs,
  hideNavigation,
  hideAuthor,
}: IProps3) {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      {!hideBreadcrumbs && (
        <div className="d-flex justify-content-between align-items-center">
          {!hideNavigation && (
            <Breadcrumbs>
              <Link href="/forms">Forms</Link>
              <Link href={`/forms/${form.slug}`}>{form?.name}</Link>
              <Typography>Response</Typography>
            </Breadcrumbs>
          )}
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
      <Paper variant="outlined" style={hideAuthor ? { border: 'none' } : {}}>
        <div className="p-2">
          {!hideAuthor && (
            <ListItemText
              primary={`Response submitted by ${
                response?.createdBy ? response?.createdBy?.name : 'Unauthorised user'
              }`}
              secondary={`${moment(response?.createdAt).format('l')} ${moment(
                response?.createdAt,
              ).format('LT')}`}
            />
          )}
          {form?.fields?.map((field, index) => {
            return (
              <div key={field?._id}>
                <Typography>{field?.label}</Typography>
                {response?.values
                  ?.filter((v) => v.field === field._id)
                  .map((value) => (
                    <div key={value?._id}>
                      <DisplayValue field={field} value={value} />
                      {JSON.parse(field?.options)?.showCommentBox && (
                        <CommentLikeShare parentId={value?._id} />
                      )}
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

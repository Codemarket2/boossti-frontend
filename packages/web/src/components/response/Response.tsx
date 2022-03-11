import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useGetForm } from '@frontend/shared/hooks/form';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useDeleteResponse, useGetResponse } from '@frontend/shared/hooks/response';
import { getListItem } from '@frontend/shared/hooks/list/listItems';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import { useUpdateSection } from '@frontend/shared/hooks/section';
import EditIcon from '@material-ui/icons/Edit';
import { useAuthorization } from '@frontend/shared/hooks/auth';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import EditResponseDrawer from './EditResponseDrawer';
import Breadcrumbs from '../common/Breadcrumbs';
import DisplayValue from '../form2/DisplayValue';
import NotFound from '../common/NotFound';
import CommentLikeShare from '../common/commentLikeShare/CommentLikeShare';
import ErrorLoading from '../common/ErrorLoading';
import { QRButton } from '../qrcode/QRButton';
import ResponseSections from './ResponseSection';
import FormFieldsValue from '../form2/FormFieldsValue';
import { onAlert } from '../../utils/alert';
import CRUDMenu from '../common/CRUDMenu';
import BackdropComponent from '../common/Backdrop';
import EditMode from '../common/EditMode';

interface IProps {
  responseId: string;
  hideBreadcrumbs?: boolean;
  hideNavigation?: boolean;
  hideAuthor?: boolean;
  hideWorkflow?: boolean;
}

export default function Response({
  responseId,
  hideBreadcrumbs,
  hideNavigation,
  hideAuthor,
  hideWorkflow,
}: IProps) {
  const { data, error } = useGetResponse(responseId);

  if (error || !data?.getResponse) {
    return <ErrorLoading error={error} />;
  }

  // if (!data?.getResponse) {
  //   return <NotFound />;
  // }

  return (
    <ResponseChild2
      response={data?.getResponse}
      formId={data?.getResponse?.formId}
      hideBreadcrumbs={hideBreadcrumbs}
      hideNavigation={hideNavigation}
      hideAuthor={hideAuthor}
      hideWorkflow={hideWorkflow}
    />
  );
}

interface IProps2 {
  formId: any;
  response: any;
  hideBreadcrumbs?: boolean;
  hideNavigation?: boolean;
  hideAuthor?: boolean;
  hideWorkflow?: boolean;
}

export function ResponseChild2({
  formId,
  response,
  hideBreadcrumbs,
  hideNavigation,
  hideAuthor,
  hideWorkflow,
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
      hideWorkflow={hideWorkflow}
    />
  );
}

interface IProps3 {
  form: any;
  response: any;
  hideBreadcrumbs?: boolean;
  hideNavigation?: boolean;
  hideAuthor?: boolean;
  hideWorkflow?: boolean;
}

export function ResponseChild3({
  form,
  response,
  hideBreadcrumbs,
  hideNavigation,
  hideAuthor,
  hideWorkflow,
}: IProps3) {
  const [state, setState] = useState({ showMenu: null, edit: false, showBackdrop: false });
  const { handleDelete, deleteLoading } = useDeleteResponse({ onAlert });
  const authorized = useAuthorization([response?.createdBy?._id, form?.createdBy?._id], true);
  const authorized2 = useAuthorization([form?.createdBy?._id], true);
  const { section, onSectionChange, handleUpdateSection } = useUpdateSection({
    onAlert,
    _id: JSON.parse(response?.options)?.customSectionId || form._id,
  });
  const { editMode } = useSelector(({ setting }: any) => setting);
  const router = useRouter();

  const redirectToPage = async (_id) => {
    setState({ ...state, showBackdrop: true });
    const page = await getListItem(_id);
    if (page?.data?.getListItem?.types[0]?.slug && page?.data?.getListItem?.slug) {
      router.push(`/${page?.data?.getListItem?.types[0]?.slug}/${page?.data?.getListItem?.slug}`);
    } else {
      setState({ ...state, showBackdrop: false });
    }
  };

  const hideLeftNavigation = !(hideAuthor || hideNavigation || hideBreadcrumbs);

  return (
    <>
      <BackdropComponent open={deleteLoading || state.showBackdrop} />
      {!hideBreadcrumbs ? (
        <div className="d-flex justify-content-between align-items-center">
          {!hideNavigation && (
            <Breadcrumbs>
              <Link href="/forms">Forms</Link>
              <Link href={`/forms/${form.slug}`}>{form?.name}</Link>
              <Typography>Response</Typography>
            </Breadcrumbs>
          )}
          <div className="d-flex align-items-center">
            {!hideNavigation && (
              <>
                <EditMode />
                <QRButton />
              </>
            )}
            {authorized && (
              <Tooltip title="Edit Response">
                <IconButton onClick={(e) => setState({ ...state, showMenu: e.currentTarget })}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </div>
      ) : (
        authorized && (
          <Tooltip title="Edit Response">
            <IconButton onClick={(e) => setState({ ...state, showMenu: e.currentTarget })}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        )
      )}
      {authorized && (
        <>
          <CRUDMenu
            show={state.showMenu}
            onEdit={() => setState({ ...state, showMenu: null, edit: true })}
            onDelete={() => {
              setState({ ...state, showMenu: null });
              handleDelete(response?._id, form?._id);
            }}
            onClose={() => setState({ ...state, showMenu: null })}
          />
          {state.edit && (
            <>
              <EditResponseDrawer
                form={form}
                response={response}
                open={state.edit}
                onClose={() => {
                  setState({ ...state, edit: false });
                }}
              />
            </>
          )}
        </>
      )}
      <Grid container spacing={1}>
        {hideLeftNavigation && (
          <Grid item xs={3}>
            <div
              className={`d-flex ${
                section?.options?.belowResponse ? 'flex-column-reverse' : 'flex-column'
              }`}
            >
              <ResponseSections
                authorized={false}
                section={section}
                onSectionChange={(sec) => {}}
              />
              <Paper variant="outlined">
                <List dense component="nav">
                  <ListItem button>
                    <ListItemText primary="Form Fields" />
                  </ListItem>
                  {form?.fields?.map((field) => (
                    <ListItem button key={field._id}>
                      <ListItemText primary={field?.label} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </div>
          </Grid>
        )}
        <Grid item xs={!hideLeftNavigation ? 12 : 9}>
          {response?.responseId && section?.options?.showRelation && (
            <Response responseId={response?.responseId} hideBreadcrumbs hideWorkflow />
          )}
          <Paper
            variant="outlined"
            style={!hideLeftNavigation ? { border: 'none' } : {}}
            className={`d-flex ${
              section?.options?.belowResponse ? 'flex-column-reverse' : 'flex-column'
            }`}
          >
            {!hideWorkflow && section?.fields?.length > 0 && (
              <FormFieldsValue
                authorized={authorized2}
                disableGrid={!editMode}
                fields={section?.fields}
                values={section?.values}
                layouts={section?.options?.layouts || {}}
                handleValueChange={handleUpdateSection}
                onLayoutChange={(layouts) =>
                  onSectionChange({
                    options: { ...section?.options, layouts },
                  })
                }
                responseId={response?._id}
              />
            )}
            <div className="p-2">
              {!hideAuthor && (
                <>
                  <Typography variant="body1">
                    {`by ${response?.createdBy ? response?.createdBy?.name : 'Unauthorised user'} `}
                    {response?.parentId?.title && (
                      <Typography
                        color="primary"
                        display="inline"
                        style={{ cursor: 'pointer' }}
                        onClick={() => redirectToPage(response?.parentId?._id)}
                      >
                        {`${response?.parentId?.title} page`}
                      </Typography>
                    )}
                  </Typography>
                  <Typography variant="body2">
                    {`created at ${moment(response?.createdAt).format('l')} ${moment(
                      response?.createdAt,
                    ).format('LT')}`}
                  </Typography>
                </>
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
                          {field?.options?.showCommentBox && (
                            <CommentLikeShare parentId={value?._id} />
                          )}
                        </div>
                      ))}
                  </div>
                );
              })}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

import { useSelector } from 'react-redux';
import { Fragment, useState } from 'react';
import { useGetForm } from '@frontend/shared/hooks/form';
import { useDeleteResponse, useGetResponse } from '@frontend/shared/hooks/response';
import { getPage } from '@frontend/shared/hooks/template/pages';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import { useUpdateSection } from '@frontend/shared/hooks/section';
import EditIcon from '@mui/icons-material/Edit';
import { useAuthorization } from '@frontend/shared/hooks/auth';
import ListItemText from '@mui/material/ListItemText';
import moment from 'moment';
import { Paper, Box, Grid, List, ListItem, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getUserAttributes } from '@frontend/shared/hooks/user/getUserForm';
import EditResponseDrawer from './EditResponseDrawer';
import Breadcrumbs from '../common/Breadcrumbs';
import DisplayValue from '../form2/DisplayValue';
import NotFound from '../common/NotFound';
import CommentLikeShare from '../common/commentLikeShare/CommentLikeShare';
import StarRating from '../starRating/starRating';
import ErrorLoading from '../common/ErrorLoading';
import { QRButton } from '../qrcode/QRButton';
import ResponseSections from './ResponseSection';
import FormFieldsValue from '../form2/FormFieldsValue';
import { onAlert } from '../../utils/alert';
import CRUDMenu from '../common/CRUDMenu';
import BackdropComponent from '../common/Backdrop';
import EditMode from '../common/EditMode';

const StyledBox = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row !important',
  },
}));

interface IProps {
  responseId: string;
  hideBreadcrumbs?: boolean;
  hideNavigation?: boolean;
  hideAuthor?: boolean;
  hideWorkflow?: boolean;
  deleteCallBack?: () => void;
}

export default function Response({
  responseId,
  hideBreadcrumbs,
  hideNavigation,
  hideAuthor,
  hideWorkflow,
  deleteCallBack,
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
      deleteCallBack={deleteCallBack}
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
  isAuthorized?: boolean;
  deleteCallBack?: () => void;
}

export function ResponseChild2({
  formId,
  response,
  hideBreadcrumbs,
  hideNavigation,
  hideAuthor,
  hideWorkflow,
  isAuthorized,
  deleteCallBack,
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
      isAuthorized={isAuthorized}
      deleteCallBack={deleteCallBack}
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
  deleteCallBack?: () => void;
  isAuthorized?: boolean;
}

export function ResponseChild3({
  form,
  response,
  hideBreadcrumbs,
  hideNavigation,
  hideAuthor,
  hideWorkflow,
  deleteCallBack,
  isAuthorized,
}: IProps3) {
  const [state, setState] = useState({ showMenu: null, edit: false, showBackdrop: false });

  const { handleDelete, deleteLoading } = useDeleteResponse({ onAlert });
  const authorized =
    useAuthorization([response?.createdBy?._id, form?.createdBy?._id], true) || isAuthorized;
  const authorized2 = useAuthorization([form?.createdBy?._id], true);
  const { section, onSectionChange, handleUpdateSection } = useUpdateSection({
    onAlert,
    _id: JSON.parse(response?.options)?.customSectionId || form._id,
  });
  const { editMode } = useSelector(({ setting }: any) => setting);
  const router = useRouter();

  const userForm = useSelector(({ setting }: any) => setting.userForm);

  const redirectToPage = async (_id) => {
    setState({ ...state, showBackdrop: true });
    const page = await getPage(_id);
    if (
      page?.data?.getPage?.template?.slug &&
      page?.data?.getPage?.slug &&
      router?.query?.itemSlug !== page?.data?.getPage?.slug
    ) {
      router.push(`/${page?.data?.getPage?.template?.slug}/${page?.data?.getPage?.slug}`);
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
                <IconButton
                  onClick={(e) => setState({ ...state, showMenu: e.currentTarget })}
                  size="large"
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </div>
      ) : (
        authorized && (
          <Tooltip title="Edit Response">
            <IconButton
              onClick={(e) => setState({ ...state, showMenu: e.currentTarget })}
              size="large"
            >
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
              handleDelete(response?._id, deleteCallBack);
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
                onSectionChange={(sec) => null}
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
          {response?.workFlowFormResponseParentId && section?.options?.showRelation && (
            <Response
              responseId={response?.workFlowFormResponseParentId}
              hideBreadcrumbs
              hideWorkflow
            />
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
                workFlowFormResponseParentId={response?._id}
              />
            )}
            <div className="p-2">
              {!hideAuthor && (
                <>
                  <Typography variant="body1">
                    {`by ${
                      getUserAttributes(userForm, response?.createdBy)?._id
                        ? `${getUserAttributes(userForm, response?.createdBy)?.firstName} ${
                            getUserAttributes(userForm, response?.createdBy)?.lastName
                          }`
                        : 'Unauthorised user'
                    } `}
                    {response?.parentId?.title && (
                      <span>
                        {'from '}
                        <Typography
                          color="primary"
                          display="inline"
                          style={{ cursor: 'pointer' }}
                          onClick={() => redirectToPage(response?.parentId?._id)}
                        >
                          {response?.parentId?.title}
                        </Typography>
                        {' page'}
                      </span>
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
                  <div key={field?._id} className="mt-2">
                    <Typography fontWeight="bold">- {field?.label}</Typography>
                    {response?.values
                      ?.filter((v) => v.field === field._id)
                      .map((value) => (
                        <Fragment key={value?._id}>
                          <StyledBox style={{ display: 'flex', alignContent: 'center' }}>
                            <DisplayValue field={field} value={value} verticalView />
                          </StyledBox>
                          {field?.options?.showCommentBox && (
                            <CommentLikeShare parentId={value?._id} />
                          )}
                          {field?.options?.showStarRating && <StarRating parentId={value?._id} />}
                        </Fragment>
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

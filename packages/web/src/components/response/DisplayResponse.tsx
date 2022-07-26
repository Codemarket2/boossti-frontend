import { useSelector } from 'react-redux';
import { Fragment, useState } from 'react';
import { useDeleteResponse } from '@frontend/shared/hooks/response';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import { useUpdateSection } from '@frontend/shared/hooks/section';
import EditIcon from '@mui/icons-material/Edit';
import { useAuthorization } from '@frontend/shared/hooks/auth';
import ListItemText from '@mui/material/ListItemText';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { getUserName } from '@frontend/shared/hooks/user/getUserForm';
import { parseResponse } from '@frontend/shared/hooks/response/getResponse';
import Divider from '@mui/material/Divider';
import EditResponseDrawer from './EditResponseDrawer';
import Breadcrumbs from '../common/Breadcrumbs';
import DisplayValue from '../form2/DisplayValue';
import CommentLikeShare from '../comment/CommentLikeShare';
import StarRating from '../starRating/starRating';
import { QRButton } from '../qrcode/QRButton';
import ResponseSections from './ResponseSection';
import FormFieldsValue from '../form2/FormFieldsValue';
import { onAlert } from '../../utils/alert';
import BackdropComponent from '../common/Backdrop';
import EditMode from '../common/EditMode';
import DisplayFormulaValue from '../form2/formula/DisplayFormulaValue';
import DisplayResponseById from './DisplayResponseById';
import DeleteButton from '../common/DeleteButton';
import RelationFields from '../form2/RelationFields';
import RelationFieldView from '../form2/RelationFieldView';

interface DisplayResponseProps {
  form: any;
  response: any;
  hideBreadcrumbs?: boolean;
  hideNavigation?: boolean;
  hideAuthor?: boolean;
  hideWorkflow?: boolean;
  deleteCallBack?: () => void;
  isAuthorized?: boolean;
  hideDelete?: boolean;
}

const initialState = { showMenu: null, edit: false, showBackdrop: false, fieldId: null };

export function DisplayResponse({
  form,
  response: tempResponse,
  hideBreadcrumbs,
  hideNavigation,
  hideAuthor,
  hideWorkflow,
  deleteCallBack,
  isAuthorized,
  hideDelete,
}: DisplayResponseProps) {
  const [state, setState] = useState(initialState);

  const { handleDelete, deleteLoading } = useDeleteResponse({ onAlert });
  const response = parseResponse(tempResponse);
  const authorized =
    useAuthorization([response?.createdBy?._id, form?.createdBy?._id], true) || isAuthorized;
  const authorized2 = useAuthorization([form?.createdBy?._id], true);
  const { section, onSectionChange, handleUpdateSection } = useUpdateSection({
    onAlert,
    _id:
      (typeof response?.options === 'string' ? JSON.parse(response?.options) : response?.options)
        ?.customSectionId || form._id,
  });
  const { editMode } = useSelector(({ setting }: any) => setting);

  const userForm = useSelector(({ setting }: any) => setting.userForm);

  const hideLeftNavigation = !(hideAuthor || hideNavigation || hideBreadcrumbs);

  const DeleteComponent = (
    <>
      {!hideDelete && authorized && (
        <DeleteButton
          tooltip="Delete Response"
          onClick={() => {
            setState({ ...state, showMenu: null });
            handleDelete(response?._id, deleteCallBack);
          }}
        />
      )}
    </>
  );

  return (
    <>
      <BackdropComponent open={deleteLoading || state.showBackdrop} />
      {!hideBreadcrumbs && (
        <div className="d-flex justify-content-between align-items-center">
          {!hideNavigation && (
            <Breadcrumbs>
              <Link href="/forms">Forms</Link>
              <Link href={`/forms/${form.slug}`}>{form?.name}</Link>
              <Typography>{response.count}</Typography>
            </Breadcrumbs>
          )}
          <div className="d-flex align-items-center">
            {!hideNavigation && (
              <>
                <EditMode />
                <QRButton />
              </>
            )}
            {DeleteComponent}
          </div>
        </div>
      )}
      <Grid container spacing={1}>
        {hideLeftNavigation && (
          <Grid item xs={3}>
            <div
              className={`d-flex ${
                section?.options?.belowResponse ? 'flex-column-reverse' : 'flex-column'
              }`}
            >
              <Paper variant="outlined">
                <List dense component="nav">
                  <ListItem button>
                    <ListItemText primary="Form Fields" />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText primary="ID" />
                  </ListItem>
                  {form?.fields?.map((field) => (
                    <ListItem button key={field._id}>
                      <ListItemText primary={field?.label} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
              <RelationFields formId={form?._id} previewMode />
              <ResponseSections
                authorized={false}
                section={section}
                onSectionChange={(sec) => null}
              />
            </div>
          </Grid>
        )}
        <Grid item xs={!hideLeftNavigation ? 12 : 9}>
          {response?.workFlowFormResponseParentId && section?.options?.showRelation && (
            <DisplayResponseById
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
            <div className="p-2">
              <div className="d-flex align-items-center">
                {!hideAuthor && (
                  <div>
                    <Typography variant="body1">
                      {`by ${getUserName(userForm, response?.createdBy)} `}
                    </Typography>
                    <Typography variant="body2">
                      {`created at ${moment(response?.createdAt).format('l')} ${moment(
                        response?.createdAt,
                      ).format('LT')}`}
                    </Typography>
                  </div>
                )}
                {hideBreadcrumbs && DeleteComponent}
              </div>
              <div className="mt-3">
                <Typography fontWeight="bold">ID</Typography>
                {response?.count}
              </div>
              {form?.fields?.map((field) => {
                return (
                  <div key={field?._id} className="mt-3">
                    {field?._id === state.fieldId ? (
                      <>
                        <EditResponseDrawer
                          fieldId={state.fieldId}
                          form={form}
                          response={response}
                          onClose={() => setState(initialState)}
                        />
                      </>
                    ) : (
                      <div>
                        <Typography fontWeight="bold" className="d-flex align-items-center">
                          {field?.label}
                          <Tooltip title="Edit Response">
                            <IconButton
                              edge="end"
                              onClick={(e) => setState({ ...initialState, fieldId: field?._id })}
                              size="small"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                        {field?.options?.systemCalculatedAndView ? (
                          <DisplayFormulaValue
                            formula={field?.options?.formula}
                            field={field}
                            values={response?.values}
                          />
                        ) : (
                          <>
                            {response?.values
                              ?.filter((v) => v.field === field._id)
                              .map((value) => (
                                <Fragment key={value?._id}>
                                  <StyledBox style={{ display: 'flex', alignContent: 'center' }}>
                                    <DisplayValue field={field} value={value} verticalView />
                                  </StyledBox>
                                  {field?.options?.showCommentBox && (
                                    <CommentLikeShare threadId={value?._id} />
                                  )}
                                  {field?.options?.showStarRating && (
                                    <StarRating parentId={value?._id} />
                                  )}
                                </Fragment>
                              ))}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <RelationFieldView responseId={response?._id} formId={form?._id} />
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
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

const StyledBox = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row !important',
  },
}));

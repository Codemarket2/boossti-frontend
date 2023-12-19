import { useCheckPermission } from '@frontend/shared/hooks/permission';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import {
  useDeleteResponse,
  useResolveCondition,
  useCreateUpdateResponse,
} from '@frontend/shared/hooks/response';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import { getUserName } from '@frontend/shared/hooks/user/getUserForm';
import { parseResponse, useGetResponse } from '@frontend/shared/hooks/response/getResponse';
import { IForm } from '@frontend/shared/types';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useGetForm } from '@frontend/shared/hooks/form';
import { useRouter } from 'next/router';
import RGL, { WidthProvider } from 'react-grid-layout';
import EditResponse from './EditResponse';
import Breadcrumbs from '../common/Breadcrumbs';
import { QRButton } from '../qrcode/QRButton';
import { onAlert } from '../../utils/alert';
import BackdropComponent from '../common/Backdrop';
import EditMode from '../common/EditMode';
import DeleteButton from '../common/DeleteButton';
import RelationFieldView from '../form2/RelationFieldView';
import FieldValuesMap from './FieldValuesMap';
import ErrorLoading from '../common/ErrorLoading';
import WorkflowButtons from './workflow/WorkflowButtons';
import FormFields from '../form2/FormFields';
import InlineEdit from './InlineEdit';

const ReactGridLayout = WidthProvider(RGL);
// inlineEdit  related imports

export interface DisplayResponseProps {
  form: IForm;
  response: any;
  hideBreadcrumbs?: boolean;
  hideNavigation?: boolean;
  hideAuthor?: boolean;
  hideWorkflow?: boolean;
  deleteCallBack?: () => void;
  hideDelete?: boolean;
  previewMode?: boolean;
  defaultShowFieldsMenu?: boolean;
  viewLess?: boolean;
  handleViewLess?: (viewMore: boolean) => void;
}

const initialState = {
  showMenu: null,
  edit: false,
  showBackdrop: false,
  fieldId: null,
  field: null,
  showFieldsMenu: false,
  valueId: null,
  responseId: null,
  editMode: null,
};

export function DisplayResponse({
  form,
  response: tempResponse,
  hideBreadcrumbs,
  hideNavigation,
  hideAuthor,
  hideWorkflow,
  deleteCallBack,
  hideDelete,
  previewMode,
  defaultShowFieldsMenu,
  viewLess,
  handleViewLess,
}: DisplayResponseProps) {
  const [state, setState] = useState(initialState);
  const { data: workflowFormData, loading: workflowFormLoading } = useGetForm(
    tempResponse?.workflowId,
  );
  const [fieldsConditionResult, setFieldsConditionResult] = useState({});
  const router = useRouter();

  const { handleDelete, deleteLoading } = useDeleteResponse({ onAlert });

  const response = useMemo(() => parseResponse(tempResponse), [tempResponse]);

  const { hasPermission: editPerm } = useCheckPermission({
    actionType: 'EDIT',
    formId: form?._id,
    responseId: response?._id,
  });
  const hasEditPermission = editPerm && !previewMode;

  const { hasPermission: deletePerm } = useCheckPermission({
    actionType: 'DELETE',
    formId: form?._id,
    responseId: response?._id,
  });
  const hasDeletePermission = deletePerm && !previewMode;

  const {
    setting: { userForm },
    auth: { admin },
  } = useSelector((globalState: any) => globalState);

  const { handleResolveCondition } = useResolveCondition();

  // inlineEdit related variables
  const { handleCreateUpdateResponse, updateLoading } = useCreateUpdateResponse({
    onAlert,
  });

  const resolveCondition = async (fieldId, conditions) => {
    const conditionResult = await handleResolveCondition({ conditions, responseId: response?._id });
    setFieldsConditionResult((oldState) => ({ ...oldState, [fieldId]: conditionResult }));
  };

  useEffect(() => {
    if (!state?.fieldId) {
      form?.fields?.forEach((field) => {
        if (field?.options?.hidden && field?.options?.hiddenConditions?.length > 0) {
          resolveCondition(field?._id, field?.options?.hiddenConditions);
        }
      });
    }
  }, [state?.fieldId]);

  useEffect(() => {
    if (
      router?.query?.field &&
      Number(router?.query?.field) > 0 &&
      hasEditPermission &&
      router?.query?.count?.toString() === response?.count?.toString()
    ) {
      setState((oldState) => ({ ...oldState, field: Number(router?.query?.field) }));
    }
  }, [router?.query?.field, hasEditPermission]);

  const hideLeftNavigation = hideAuthor || hideNavigation || hideBreadcrumbs;

  const DeleteComponent = (
    <>
      {!hideDelete && hasDeletePermission && (
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

  const filterFields = (field) => {
    if (field?.options?.hidden) {
      if (field?.options?.hiddenConditions?.length > 0 && fieldsConditionResult?.[field?._id]) {
        return true;
      }
      return false;
    }
    return true;
  };

  const deleteValue = async (valueId) => {
    const newValues = response?.values.filter((value) => value?._id !== valueId);
    const payload = {
      values: newValues,
      _id: response?._id,
    };
    const newResponse = await handleCreateUpdateResponse({
      payload,
      edit: true,
      fields: form?.fields,
    });
    if (newResponse) {
      setState(initialState);
    }
  };
  const deleteField = async (fieldId) => {
    const newValues = response?.values?.filter((value) => value?.field !== fieldId);
    const payload = {
      values: newValues,
      _id: response?._id,
    };
    const newResponse = await handleCreateUpdateResponse({
      payload,
      edit: true,
      fields: form?.fields,
    });
    if (newResponse) {
      setState(initialState);
      if (handleViewLess) {
        handleViewLess(false);
      }
    }
  };
  const scrollToField = (formId: string, fieldId: string) => {
    const element = document.getElementById(`${formId}${fieldId}`);
    element.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!state.showFieldsMenu && defaultShowFieldsMenu) {
      setState((oldState) => ({ ...oldState, showFieldsMenu: true }));
    }
  }, []);

  // inlinEdit Related

  const DetailComponent = (
    <Paper variant="outlined" className="p-2" style={hideLeftNavigation ? { border: 'none' } : {}}>
      <Grid container>
        <Grid xs={12} sm={state.showFieldsMenu ? 3 : 0.5} item>
          {state.showFieldsMenu ? (
            <div className="pr-2">
              <FormFields
                previewMode={!admin}
                fields={form?.fields}
                onClickMinimize={() =>
                  setState((oldState) => ({ ...oldState, showFieldsMenu: false }))
                }
                onClickScrollToField={(formId, fieldId) => {
                  scrollToField(formId, fieldId);
                }}
                formId={form?._id}
              />
            </div>
          ) : (
            <div>
              <Tooltip title="Maximize Fields Menu">
                <IconButton
                  edge="start"
                  color="primary"
                  onClick={() => setState((oldState) => ({ ...oldState, showFieldsMenu: true }))}
                >
                  <KeyboardDoubleArrowRight />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </Grid>
        <Grid xs={12} sm={state.showFieldsMenu ? 9 : 11.5} item>
          <div className="d-flex align-items-center">
            {!hideAuthor && (
              <div>
                <Typography variant="body1" data-testid="userName">
                  {`by ${getUserName(userForm, response?.createdBy)} `}
                </Typography>
                <Typography data-testid="createdAt" variant="body2">
                  {`created at ${moment(response?.createdAt).format('l')} ${moment(
                    response?.createdAt,
                  ).format('LT')}`}
                </Typography>
              </div>
            )}
            {hideBreadcrumbs && DeleteComponent}
          </div>
          {response?.workflowId && (
            <div className="mt-3">
              <Typography fontWeight="bold">Workflow</Typography>
              {workflowFormData?.getForm?.name ? (
                <Link href={`/workflow/${workflowFormData?.getForm?.slug}`}>
                  {workflowFormData?.getForm?.name}
                </Link>
              ) : (
                <>loading...</>
              )}
            </div>
          )}
          {response?.parentResponseId && (
            <div className="mt-3">
              <Typography fontWeight="bold">Parent</Typography>
              <DisplayParentResponseName responseId={response?.parentResponseId} />
            </div>
          )}
          <div className="mt-3" data-testid="ID">
            <Typography fontWeight="bold">ID</Typography>
            <Link href={`/form/${form?.slug}/response/${response?.count}`}>
              <a>
                <Tooltip title="Link to response">
                  <span>{response?.count}</span>
                </Tooltip>
              </a>
            </Link>
          </div>
          {form?.fields?.filter(filterFields)?.map((field, index) => {
            return (
              <div key={field?._id} className="mt-3" id={`${form?._id}${field?._id}`}>
                {field?._id === state.fieldId ? (
                  <>
                    <EditResponse
                      fieldId={state.fieldId}
                      form={form}
                      response={response}
                      onClose={() => setState(initialState)}
                      valueId={state?.valueId}
                      editMode={state?.editMode}
                    />
                  </>
                ) : (
                  <div>
                    <FieldValuesMap
                      authorized={hasEditPermission}
                      displayFieldLabel
                      verticalView
                      field={field}
                      response={response}
                      inlineEdit={state?.editMode !== null}
                      onClickEditField={(fieldId, valueId, editMode) => {
                        let fieldIndex = 1;
                        form?.fields?.forEach((f, i) => {
                          if (f?._id === field?._id) {
                            fieldIndex = i + 1;
                          }
                        });
                        router.query.field = fieldIndex?.toString();
                        router.push(router, undefined, { scroll: false });
                        if (editMode === 'deleteValue') {
                          deleteValue(valueId);
                        } else if (editMode === 'deleteField') {
                          deleteField(fieldId);
                        } else {
                          setState({
                            ...initialState,
                            field: fieldIndex,
                            fieldId,
                            valueId,
                            responseId: response?._id,
                            editMode,
                          });
                          if (handleViewLess) {
                            handleViewLess(true);
                          }
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
          {!viewLess && (
            <>
              {workflowFormData?.getForm?._id && !response?.parentResponseId && (
                <WorkflowButtons response={response} />
              )}
              <RelationFieldView responseId={response?._id} formId={form?._id} />
            </>
          )}
          {/* {!hideWorkflow && section?.fields?.length > 0 && (
          <FormFieldsValue
            authorized={hasEditPermission}
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
            workflowId={response?._id}
          />
        )} */}
          {/* {response?.workflowId && (
          <WorkflowSteps parentResponseId={response?._id} workflowId={response?.workflowId} />
        )} */}
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <>
      <BackdropComponent open={deleteLoading || state.showBackdrop} />
      {!hideBreadcrumbs && (
        <div className="d-flex justify-content-between align-items-center" data-testid="breadcrumb">
          {!hideNavigation && (
            <div data-testid="navigation">
              <Breadcrumbs>
                <Link href="/feed">Forms</Link>
                <Link href={`/form/${form.slug}`}>{form?.name}</Link>
                <Typography>{response.count}</Typography>
              </Breadcrumbs>
            </div>
          )}
          <div className="d-flex align-items-center">
            {!hideNavigation && (
              <>
                {hasEditPermission && (
                  <>
                    <Button disabled variant="contained" size="small">
                      Publish
                    </Button>
                    <EditMode />
                  </>
                )}
                <QRButton />
              </>
            )}
            {DeleteComponent}
          </div>
        </div>
      )}
      {DetailComponent}
      {/* {state?.field && hasEditPermission ? (
        <Paper variant="outlined" className="p-2">
          <EditResponse
            form={form}
            response={response}
            onClose={() => {
              setState(initialState);
              delete router?.query?.field;
              router.push(router);
            }}
          />
        </Paper>
      ) : (
        DetailComponent
      )} */}
    </>
  );
}

const DisplayParentResponseName = ({ responseId }: { responseId: string }) => {
  const { data, error, loading } = useGetResponse(responseId);
  const { data: formData, loading: formLoading } = useGetForm(data?.getResponse?.formId);

  if (!formData?.getForm?._id && (loading || formLoading)) {
    return <>loading...</>;
  }

  if (error) {
    <ErrorLoading error={error} />;
  }

  if (formData?.getForm?.name) {
    return (
      <Link href={`/form/${formData?.getForm?.slug}/response/${data?.getResponse?.count}`}>
        {formData?.getForm?.name}
      </Link>
    );
  }
  return null;
};

import { useCheckPermission } from '@frontend/shared/hooks/permission';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDeleteResponse, useResolveCondition } from '@frontend/shared/hooks/response';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import { getUserName } from '@frontend/shared/hooks/user/getUserForm';
import { parseResponse, useGetResponse } from '@frontend/shared/hooks/response/getResponse';
import { IForm } from '@frontend/shared/types';
import { Tooltip } from '@mui/material';
import { useGetForm } from '@frontend/shared/hooks/form';
import EditResponseDrawer from './EditResponseDrawer';
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
  hideDelete,
  previewMode,
}: DisplayResponseProps) {
  const [state, setState] = useState(initialState);
  const { data: workflowFormData, loading: workflowFormLoading } = useGetForm(
    tempResponse?.workflowId,
  );
  const [fieldsConditionResult, setFieldsConditionResult] = useState({});

  const { handleDelete, deleteLoading } = useDeleteResponse({ onAlert });
  const [response, setResponse] = useState(parseResponse(tempResponse));

  useEffect(() => {
    if (tempResponse) {
      setResponse((oldResponse) => ({ ...oldResponse, ...parseResponse(tempResponse) }));
    }
  }, [tempResponse]);

  const { hasPermission: editPerm } = useCheckPermission({
    actionType: 'EDIT',
    formId: form?._id,
    responseId: response?._id,
    model: 'Response',
  });
  const hasEditPermission = editPerm && !previewMode;

  const { hasPermission: deletePerm } = useCheckPermission({
    actionType: 'DELETE',
    formId: form?._id,
    responseId: response?._id,
    model: 'Response',
  });
  const hasDeletePermission = deletePerm && !previewMode;

  // const { section, onSectionChange, handleUpdateSection } = useUpdateSection({
  //   onAlert,
  //   _id:
  //     (typeof response?.options === 'string' ? JSON.parse(response?.options) : response?.options)
  //       ?.customSectionId || form._id,
  // });
  // const { editMode } = useSelector(({ setting }: any) => setting);

  const userForm = useSelector(({ setting }: any) => setting.userForm);

  const { handleResolveCondition } = useResolveCondition();

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

  const hideLeftNavigation = !(hideAuthor || hideNavigation || hideBreadcrumbs);

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

  const DetailComponent = (
    <>
      {/* {response?.workflowId && section?.options?.showRelation && (
        <DisplayResponseById responseId={response?.workflowId} hideBreadcrumbs hideWorkflow />
      )} */}
      <Paper variant="outlined" style={!hideLeftNavigation ? { border: 'none' } : {}}>
        <div className="p-2">
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
          {form?.fields?.filter(filterFields)?.map((field) => {
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
                    <FieldValuesMap
                      authorized={hasEditPermission}
                      displayFieldLabel
                      verticalView
                      field={field}
                      response={response}
                      onClickEditField={(e) => setState({ ...initialState, fieldId: field?._id })}
                    />
                  </div>
                )}
              </div>
            );
          })}
          {workflowFormData?.getForm?._id && !response?.parentResponseId && (
            <WorkflowButtons response={response} />
          )}
        </div>
        <RelationFieldView responseId={response?._id} formId={form?._id} />
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
      </Paper>
    </>
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
                {hasEditPermission && <EditMode />}
                <QRButton />
              </>
            )}
            {DeleteComponent}
          </div>
        </div>
      )}
      {DetailComponent}
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

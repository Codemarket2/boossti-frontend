import { useCheckPermission } from '@frontend/shared/hooks/permission';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDeleteResponse, useResolveCondition } from '@frontend/shared/hooks/response';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import { useUpdateSection } from '@frontend/shared/hooks/section';
import moment from 'moment';
import Paper from '@mui/material/Paper';
// import ListItemText from '@mui/material/ListItemText';
// import Grid from '@mui/material/Grid';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import { systemForms } from '@frontend/shared/utils/systemForms';
import { getUserName } from '@frontend/shared/hooks/user/getUserForm';
import { parseResponse } from '@frontend/shared/hooks/response/getResponse';
import { IForm } from '@frontend/shared/types';
import EditResponseDrawer from './EditResponseDrawer';
import Breadcrumbs from '../common/Breadcrumbs';
import { QRButton } from '../qrcode/QRButton';
import FormFieldsValue from '../form2/FormFieldsValue';
import { onAlert } from '../../utils/alert';
import BackdropComponent from '../common/Backdrop';
import EditMode from '../common/EditMode';
import DisplayResponseById from './DisplayResponseById';
import DeleteButton from '../common/DeleteButton';
import RelationFieldView from '../form2/RelationFieldView';
import FieldValuesMap from './FieldValuesMap';
import WorkflowSteps from './workflow/WorkflowSteps';
// import ResponseSections from './ResponseSection';
// import WorkflowStep1 from './workflow/WorkflowStep1';
// import RelationFields from '../form2/RelationFields';

export interface DisplayResponseProps {
  form: IForm;
  response: any;
  hideBreadcrumbs?: boolean;
  hideNavigation?: boolean;
  hideAuthor?: boolean;
  hideWorkflow?: boolean;
  deleteCallBack?: () => void;
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
  hideDelete,
}: DisplayResponseProps) {
  const [state, setState] = useState(initialState);
  const [fieldsConditionResult, setFieldsConditionResult] = useState({});

  const { handleDelete, deleteLoading } = useDeleteResponse({ onAlert });
  const [response, setResponse] = useState(parseResponse(tempResponse));

  useEffect(() => {
    if (tempResponse) {
      setResponse((oldResponse) => ({ ...oldResponse, ...parseResponse(tempResponse) }));
    }
  }, [tempResponse]);

  const { hasPermission: hasEditPermission } = useCheckPermission({
    actionType: 'EDIT',
    formId: form?._id,
    responseId: response?._id,
  });

  const { hasPermission: hasDeletePermission } = useCheckPermission({
    actionType: 'DELETE',
    formId: form?._id,
    responseId: response?._id,
  });

  const { section, onSectionChange, handleUpdateSection } = useUpdateSection({
    onAlert,
    _id:
      (typeof response?.options === 'string' ? JSON.parse(response?.options) : response?.options)
        ?.customSectionId || form._id,
  });
  const { editMode } = useSelector(({ setting }: any) => setting);

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
                <Typography variant="body1" data-testid="userName">
                  {`by ${getUserName(userForm, response?.createdBy)} `}
                </Typography>
                <Typography data-testid="createdAt" variant="body2">
                  {`created at ${moment(response?.createdAt).format('l')} ${moment(
                    response?.createdAt,
                  ).format('LT')}`}
                </Typography>
                {response?.workFlowFormResponseParentId && (
                  <Typography variant="body1">was submitted as workflow</Typography>
                )}
              </div>
            )}
            {hideBreadcrumbs && DeleteComponent}
          </div>
          <div className="mt-3" data-testid="ID">
            <Typography fontWeight="bold">ID</Typography>
            {response?.count}
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
        </div>
        <RelationFieldView responseId={response?._id} formId={form?._id} />
        {!hideWorkflow && section?.fields?.length > 0 && (
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
            workFlowFormResponseParentId={response?._id}
          />
        )}
        {response?.workFlowFormResponseParentId && (
          <WorkflowSteps
            parentResponseId={response?._id}
            workflowId={response?.workFlowFormResponseParentId}
          />
        )}
      </Paper>
    </>
  );

  // const LeftNavigation = (
  //   <div
  //     className={`d-flex ${
  //       section?.options?.belowResponse ? 'flex-column-reverse' : 'flex-column'
  //     }`}
  //   >
  //     <Paper variant="outlined">
  //       <List dense component="nav">
  //         <ListItem button>
  //           <ListItemText primary="ID" />
  //         </ListItem>
  //         <div data-testid="fieldName">
  //           {form?.fields?.map((field) => (
  //             <ListItem button key={field._id}>
  //               <ListItemText primary={field?.label} />
  //             </ListItem>
  //           ))}
  //         </div>
  //       </List>
  //     </Paper>
  //     <RelationFields formId={form?._id} previewMode />
  //     {section?.fields?.length > 0 && (
  //       <ResponseSections authorized={false} section={section} onSectionChange={(sec) => null} />
  //     )}
  //   </div>
  // );

  // const isWorkflowDetail = form?.slug === systemForms?.workflow?.slug;

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
      {/* <Grid container spacing={1}>
        {hideLeftNavigation && (
          <Grid data-testid="hideLeftNavigation" item xs={3}>
            {isWorkflowDetail ? DetailComponent : LeftNavigation}
          </Grid>
        )}
        <Grid item xs={!hideLeftNavigation ? 12 : 9}>
          {isWorkflowDetail ? (
            <WorkflowStep1 workflowForm={form} workflowResponse={response} />
          ) : (
            DetailComponent
          )}
        </Grid>
      </Grid> */}
    </>
  );
}

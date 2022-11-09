import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { useGetResponses } from '@frontend/shared/hooks/response';
import { systemForms } from '@frontend/shared/utils/systemForms';
import { useGetForm, useGetFormBySlug } from '@frontend/shared/hooks/form';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import ErrorLoading from '../common/ErrorLoading';
import AuditLogCard from './AuditLogCard';

interface IProps {
  documentId?: string;
  formId?: string;
}

export default function AuditLog({ documentId, formId }: IProps) {
  const userForm = useSelector(({ setting }: any) => setting.userForm);

  const { data, error } = useGetFormBySlug(systemForms?.activityLogCard?.slug);
  // const { data, error } = useGetForm(systemForms?.activityLogCard?.formId);

  const activityLogCardForm = data?.getFormBySlug;

  const documentIdField = getFieldByLabel(
    systemForms?.activityLogCard?.fields?.documentId,
    activityLogCardForm?.fields,
  );
  const differenceField = getFieldByLabel(
    systemForms?.activityLogCard?.fields?.difference,
    activityLogCardForm?.fields,
  );

  let valueFilter = {};
  if (documentId && formId) {
    valueFilter = {
      $or: [
        { 'values.field': documentIdField?._id, 'values.value': documentId },
        { 'values.field': differenceField?._id, 'values.options.json.formId': formId },
      ],
    };
  }
  const {
    data: responseData,
    error: responseError,
    state,
    setState,
    loading: responseLoading,
  } = useGetResponses({
    formId: activityLogCardForm?._id,
    valueFilter,
  });

  if (!activityLogCardForm?._id || error || responseError || !responseData) {
    return (
      <ErrorLoading
        error={error || (activityLogCardForm?._id && !responseLoading ? responseError : null)}
      >
        <Skeleton height={150} />
        <Skeleton height={150} />
        <Skeleton height={150} />
      </ErrorLoading>
    );
  }

  const activityForm = activityLogCardForm;
  return (
    <div className="p-2">
      {responseData?.getResponses?.data
        ?.map((response) => getAuditLogs(response, activityForm))
        .map((auditLog, index) => (
          <AuditLogCard key={auditLog._id} auditLog={auditLog} userForm={userForm} />
        ))}
      {responseData?.getResponses?.count > 0 && (
        <div className="d-flex justify-content-center">
          <div>
            <Typography align="center">
              Showing {(state?.page > 1 ? state?.limit * state?.page - state?.limit : 0) + 1}-
              {state?.limit * state?.page} of {responseData?.getResponses?.count}
            </Typography>
            <Pagination
              page={state?.page}
              onChange={(event, page) => {
                setState((oldInput) => ({ ...oldInput, page }));
              }}
              count={Math.ceil(responseData?.getResponses?.count / state?.limit)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const getAuditLogs = (response, activityForm) => {
  const action = getFieldValueByLabel(
    systemForms?.activityLogCard?.fields?.action,
    activityForm?.fields,
    response?.values,
  )?.value;
  const model = getFieldValueByLabel(
    systemForms?.activityLogCard?.fields?.model,
    activityForm?.fields,
    response?.values,
  )?.value;
  const documentId = getFieldValueByLabel(
    systemForms?.activityLogCard?.fields?.documentId,
    activityForm?.fields,
    response?.values,
  )?.value;
  const difference = getFieldValueByLabel(
    systemForms?.activityLogCard?.fields?.difference,
    activityForm?.fields,
    response?.values,
  )?.value;
  const message = getFieldValueByLabel(
    systemForms?.activityLogCard?.fields?.message,
    activityForm?.fields,
    response?.values,
  )?.value;
  return {
    action,
    model,
    documentId,
    difference,
    message,
    createdBy: response?.createdBy,
    createdAt: response?.createdAt,
    _id: response?._id,
  };
};

const getFieldValueByLabel = (fieldLabel, fields, values) => {
  let value = null;
  const field = getFieldByLabel(fieldLabel, fields);
  if (field?._id) {
    value = values?.find((v) => v?.field === field?._id);
  }
  return value;
};

const getFieldByLabel = (fieldLabel, fields) => {
  return fields?.find((f) => f?.label?.toLowerCase() === fieldLabel?.toLowerCase());
};

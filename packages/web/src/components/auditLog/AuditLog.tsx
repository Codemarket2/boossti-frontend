import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { useGetResponses } from '@frontend/shared/hooks/response';
import { systemForms } from '@frontend/shared/utils/systemForms';
import { getForm, getFormBySlug, useGetFormBySlug } from '@frontend/shared/hooks/form';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from 'react';
import { IField, IForm, IResponse, IValue } from '@frontend/shared/types';
import ErrorLoading from '../common/ErrorLoading';
import AuditLogCard from './AuditLogCard';

interface IProps {
  documentId?: string;
  formId?: string;
}

export default function AuditLog({ documentId, formId }: IProps) {
  const userForm = useSelector(({ setting }: any) => setting.userForm);
  const [forms, setForms] = useState({
    activityLogCard: null,
    model: null,
    userActionTypes: null,
  });

  const [formError, setFormError] = useState(null);

  // const { data, error } = useGetFormBySlug(systemForms?.activityLogCard?.slug);
  // const activityLogCardForm = data?.getFormBySlug;

  const getForms = async () => {
    try {
      const activityLogCard = await getFormBySlug(systemForms?.activityLogCard?.slug);
      const model = await getFormBySlug(systemForms?.model?.slug);
      const userActionTypes = await getFormBySlug(systemForms?.userActionTypes?.slug);
      if (!activityLogCard?._id || !model?._id || !userActionTypes?._id) {
        throw new Error('activityLogCard, model, userActionTypes form not found');
      }
      setForms({ activityLogCard, model, userActionTypes });
    } catch (error) {
      setFormError(error);
    }
  };

  useEffect(() => {
    getForms();
  }, []);

  const activityLogCardForm = forms?.activityLogCard;
  const modelForm = forms?.model;
  const userActionTypesForm = forms?.userActionTypes;

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

  if (
    !activityLogCardForm?._id ||
    !modelForm?._id ||
    !userActionTypesForm?._id ||
    formError ||
    responseError ||
    !responseData
  ) {
    return (
      <ErrorLoading
        error={formError || (activityLogCardForm?._id && !responseLoading ? responseError : null)}
      >
        <Skeleton height={150} />
        <Skeleton height={150} />
        <Skeleton height={150} />
      </ErrorLoading>
    );
  }

  return (
    <div className="p-2">
      {responseData?.getResponses?.data
        ?.map((response) =>
          getAuditLogs({ response, activityLogCardForm, modelForm, userActionTypesForm }),
        )
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

interface IGetAuditLogs {
  response: IResponse;
  activityLogCardForm: IForm;
  modelForm: IForm;
  userActionTypesForm: IForm;
}

const getAuditLogs = ({
  response,
  activityLogCardForm,
  modelForm,
  userActionTypesForm,
}: IGetAuditLogs) => {
  const actionResponse = getFieldValueByLabel(
    systemForms?.activityLogCard?.fields?.action,
    activityLogCardForm?.fields,
    response?.values,
  )?.response;
  const action = getFieldValueByLabel(
    systemForms?.userActionTypes?.fields?.name,
    userActionTypesForm?.fields,
    actionResponse?.values,
  )?.value;

  const modelResponse = getFieldValueByLabel(
    systemForms?.activityLogCard?.fields?.model,
    activityLogCardForm?.fields,
    response?.values,
  )?.response;
  const model = getFieldValueByLabel(
    systemForms?.model?.fields?.name,
    modelForm?.fields,
    modelResponse?.values,
  )?.value;

  const documentId = getFieldValueByLabel(
    systemForms?.activityLogCard?.fields?.documentId,
    activityLogCardForm?.fields,
    response?.values,
  )?.value;
  const differenceString = getFieldValueByLabel(
    systemForms?.activityLogCard?.fields?.difference,
    activityLogCardForm?.fields,
    response?.values,
  )?.value;
  const difference = JSON.parse(differenceString || '');
  const message = getFieldValueByLabel(
    systemForms?.activityLogCard?.fields?.message,
    activityLogCardForm?.fields,
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

const getFieldValueByLabel = (fieldLabel: string, fields: IField[], values: IValue[]) => {
  let value: IValue = null;
  const field = getFieldByLabel(fieldLabel, fields);
  if (field?._id) {
    value = values?.find((v) => v?.field === field?._id);
  }
  return value;
};

const getFieldByLabel = (fieldLabel, fields) => {
  return fields?.find((f) => f?.label?.toLowerCase() === fieldLabel?.toLowerCase());
};

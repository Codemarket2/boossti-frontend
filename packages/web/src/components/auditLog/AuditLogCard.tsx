import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { getUserName } from '@frontend/shared/hooks/user/getUserForm';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { useGetResponse, useGetResponses } from '@frontend/shared/hooks/response';
import CardContent from '@mui/material/CardContent';
import { IForm } from '@frontend/shared/types';
import Close from '@mui/icons-material/Close';
import Link from 'next/link';
import { useGetForm } from '@frontend/shared/hooks/form';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import { systemForms } from '@frontend/shared/utils/systemForms';
import HistoryIcon from '@mui/icons-material/History';
import { DisplayResponseWithFormId } from '../response/DisplayResponseById';
import DisplayRichText from '../common/DisplayRichText';
import Form from '../form2/Form';
import ErrorLoading from '../common/ErrorLoading';
import { getAuditLogObject, getFieldByLabel } from './AuditLog';
import History from './History';

interface IAuditLogCard {
  userForm: IForm;
  auditLog: any;
  activityLogCardForm: IForm;
  modelForm: IForm;
  userActionTypesForm: IForm;
}

export default function AuditLogCard({
  userForm,
  auditLog,
  activityLogCardForm,
  modelForm,
  userActionTypesForm,
}: IAuditLogCard) {
  const userName = getUserName(userForm, auditLog?.createdBy);
  const [state, setState] = useState({ compare: false, showHistory: null });

  return (
    <Card variant="outlined" key={auditLog._id} className="my-3">
      <CardHeader
        avatar={<Avatar />}
        title={
          auditLog?.createdBy?.count ? (
            <Link href={`/form/users/response/${auditLog?.createdBy?.count}`}>{userName}</Link>
          ) : (
            userName
          )
        }
        subheader={moment(auditLog.createdAt).format('lll')}
      />
      <CardContent>
        <div className="d-flex justify-content-between align-items-start">
          <Typography>
            {auditLog.action} {auditLog.model}
            {auditLog.model === 'Form' ? (
              <DisplayFormName formId={auditLog?.documentId} />
            ) : auditLog.model === 'Response' ? (
              <DisplayFormName
                formId={auditLog?.difference?.formId}
                startText="of"
                endText="form"
              />
            ) : (
              auditLog.model === 'Comment'
            )}
          </Typography>
          <div>
            {['UPDATE', 'DELETE'].includes(auditLog?.action) && (
              <>
                <Tooltip title="View history">
                  <Button
                    size="small"
                    startIcon={<HistoryIcon />}
                    onClick={(event) =>
                      setState((oldState) => ({ ...oldState, showHistory: event?.currentTarget }))
                    }
                  >
                    History
                  </Button>
                </Tooltip>
                {state.showHistory && (
                  <History
                    anchorEl={state.showHistory}
                    onClose={() => setState((oldState) => ({ ...oldState, showHistory: null }))}
                    activityLogCardForm={activityLogCardForm}
                    auditLog={auditLog}
                    userForm={userForm}
                    modelForm={modelForm}
                    userActionTypesForm={userActionTypesForm}
                  />
                )}
              </>
            )}
            {auditLog?.action === 'UPDATE' && !state.compare && (
              <Button
                size="small"
                onClick={() => setState((oldState) => ({ ...oldState, compare: true }))}
                className="ml-2"
              >
                Compare Old
              </Button>
            )}
          </div>
        </div>
        {state.compare && (
          <Paper
            variant="outlined"
            className="mt-2 d-flex align-item-center justify-content-between"
          >
            <div className="w-100">
              <Tabs variant="fullWidth" textColor="inherit">
                <Tab label="New" />
                <Tab label="Old" />
              </Tabs>
            </div>
            <Tooltip title="Close Compare">
              <IconButton onClick={() => setState((oldState) => ({ ...oldState, compare: true }))}>
                <Close />
              </IconButton>
            </Tooltip>
          </Paper>
        )}
        <Grid container>
          <Grid item xs={state.compare ? 6 : 12} className={state.compare ? 'border p-1' : ''}>
            {auditLog.model === 'Comment' ? (
              <>
                <DisplayRichText value={auditLog?.difference?.body} />
              </>
            ) : auditLog.model === 'Response' ? (
              <DisplayResponseWithFormId
                hideBreadcrumbs
                hideAuthor
                formId={auditLog?.difference?.formId}
                response={auditLog?.difference}
                previewMode
              />
            ) : (
              auditLog.model === 'Form' && (
                <>
                  <Form form={auditLog?.difference} drawerMode previewMode />
                </>
              )
            )}
          </Grid>
          {state.compare && (
            <Grid item xs={6} className="border p-1">
              <DisplayOldDocument
                activityLogCardForm={activityLogCardForm}
                modelForm={modelForm}
                userActionTypesForm={userActionTypesForm}
                newAuditLog={auditLog}
              />
            </Grid>
          )}
        </Grid>
        {/* (
          <>
            {Object.keys(auditLog?.difference || {})?.map((key, index) => (
              <DisplayDiff
                objectKey={key}
                value={auditLog?.difference[key]}
                key={index}
                level={1}
              />
            ))}
          </>
        ) */}
      </CardContent>
    </Card>
  );
}

const DisplayFormName = ({
  formId,
  setForm,
  startText = '',
  endText = '',
}: {
  formId: string;
  setForm?: (form: IForm) => void;
  startText?: string;
  endText?: string;
}) => {
  const { data } = useGetForm(formId);
  useEffect(() => {
    if (data?.getForm?._id && setForm) {
      setForm(data?.getForm);
    }
  }, [data?.getForm]);

  if (data?.getForm?.name) {
    return (
      <>
        {' '}
        {startText} <Link href={`/form/${data?.getForm?.slug}`}>{data?.getForm?.name}</Link>{' '}
        {endText}
      </>
    );
  }
  return null;
};

const DisplayFormNameByResponseId = ({ responseId }: { responseId: string }) => {
  const { data } = useGetResponse(responseId);
  const [form, setForm] = useState(null);
  if (data?.getResponse?.formId) {
    return (
      <>
        <DisplayFormName formId={data?.getResponse?.formId} setForm={setForm} />
        {/* {form?.slug && (
          <Link href={`/form/${form?.slug}/response/${data?.getResponse?.count}`}>
            <Tooltip title="Open Response">
              <Button size="small" endIcon={<OpenInNew />}>
                Open
              </Button>
            </Tooltip>
          </Link>
        )} */}
      </>
    );
  }
  return null;
};

interface IDisplayOldDocument {
  activityLogCardForm: IForm;
  modelForm: IForm;
  userActionTypesForm: IForm;
  newAuditLog: any;
}

const DisplayOldDocument = ({
  activityLogCardForm,
  modelForm,
  userActionTypesForm,
  newAuditLog,
}: IDisplayOldDocument) => {
  const documentField = getFieldByLabel(
    systemForms?.activityLogCard?.fields?.documentId,
    activityLogCardForm?.fields,
  );
  const { data, error } = useGetResponses({
    formId: activityLogCardForm?._id,
    limit: 1,
    valueFilter: {
      'values.field': documentField?._id,
      'values.value': newAuditLog?.difference?._id,
      createdAt: { $lt: newAuditLog?.createdAt },
    },
  });
  const [auditLog, setAuditLog] = useState(null);

  useEffect(() => {
    if (data?.getResponses?.data?.[0]?._id) {
      const oldAuditLog = getAuditLogObject({
        response: data?.getResponses?.data?.[0],
        activityLogCardForm,
        modelForm,
        userActionTypesForm,
      });

      setAuditLog(oldAuditLog);
    }
  }, [data?.getResponses?.data]);

  if (!auditLog?._id || error) {
    return <ErrorLoading error={error} />;
  }

  return (
    <>
      {auditLog.model === 'Comment' ? (
        <>
          <DisplayRichText value={auditLog?.difference?.body} />
        </>
      ) : auditLog.model === 'Response' ? (
        <DisplayResponseWithFormId
          hideBreadcrumbs
          hideAuthor
          formId={auditLog?.difference?.formId}
          response={auditLog?.difference}
          previewMode
        />
      ) : (
        auditLog.model === 'Form' && (
          <>
            <Form form={auditLog?.difference} drawerMode previewMode />
          </>
        )
      )}
    </>
  );
};

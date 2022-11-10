import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { getUserName } from '@frontend/shared/hooks/user/getUserForm';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { useGetResponse } from '@frontend/shared/hooks/response';
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
import { DisplayResponseWithFormId } from '../response/DisplayResponseById';
import DisplayRichText from '../common/DisplayRichText';
import Form from '../form2/Form';

interface IAuditLogCard {
  userForm: IForm;
  auditLog: any;
}

export default function AuditLogCard({ userForm, auditLog }: IAuditLogCard) {
  const userName = getUserName(userForm, auditLog?.createdBy);
  const [compare, setCompare] = useState(false);

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
          {auditLog?.action === 'UPDATE' && !compare && (
            <Button size="small" onClick={() => setCompare(true)}>
              Compare Old
            </Button>
          )}
        </div>
        {compare && (
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
              <IconButton onClick={() => setCompare(false)}>
                <Close />
              </IconButton>
            </Tooltip>
          </Paper>
        )}
        <Grid container>
          <Grid item xs={compare ? 6 : 12} className={compare ? 'border p-1' : ''}>
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
          {compare && (
            <Grid item xs={6} className="border p-1">
              {/* TODO - Get previous activityLog for this document and show it in the OLD TAB
              show the difference between them  */}
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

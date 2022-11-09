import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { getUserName } from '@frontend/shared/hooks/user/getUserForm';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { useGetResponse } from '@frontend/shared/hooks/response';
import CardContent from '@mui/material/CardContent';
import MoreVert from '@mui/icons-material/MoreVert';
import { IForm } from '@frontend/shared/types';
import { OpenInNew } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import Link from 'next/link';
import { useGetForm } from '@frontend/shared/hooks/form';
import DisplayResponseById from '../response/DisplayResponseById';
import DisplayDiff from './DisplayDiff';
import DisplayRichText from '../common/DisplayRichText';

interface IAuditLogCard {
  userForm: IForm;
  auditLog: any;
}

export default function AuditLogCard({ userForm, auditLog }: IAuditLogCard) {
  const [showChanges, setShowChanges] = useState(true);

  const isCreateResponse = auditLog.action === 'CREATE' && auditLog.model === 'Response';

  const userName = getUserName(userForm, auditLog?.createdBy);

  return (
    <Card variant="outlined" key={auditLog._id} className="my-2">
      <CardHeader
        avatar={<Avatar />}
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
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
        <Typography className="d-inlin">
          {auditLog.action} {auditLog.model}
          {auditLog.model === 'Form' && <DisplayFormName formId={auditLog?.documentId} />}
          {auditLog.model === 'Response' && (
            <>
              <DisplayFormNameByResponseId responseId={auditLog?.documentId} />
              {/* {JSON.parse(auditLog?.difference)?.formId ? (
                <DisplayFormName formId={JSON.parse(auditLog?.difference)?.formId} />
              ) : (
                auditLog?.documentId && (
                  <DisplayFormNameByResponseId responseId={auditLog?.documentId} />
                )
              )} */}
            </>
          )}
        </Typography>
        <Button size="small" onClick={() => setShowChanges(!showChanges)}>
          {showChanges ? 'Hide' : 'View'} {isCreateResponse ? 'Response' : 'Changes'}
        </Button>
        {showChanges && (
          <Collapse in={showChanges}>
            {auditLog.model === 'Comment' ? (
              <>
                <DisplayRichText value={JSON.parse(auditLog?.difference)?.body} />
              </>
            ) : isCreateResponse ? (
              <DisplayResponseById
                responseId={JSON.parse(auditLog?.difference)?._id}
                hideBreadcrumbs
              />
            ) : (
              <>
                {Object.keys(JSON.parse(auditLog?.difference) || {})?.map((key, index) => (
                  <DisplayDiff
                    objectKey={key}
                    value={JSON.parse(auditLog?.difference)[key]}
                    key={index}
                    level={1}
                  />
                ))}
              </>
            )}
          </Collapse>
        )}
      </CardContent>
    </Card>
  );
}

const DisplayFormName = ({
  formId,
  setForm,
}: {
  formId: string;
  setForm?: (form: IForm) => void;
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
        of <Link href={`/form/${data?.getForm?.slug}`}>{data?.getForm?.name}</Link> form
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
        {form?.slug && (
          <Link href={`/form/${form?.slug}/response/${data?.getResponse?.count}`}>
            <Tooltip title="Open Response">
              <Button size="small" endIcon={<OpenInNew />}>
                Open
              </Button>
            </Tooltip>
          </Link>
        )}
      </>
    );
  }
  return null;
};

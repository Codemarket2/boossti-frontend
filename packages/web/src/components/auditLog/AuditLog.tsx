import moment from 'moment';
import React, { useState } from 'react';
import { useGetAuditLogs } from '@frontend/shared/hooks/auditLog';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import dynamic from 'next/dynamic';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { getUserAttributes } from '@frontend/shared/hooks/user/getUserForm';
import TimelineConnector from '@mui/lab/TimelineConnector';
import { useSelector } from 'react-redux';
import TimelineDot from '@mui/lab/TimelineDot';
import ErrorLoading from '../common/ErrorLoading';
import Response from '../response/Response';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

interface IProps {
  documentId: string;
  formId?: string;
}

export default function AuditLog({ documentId, formId }: IProps) {
  const { data, loading, error, hadNextPage } = useGetAuditLogs({ documentId, formId });
  const userForm = useSelector(({ setting }: any) => setting.userForm);

  return (
    <Card variant="outlined" className="p-2">
      <Typography variant="h6">Activity Logs</Typography>
      {(error || !data) && <ErrorLoading error={error} />}
      <Timeline
        sx={{
          '& .MuiTimelineContent-root': {
            flex: 0,
          },
        }}
        position="left"
      >
        {data?.getAuditLogs?.data?.map((auditLog, index) => (
          <Item key={auditLog._id} auditLog={auditLog} userForm={userForm} />
        ))}
      </Timeline>
      {hadNextPage && (
        <div className="d-flex justify-content-center">
          <Button>Load more</Button>
        </div>
      )}
    </Card>
  );
}

interface IProps2 {
  auditLog: any;
  userForm: any;
}

const Item = ({ auditLog, userForm }: IProps2) => {
  const [showChanges, setShowChanges] = useState(false);

  const isCreateResponse = auditLog.action === 'CREATE' && auditLog.model === 'Response';

  return (
    <TimelineItem>
      <TimelineOppositeContent sx={{ pt: '8px', pb: 3, px: 2 }}>
        <Typography>
          {auditLog.action} {auditLog.model} by
          <span className="font-weight-bold">
            {` ${getUserAttributes(userForm, auditLog?.createdBy)?.firstName} ${
              getUserAttributes(userForm, auditLog?.createdBy)?.lastName
            }`}
          </span>
        </Typography>
        <Typography variant="body2" component="span">
          {moment(auditLog.createdAt).format('lll')}
        </Typography>
        <Button className="ml-2" size="small" onClick={() => setShowChanges(!showChanges)}>
          {showChanges ? 'Hide' : 'View'} {isCreateResponse ? 'Response' : 'Changes'}
        </Button>
        {showChanges && (
          <Collapse in={showChanges}>
            {isCreateResponse ? (
              <Response responseId={JSON.parse(auditLog?.diff)?._id} hideBreadcrumbs />
            ) : (
              <ReactJson
                src={JSON.parse(auditLog?.diff)}
                name={auditLog?.model?.toLowerCase()}
                enableClipboard={false}
              />
            )}
          </Collapse>
        )}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
    </TimelineItem>
  );
};

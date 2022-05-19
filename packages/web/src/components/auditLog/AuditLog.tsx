import moment from 'moment';
import React from 'react';
import { useGetAuditLogs } from '@frontend/shared/hooks/auditLog';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ErrorLoading from '../common/ErrorLoading';

interface IProps {
  documentId: string;
  formId?: string;
}

export default function AuditLog({ documentId, formId }: IProps) {
  const { data, loading, error, hadNextPage } = useGetAuditLogs({ documentId, formId });

  return (
    <Card variant="outlined" className="p-2">
      <Typography variant="h6" textAlign="center">
        Activity Logs
      </Typography>
      {(error || !data) && <ErrorLoading error={error} />}
      <Timeline>
        {data?.getAuditLogs?.data?.map((auditLog, index) => (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '8px', px: 2 }}>
              <Typography>
                {auditLog.action} {auditLog.model} by{' '}
                <span className="font-weight-bold">{auditLog.createdBy?.name}</span>
              </Typography>
              <Typography variant="body2" component="span">
                {moment(auditLog.createdAt).format('lll')}
              </Typography>
            </TimelineContent>
          </TimelineItem>
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

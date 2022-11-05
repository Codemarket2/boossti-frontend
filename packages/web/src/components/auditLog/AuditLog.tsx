import moment from 'moment';
import React, { useState } from 'react';
import { useGetAuditLogs } from '@frontend/shared/hooks/auditLog';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
// import Timeline from '@mui/lab/Timeline';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { getUserName } from '@frontend/shared/hooks/user/getUserForm';
import TimelineConnector from '@mui/lab/TimelineConnector';
import { useSelector } from 'react-redux';
import TimelineDot from '@mui/lab/TimelineDot';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import ErrorLoading from '../common/ErrorLoading';
import DisplayResponseById from '../response/DisplayResponseById';
import AuditLogCard from './AuditLogCard';
import DisplayDiff from './DisplayDiff';

interface IProps {
  documentId?: string;
  formId?: string;
}

export default function AuditLog({ documentId, formId }: IProps) {
  const { data, loading, error, input, setInput } = useGetAuditLogs({
    documentId,
    formId,
  });

  const userForm = useSelector(({ setting }: any) => setting.userForm);

  return (
    <div className="p-2">
      {(error || !data) && (
        <ErrorLoading error={error}>
          <Skeleton height={150} />
          <Skeleton height={150} />
          <Skeleton height={150} />
        </ErrorLoading>
      )}
      {/* <Timeline
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
      </Timeline> */}
      {data?.getAuditLogs?.data?.map((auditLog, index) => (
        <AuditLogCard key={auditLog._id} auditLog={auditLog} userForm={userForm} />
      ))}
      {data?.getAuditLogs?.count && (
        <div className="d-flex justify-content-center">
          <div>
            <Typography align="center">
              Showing {(input?.page > 1 ? input?.limit * input?.page - input?.limit : 0) + 1}-
              {input?.limit * input?.page} of {data?.getAuditLogs?.count}
            </Typography>
            <Pagination
              page={input?.page}
              onChange={(event, page) => {
                setInput((oldInput) => ({ ...oldInput, page }));
              }}
              count={Math.ceil(data?.getAuditLogs?.count / input?.limit)}
            />
          </div>
        </div>
      )}
    </div>
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
          {auditLog.action} {auditLog.model}
        </Typography>
        <Button className="ml-2" size="small" onClick={() => setShowChanges(!showChanges)}>
          {showChanges ? 'Hide' : 'View'} {isCreateResponse ? 'Response' : 'Changes'}
        </Button>
        {showChanges && (
          <Collapse in={showChanges}>
            {isCreateResponse ? (
              <DisplayResponseById responseId={JSON.parse(auditLog?.diff)?._id} hideBreadcrumbs />
            ) : (
              <>
                {/* <DisplayDiff value={JSON.parse(auditLog?.diff)} initial level={1} /> */}
                {Object.keys(JSON.parse(auditLog?.diff) || {})?.map((key, index) => (
                  <DisplayDiff
                    objectKey={key}
                    value={JSON.parse(auditLog?.diff)[key]}
                    key={index}
                    level={1}
                  />
                ))}
              </>
            )}
          </Collapse>
        )}
        <Typography className="mt-1">
          by <b>{getUserName(userForm, auditLog?.createdBy)}</b>
          <Typography component="span">{` ${moment(auditLog.createdAt).format('lll')}`}</Typography>
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
    </TimelineItem>
  );
};

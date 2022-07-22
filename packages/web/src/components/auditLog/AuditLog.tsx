import moment from 'moment';
import React, { useState } from 'react';
import { useGetAuditLogs } from '@frontend/shared/hooks/auditLog';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
// import dynamic from 'next/dynamic';
import TimelineItem from '@mui/lab/TimelineItem';
import IconButton from '@mui/material/IconButton';
import ArrowRight from '@mui/icons-material/ArrowRight';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { getUserName } from '@frontend/shared/hooks/user/getUserForm';
import TimelineConnector from '@mui/lab/TimelineConnector';
import { useSelector } from 'react-redux';
import TimelineDot from '@mui/lab/TimelineDot';
import ErrorLoading from '../common/ErrorLoading';
import DisplayResponseById from '../response/DisplayResponseById';

// const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

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
          by <span className="font-weight-bold">{getUserName(userForm, auditLog?.createdBy)}</span>
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

const DisplayDiff = ({
  objectKey,
  value,
  initial,
  level,
}: {
  value: any;
  objectKey?: string;
  initial?: boolean;
  level: number;
}) => {
  const [expand, setExpand] = useState(false);
  if (objectKey === 'updatedAt') {
    return null;
  }
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return (
        <>
          {objectKey && (
            <Typography fontWeight="bold" className="mt-1">
              {objectKey}
              <IconButton size="small" edge="end" onClick={() => setExpand(!expand)}>
                {expand ? <ArrowDropDown /> : <ArrowRight />}
              </IconButton>
            </Typography>
          )}
          {expand && (
            <div className="ml-3">
              {value?.map((v, i) => (
                <DisplayDiff key={i} value={v} level={level + 1} objectKey={`${i + 1})`} />
              ))}
            </div>
          )}
        </>
      );
    }
    return (
      <>
        {objectKey && (
          <Typography fontWeight="bold" className="mt-1">
            {objectKey}
            <IconButton size="small" edge="end" onClick={() => setExpand(!expand)}>
              {expand ? <ArrowDropDown /> : <ArrowRight />}
            </IconButton>
          </Typography>
        )}
        {expand && (
          <div className={initial ? '' : 'ml-3'}>
            {Object.keys(value || {})?.map((key, index) => (
              <DisplayDiff objectKey={key} value={value[key]} key={index} level={level + 1} />
            ))}
          </div>
        )}
      </>
    );
  }
  if (['string', 'number', 'boolean'].includes(typeof value)) {
    return (
      <div className="mt-1">
        <Typography>
          <b>{objectKey}</b> - {typeof value === 'string' ? value || '""' : `${value}`}
        </Typography>
      </div>
    );
  }
  return <Typography>{objectKey} - NA</Typography>;
};

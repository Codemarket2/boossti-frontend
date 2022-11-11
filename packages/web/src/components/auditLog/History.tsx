import { useGetResponses } from '@frontend/shared/hooks/response';
import { getUserName } from '@frontend/shared/hooks/user/getUserForm';
import { IForm } from '@frontend/shared/types';
import { systemForms } from '@frontend/shared/utils/systemForms';
import Close from '@mui/icons-material/Close';
import {
  ListItem,
  ListItemText,
  Typography,
  List,
  IconButton,
  Pagination,
  ListItemIcon,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import HistoryIcon from '@mui/icons-material/History';
import moment from 'moment';
import React from 'react';
import ErrorLoading from '../common/ErrorLoading';
import { getAuditLogObject, getFieldByLabel } from './AuditLog';

interface IHistory {
  anchorEl: any;
  onClose: () => void;
  activityLogCardForm: IForm;
  auditLog: any;
  userForm: any;
  modelForm: IForm;
  userActionTypesForm: IForm;
}

export default function History({
  anchorEl,
  onClose,
  activityLogCardForm,
  auditLog,
  userForm,
  modelForm,
  userActionTypesForm,
}: IHistory) {
  const documentField = getFieldByLabel(
    systemForms?.activityLogCard?.fields?.documentId,
    activityLogCardForm?.fields,
  );
  const { data, error, state, setState } = useGetResponses({
    formId: activityLogCardForm?._id,
    valueFilter: {
      'values.field': documentField?._id,
      'values.value': auditLog?.difference?._id,
      createdAt: { $lt: auditLog?.createdAt },
    },
  });

  return (
    <Popover
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
    >
      <Paper style={{ minWidth: 300 }}>
        <Typography className="d-flex justify-content-between align-items-center px-3 pt-1">
          History
          <IconButton size="small" onClick={onClose}>
            <Close />
          </IconButton>
        </Typography>
        {(!data || error) && <ErrorLoading error={error} />}
        <List dense disablePadding>
          {data?.getResponses?.data
            ?.map((response) =>
              getAuditLogObject({ response, activityLogCardForm, modelForm, userActionTypesForm }),
            )
            ?.map((oldAuditLog) => (
              <ListItem key={oldAuditLog?._id} button>
                <ListItemIcon>
                  <HistoryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={`${oldAuditLog?.action} by ${getUserName(
                    userForm,
                    oldAuditLog?.createdBy,
                  )}`}
                  secondary={moment(oldAuditLog.createdAt).format('lll')}
                />
              </ListItem>
            ))}
        </List>
        {data?.getResponses?.count > data?.getResponses?.data?.length && (
          <div className="d-flex justify-content-center pb-2">
            <Pagination
              page={state?.page}
              onChange={(event, page) => {
                setState((oldInput) => ({ ...oldInput, page }));
              }}
              count={Math.ceil(data?.getResponses?.count / state?.limit)}
            />
          </div>
        )}
      </Paper>
    </Popover>
  );
}

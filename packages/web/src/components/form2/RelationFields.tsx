import { useGetFormRelations } from '@frontend/shared/hooks/form/getForm';
import { List, ListItem, ListItemText, Paper, Skeleton, Typography } from '@mui/material';
import React from 'react';
import ErrorLoading from '../common/ErrorLoading';

interface RelationFieldsProps {
  formId: string;
  previewMode?: boolean;
}

export default function RelationFields({ formId, previewMode }: RelationFieldsProps) {
  const { data, error } = useGetFormRelations(formId);
  if (!data || error) {
    return (
      <ErrorLoading error={error}>
        <Skeleton height={50} />
      </ErrorLoading>
    );
  }
  if (data?.getFormRelations?.length > 0) {
    return (
      <Paper variant="outlined">
        {!previewMode && <Typography className="pt-2 pl-2">Relation Fields</Typography>}
        <List dense disablePadding>
          {data?.getFormRelations?.map((relationForm) => {
            const field = relationForm?.fields?.find(
              (relationField) =>
                relationField?.form?._id === formId && relationField?.options?.twoWayRelationship,
            );
            return (
              <ListItem key={relationForm?._id} button>
                <ListItemText
                  primary={field?.options?.relationLabel || relationForm?.name}
                  secondary={!previewMode && `${field?.fieldType} ${relationForm?.name}`}
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    );
  }
  return null;
}

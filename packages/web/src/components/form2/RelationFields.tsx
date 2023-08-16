import { useGetFormRelations } from '@frontend/shared/hooks/form/getForm';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
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
      <Paper variant="outlined" className="mt-2">
        {!previewMode && (
          <>
            <Typography variant="h5" className="p-2">
              Relation Fields
            </Typography>
            <Divider />
          </>
        )}
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

import { useGetFormTabRelations } from '@frontend/shared/hooks/form/getForm';
import { IField } from '@frontend/shared/types';
import Close from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ErrorLoading from '../../common/ErrorLoading';
import FormFields from '../FormFields';

interface FormTabsProps {
  formId: string;
  tabs: IField[];
  onClose: () => void;
  onTabsChange: (newTabs: IField[]) => void;
}

export default function TabsList({ tabs = [], onClose, onTabsChange, formId }: FormTabsProps) {
  const { data, error } = useGetFormTabRelations(formId);
  return (
    <>
      <div className="d-flex justify-content-end position-relative">
        <Tooltip title="Close">
          <IconButton
            color="error"
            style={{ position: 'absolute' }}
            className="mt-1"
            onClick={onClose}
          >
            <Close />
          </IconButton>
        </Tooltip>
      </div>
      <FormFields title="Tabs" isWidget fields={tabs} setFields={onTabsChange} />
      {!data || error ? (
        <ErrorLoading error={error}>
          <Skeleton height={50} />
        </ErrorLoading>
      ) : (
        data?.getFormTabRelations?.length > 0 && (
          <Paper variant="outlined" className="mt-2">
            <Typography variant="h5" className="p-2">
              Relation Tab
            </Typography>
            <Divider />
            <List dense disablePadding>
              {data?.getFormTabRelations?.map((form) => (
                <ListItem key={form?._id}>
                  <a target="_blank" rel="noreferrer" href={`/forms/${form?.slug}`}>
                    {form?.name}
                  </a>
                </ListItem>
              ))}
            </List>
          </Paper>
        )
      )}
    </>
  );
}

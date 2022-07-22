import Paper from '@mui/material/Paper';
import { DisplayForm } from '../DisplayForm';

interface IProps {
  formId: string;
  boards: any[];
  onBoardsChange: (boards: any) => void;
}

export default function BoardsTab({ formId, boards = [], onBoardsChange }: IProps) {
  return (
    <Paper variant="outlined" className="p-1">
      <DisplayForm
        slug="form-boards"
        // systemValues={{ Form: formId }}
        settings={{ formView: 'button', buttonLabel: 'Add Board' }}
        valueFilter={{ 'values.form': formId }}
      />
    </Paper>
  );
}

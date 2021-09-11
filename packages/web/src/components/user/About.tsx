import Paper from '@material-ui/core/Paper';
import FieldValues from '../field/FieldValues';

export default function About({ userId, guest = false }) {
  return (
    <Paper variant="outlined" className="p-2">
      <FieldValues
        typeId="6119695c580ba8000904f06b"
        parentId={userId}
        showAuthor={false}
        guest={guest}
      />
    </Paper>
  );
}

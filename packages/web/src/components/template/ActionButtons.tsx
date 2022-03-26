import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

interface IProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ActionButtons({ onEdit, onDelete }: IProps) {
  return (
    <div className="d-flex align-content-center align-items-center">
      {onEdit && (
        <Button
          onClick={onEdit}
          className="mr-2"
          size="small"
          variant="outlined"
          component="span"
          color="primary"
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      )}
      {onDelete && (
        <Button
          onClick={onDelete}
          size="small"
          variant="outlined"
          component="span"
          color="primary"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      )}
    </div>
  );
}

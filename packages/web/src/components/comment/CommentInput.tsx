import Button from '@mui/material/Button';
import InputGroup from '../common/InputGroup';
import RichTextarea from '../common/RichTextarea2';

interface IComment {
  inputVal: string;
  onClick: any;
  handleChange: any;
  label?: string;
  loading?: boolean;
  onCancel?: () => void;
}
export default function CommentInput({
  label = 'Add Comment',
  handleChange,
  inputVal,
  onClick,
  loading,
  onCancel,
}: IComment) {
  return (
    <div>
      <RichTextarea onChange={handleChange} value={inputVal} />
      <InputGroup>
        <Button
          disabled={!inputVal || loading}
          size="small"
          onClick={onClick}
          data-testid="add-comment"
          variant="contained"
          color="primary"
        >
          {label}
        </Button>
        {onCancel && (
          <Button
            className="ml-2"
            disabled={loading}
            size="small"
            onClick={onCancel}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
        )}
      </InputGroup>
    </div>
  );
}

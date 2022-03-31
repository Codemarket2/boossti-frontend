import Button from '@mui/material/Button';
import RichTextarea from '../common/RichTextarea2';

interface IComment {
  inputVal: string;
  onClick: any;
  handleChange: any;
  label?: string;
  loading?: boolean;
}
export default function CommentInput({
  label = 'add a comment',
  handleChange,
  inputVal,
  onClick,
  loading,
}: IComment) {
  return (
    <div>
      <RichTextarea onChange={handleChange} value={inputVal} />
      <Button
        className="mt-2"
        disabled={loading}
        size="small"
        onClick={onClick}
        data-testid="add-comment"
        variant="contained"
        color="primary"
      >
        add comment
      </Button>
    </div>
  );
}

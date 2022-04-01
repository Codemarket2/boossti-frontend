import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteButton({
  onClick,
  tooltip = 'Delete',
  edge = false,
}: {
  onClick: () => void;
  tooltip?: string;
  edge?: any;
}) {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        onClick={() => {
          const anwser = confirm('Are you sure you want to delete this response');
          if (anwser) {
            onClick();
          }
        }}
        edge={edge}
        size="large"
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}

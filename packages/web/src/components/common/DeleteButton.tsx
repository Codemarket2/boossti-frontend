import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteButton({
  onClick,
  tooltip = 'Delete',
  edge = false,
  size = 'medium',
}: {
  onClick: () => void;
  tooltip?: string;
  edge?: any;
  size?: 'small' | 'medium' | 'large';
}) {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        onClick={() => {
          // eslint-disable-next-line no-restricted-globals
          const anwser = confirm('Are you sure you want to delete this response');
          if (anwser) {
            onClick();
          }
        }}
        edge={edge}
        size={size}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}

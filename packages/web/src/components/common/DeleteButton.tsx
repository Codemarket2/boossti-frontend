import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

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
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}

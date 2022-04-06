import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/Edit';

export default function Design({
  onClickVariables,
  onClickEdit,
  value = '',
}: {
  onClickVariables: any;
  onClickEdit: any;
  value: string;
}) {
  return (
    <Paper variant="outlined" className="px-2">
      <div className="d-flex align-items-center justify-content-between">
        <Typography variant="h5" className="d-flex align-items-center">
          Design
          <Tooltip title="Edit Design">
            <IconButton edge="end" onClick={onClickEdit} size="large">
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </Typography>
        <Button onClick={onClickVariables} variant="outlined" size="small" color="primary">
          Variables
        </Button>
      </div>
    </Paper>
  );
}

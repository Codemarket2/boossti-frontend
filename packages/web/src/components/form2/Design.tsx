import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/Edit';
import DisplayDesign from './DisplayDesign';

export default function Design({ onClickVariables, onClickEdit, value = '' }) {
  return (
    <Paper variant="outlined" className="px-2">
      <div className="d-flex align-items-center justify-content-between">
        <Typography variant="h5" className="d-flex align-items-center">
          Design
          <Tooltip title="Edit Design">
            <IconButton edge="end" onClick={onClickEdit}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </Typography>
        <Button onClick={onClickVariables} variant="outlined" size="small" color="primary">
          Variables
        </Button>
      </div>
      <DisplayDesign value={value} />
      <span>.</span>
    </Paper>
  );
}

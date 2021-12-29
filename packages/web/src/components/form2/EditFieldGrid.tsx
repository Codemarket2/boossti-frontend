/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RefreshIcon from '@material-ui/icons/Refresh';

type TProps = {
  field: any;
  onFieldChange: (newValue: any) => void;
  onClose: () => void;
};

const breakpoints = [
  { name: 'xs', label: 'Extra Small' },
  { name: 'sm', label: 'Small' },
  { name: 'md', label: 'Medium' },
  { name: 'lg', label: 'Large' },
  { name: 'xl', label: 'Extra Large' },
];

export default function EditFieldGrid({ onFieldChange, field, onClose }: TProps): any {
  const onOptionChange = (value) => {
    let grid = {};
    if (field?.options?.grid) {
      grid = { ...value };
    } else {
      grid = { ...field?.options?.grid, ...value };
    }
    onFieldChange({ ...field, options: { ...field.options, grid } });
  };

  const handleReset = () => {
    const conf = confirm('Are you sure you want to reset the grid');
    if (conf) {
      onFieldChange({ ...field, options: { ...field.options, grid: null } });
    }
  };

  return (
    <>
      <Typography variant="h5" className="d-flex align-items-center">
        <Tooltip title="Go Back">
          <IconButton onClick={onClose}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        {field.label}
        <Tooltip title="Reset">
          <IconButton onClick={handleReset}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Typography>
      <Divider />
      <div className="px-3">
        {breakpoints.map((point) => (
          <TextField
            key={point.name}
            className="my-2"
            fullWidth
            size="small"
            label={point.label}
            name={point.name}
            variant="outlined"
            type="number"
            value={field?.options?.grid && field?.options?.grid[point.name]}
            onChange={(e) => onOptionChange({ [point.name]: e.target.value })}
          />
        ))}
      </div>
    </>
  );
}

/* eslint-disable radix */
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import Refresh from '@mui/icons-material/Refresh';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputGroup from '../common/InputGroup';
import { defaultStyles } from './defaultStyles';

interface IProps {
  onClose: () => void;
  open: boolean;
  styles: any;
  onStyleChange: (value: any) => void;
  removeStyle: (styleKey: any) => void;
  handleResetStyle: () => void;
}

// const appendPx = (value) => `${value}px`;
const removePx = (value) => {
  if (value) {
    return parseInt(value.replace('px', ''));
  }
  return '';
};

export default function StyleDrawer({
  open,
  onClose,
  styles,
  onStyleChange,
  removeStyle,
  handleResetStyle,
}: IProps) {
  return (
    <Drawer
      ModalProps={{ BackdropProps: { invisible: true } }}
      elevation={5}
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <div style={{ minWidth: 300 }} className="p-2">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span>Styles</span>
            <IconButton onClick={handleResetStyle} size="small" edge="end">
              <Refresh />
            </IconButton>
          </div>
          <IconButton onClick={onClose} size="small" edge="end">
            <Close />
          </IconButton>
        </div>
        <InputGroup>
          <TextField
            size="small"
            type="text"
            label="Text Color"
            variant="outlined"
            fullWidth
            onChange={(e) => {
              if (e.target.value) {
                onStyleChange({ color: e.target.value });
              } else {
                removeStyle('color');
              }
            }}
            value={styles.color}
          />
        </InputGroup>
        <InputGroup>
          <TextField
            size="small"
            type="number"
            label="Font Size"
            variant="outlined"
            fullWidth
            onChange={(e) => {
              if (parseInt(e.target.value) > 0) {
                onStyleChange({ fontSize: `${e.target.value}px` });
              } else {
                removeStyle('fontSize');
              }
            }}
            value={removePx(styles.fontSize)}
          />
        </InputGroup>
        <InputGroup>
          <FormControl size="small" variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">Text Align</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={styles.textAlign || defaultStyles.textAlign}
              onChange={(e) => {
                onStyleChange({ textAlign: e.target.value });
              }}
              label="Text Align"
            >
              <MenuItem value="left">Left</MenuItem>
              <MenuItem value="center">Center</MenuItem>
              <MenuItem value="right">Right</MenuItem>
            </Select>
          </FormControl>
        </InputGroup>
        <InputGroup>
          <FormControl size="small" variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">Font Family</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={styles.fontFamily || 'systemDefault'}
              onChange={(e) => {
                if (e.target.value === 'systemDefault') {
                  removeStyle('fontFamily');
                } else if (e.target.value) {
                  onStyleChange({ fontFamily: e.target.value });
                } else {
                  removeStyle('fontFamily');
                }
              }}
              label="Font Family"
            >
              <MenuItem value="systemDefault">System Default</MenuItem>
              <MenuItem value="serif">Serif</MenuItem>
              <MenuItem value="sans-serif">Sans-serif</MenuItem>
            </Select>
          </FormControl>
        </InputGroup>
        <InputGroup>
          <TextField
            size="small"
            type="text"
            label="Background Color"
            variant="outlined"
            fullWidth
            onChange={(e) => {
              if (e.target.value) {
                onStyleChange({ backgroundColor: e.target.value });
              } else {
                removeStyle('backgroundColor');
              }
            }}
            value={styles.backgroundColor}
          />
        </InputGroup>
      </div>
    </Drawer>
  );
}

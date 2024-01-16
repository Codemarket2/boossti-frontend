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
  onStylesChange: (value: any) => void;
}

export default function StyleDrawer({ open, onClose, styles = {}, onStylesChange }: IProps) {
  // console.log(open, styles, 'open,styles');
  const onStyleChange = (newStyle) => {
    onStylesChange({ ...styles, ...newStyle });
  };
  const removeStyle = (property) => {
    const newStyles = { ...styles };
    delete newStyles?.[property];
    onStylesChange(newStyles);
  };
  const handleResetStyle = () => {
    onStylesChange({});
  };
  const handleChange = (e, isNumber?: boolean) => {
    const name = e?.target?.name;
    let value = e?.target?.value;
    if (isNumber) {
      value = value ? Number(value) : null;
    }
    onStyleChange({ [name]: value });
  };
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
          <InputLabel>Text Color</InputLabel>
          <input
            type="color"
            defaultValue="#000000"
            name="color"
            value={styles?.color}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup>
          <TextField
            size="small"
            type="number"
            label="Font Size"
            variant="outlined"
            fullWidth
            name="fontSize"
            onChange={(e) => {
              handleChange(e, true);
            }}
            value={styles.fontSize}
          />
        </InputGroup>
        <InputGroup>
          {styles.textAlign}
          <FormControl size="small" variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">Text Align</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={styles.textAlign || defaultStyles.textAlign}
              name="textAlign"
              onChange={(e) => {
                handleChange(e);
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
          <InputLabel>Background Color</InputLabel>
          <input
            type="color"
            defaultValue="#ffffff"
            value={styles?.backgroundColor}
            name="backgroundColor"
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup>
          <TextField
            size="small"
            type="number"
            label="Margin"
            variant="outlined"
            fullWidth
            name="margin"
            onChange={(e) => {
              handleChange(e, true);
            }}
            value={styles.margin}
          />
        </InputGroup>
        <InputGroup>
          <TextField
            size="small"
            type="number"
            label="Padding"
            variant="outlined"
            fullWidth
            name="padding"
            onChange={(e) => {
              handleChange(e, true);
            }}
            value={styles.padding}
          />
        </InputGroup>
      </div>
    </Drawer>
  );
}

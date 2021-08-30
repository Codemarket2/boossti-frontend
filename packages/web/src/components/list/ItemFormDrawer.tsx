import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import ItemScreen from './ItemScreen';
import { useState } from 'react';

interface IProps {
  open: boolean;
  onClose: () => void;
  typeTitle: string;
  onSelect: (arg: any) => void;
}

export default function ItemFormDrawer({ open, onClose, typeTitle = 'Item', onSelect }: IProps) {
  const [state, setState] = useState({ item: null });
  return (
    <Drawer anchor="right" open={open}>
      <div style={{ width: '75vw' }}>
        <AppBar color="transparent" position="static" elevation={1}>
          <Toolbar>
            <Typography variant="h6" className="flex-grow-1">
              Add New {typeTitle}
            </Typography>
            {state.item && (
              <Button onClick={() => onSelect(state.item)} color="primary" variant="contained">
                Select
              </Button>
            )}
            <Button className="ml-2" onClick={onClose} color="primary" variant="outlined">
              Cancel
            </Button>
          </Toolbar>
        </AppBar>
        <ItemScreen
          hideBreadcrumbs
          typeSlug="doctors"
          slug="dr.-jeff-lin-md"
          setItem={(item) => setState({ ...state, item })}
        />
      </div>
    </Drawer>
  );
}

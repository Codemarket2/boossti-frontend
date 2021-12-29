import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { useCreateListItem, useDeleteListItem } from '@frontend/shared/hooks/list';
import ItemScreen from './ItemScreen';
import Loading from '../common/Loading';
import LoadingButton from '../common/LoadingButton';
import { onAlert } from '../../utils/alert';

interface IProps {
  open: boolean;
  onClose: () => void;
  typeTitle: string;
  typeSlug: string;
  typeId: string;
  onSelect: (arg: any) => void;
}

export default function ItemFormDrawer({
  open,
  onClose,
  typeTitle = 'Item',
  typeSlug,
  onSelect,
  typeId,
}: IProps) {
  const [state, setState] = useState({ item: null, slug: null });
  const { handleCreate, createLoading } = useCreateListItem({ onAlert });
  const { handleDelete, deleteLoading } = useDeleteListItem({ onAlert });
  const createCallback = (slug) => {
    setState({ ...state, slug });
  };
  useEffect(() => {
    if (open) {
      handleCreate([typeId], createCallback);
    }
  }, [open]);

  const onSlugUpdate = (newSlug) => {
    setState({ ...state, slug: newSlug });
  };

  const handleSelect = () => {
    if (state.item.title.includes('-n-e-w')) {
      alert('Atleast add your title');
    } else {
      onSelect(state.item);
    }
  };

  return (
    <Drawer anchor="right" open={open}>
      <div style={{ width: '75vw' }}>
        <AppBar color="transparent" position="static" elevation={1}>
          <Toolbar>
            <Typography variant="h6" className="flex-grow-1">
              Add New {typeTitle}
            </Typography>
            {state.item && (
              <Button
                disabled={deleteLoading}
                onClick={handleSelect}
                color="primary"
                variant="contained"
              >
                Select
              </Button>
            )}
            <LoadingButton
              loading={deleteLoading}
              className="ml-2"
              onClick={async () => await handleDelete(state.item._id, onClose)}
              color="primary"
              variant="outlined"
            >
              Cancel
            </LoadingButton>
          </Toolbar>
        </AppBar>
        {state.slug ? (
          <ItemScreen
            hideBreadcrumbs
            slug={state.slug}
            setItem={(item) => setState({ ...state, item })}
            onSlugUpdate={onSlugUpdate}
          />
        ) : (
          <Loading />
        )}
      </div>
    </Drawer>
  );
}

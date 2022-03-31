import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useCreatePage, useDeletePage } from '@frontend/shared/hooks/template';
import ItemScreen from './PageScreen';
import Loading from '../common/Loading';
import { onAlert } from '../../utils/alert';
import Overlay from '../common/Overlay';

interface IProps {
  open: boolean;
  onClose: () => void;
  typeTitle: string;
  typeSlug: string;
  templateId: string;
  onSelect: (arg: any) => void;
}

export default function ItemFormDrawer({
  open,
  onClose,
  typeTitle = 'Item',
  typeSlug,
  onSelect,
  templateId,
}: IProps) {
  const [item, setItem] = useState(null);
  const [slug, setSlug] = useState(null);
  const { handleCreate, createLoading } = useCreatePage({ onAlert });
  const { handleDelete, deleteLoading } = useDeletePage({ onAlert });

  const createCallback = (newSlug) => {
    setSlug(newSlug);
  };

  useEffect(() => {
    if (open) {
      handleCreate(templateId, createCallback);
    }
  }, [open]);

  const handleSelect = () => {
    if (item?.title?.includes('-n-e-w')) {
      alert('Atleast add your title');
    } else {
      onSelect(item);
    }
  };

  const onClickClose = async () => {
    if (item?._id) {
      await handleDelete(item?._id, onClose);
    } else {
      onClose();
    }
  };

  return (
    <>
      <Overlay
        title={`Add new ${typeTitle}`}
        open={open}
        secondButton={
          item && (
            <Button
              disabled={deleteLoading}
              onClick={handleSelect}
              color="primary"
              variant="contained"
            >
              Select
            </Button>
          )
        }
        onClose={onClickClose}
      >
        {slug ? (
          <ItemScreen
            hideBreadcrumbs
            slug={item?.slug || slug}
            setItem={(newItem) => setItem(newItem)}
            hideleft
          />
        ) : (
          <Loading />
        )}
      </Overlay>
    </>
  );
}

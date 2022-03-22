import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import Overlay from '../common/Overlay';
import ItemScreen from './PageScreen';

interface IProps {
  title: string;
  slug: string;
}

export default function PageDrawer({ title, slug }: IProps) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Typography
        variant="h6"
        color="primary"
        onClick={() => setOpen(true)}
        style={{ cursor: 'pointer' }}
      >
        {title}
      </Typography>
      {open && (
        <Overlay open={open} onClose={() => setOpen(false)}>
          <ItemScreen hideBreadcrumbs slug={slug} hideleft />
        </Overlay>
      )}
    </div>
  );
}

import { forwardRef, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Builder from './Builder';
import Backdrop from '../common/Backdrop';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// interface IProps {
//   onClose: () => void;
// }

export default function BuilderDialog({ onClose, onSave, value, loading = false }) {
  const [showBackdrop, setShowBackdrop] = useState(false);
  return (
    <Dialog TransitionComponent={Transition} fullScreen open={true}>
      <Backdrop open={showBackdrop} />
      <Builder
        loading={loading}
        onClose={onClose}
        onSave={(htmlData) => onSave(htmlData)}
        htmlData={value}
        setShowBackdrop={() => setShowBackdrop(true)}
      />
    </Dialog>
  );
}

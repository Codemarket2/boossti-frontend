import { forwardRef } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Builder from './Builder';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// interface IProps {
//   onClose: () => void;
// }

const defaultHtmlData = `<div class="row clearfix">
<div class="column full">
    <h2 class="size-32" style="text-align: center; font-weight: 400;">Simply Beautiful</h2>
</div>
</div>
<div class="row clearfix">
<div class="column full" data-noedit="">
    <div class="spacer height-40"></div>
</div>
</div>
<div class="row clearfix">
<div class="column half">
    <img src="uploads/office2.png" alt="vivekvt">
</div><div class="column half">
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
</div>
</div>`;

export default function BuilderDialog({ onClose, onSave, value, loading = false }) {
  return (
    <Dialog TransitionComponent={Transition} fullScreen open={true}>
      <Builder
        loading={loading}
        onClose={onClose}
        onSave={(htmlData) => onSave(htmlData)}
        htmlData={defaultHtmlData}
      />
    </Dialog>
  );
}

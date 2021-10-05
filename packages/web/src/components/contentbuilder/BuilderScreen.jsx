import { useState } from 'react';
import PageView from './PageView';
import Builder from './Builder';

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

export default function BuilderScreen() {
  const [state, setState] = useState({ edit: false, htmlData: defaultHtmlData });
  return (
    <div>
      {state.edit ? (
        <Builder
          onClose={() => setState({ ...state, edit: false })}
          onSave={(htmlData) => setState({ ...state, htmlData })}
          htmlData={state.htmlData}
        />
      ) : (
        <PageView
          htmlData={state.htmlData}
          onClickEdit={() => setState({ ...state, edit: true })}
        />
      )}
    </div>
  );
}

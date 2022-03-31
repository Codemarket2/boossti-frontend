import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import { useMention } from '@frontend/shared/hooks/template';
import Skeleton from '@mui/material/Skeleton';
import Chip from '@mui/material/Chip';
import ErrorLoading from '../common/ErrorLoading';
import SelectTag from '../post/SelectTag';

const initialState = {
  showModel: false,
  templateId: '',
  title: 'Tag',
};
export default function TagTabs({ handleSelectTag }: any) {
  const [state, setState] = useState(initialState);
  const { data, loading, error } = useMention();

  if (error || !data || !data.getTemplates) {
    return (
      <ErrorLoading error={error}>
        <Skeleton variant="rectangular" height={50} />
      </ErrorLoading>
    );
  }

  return (
    <>
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        className="mt-n2"
      >
        {data.getTemplates.data.map((template) => (
          <Chip
            label={template.title.includes('-n-e-w') ? 'Title' : template.title}
            className="mt-2 mr-1"
            onClick={() =>
              setState({
                ...state,
                templateId: template._id,
                title: template.title,
                showModel: true,
              })
            }
          />
        ))}
      </Tabs>
      {state.showModel && (
        <SelectTag
          open={state.showModel}
          onClose={() => setState(initialState)}
          templateId={state.templateId}
          title={state.title}
          onSelect={(_id, title) => {
            handleSelectTag(_id, title);
            setState(initialState);
          }}
        />
      )}
    </>
  );
}

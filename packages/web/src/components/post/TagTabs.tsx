import { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import { useMentionList } from '@frontend/shared/hooks/list';
import Skeleton from '@material-ui/lab/Skeleton';
import Chip from '@material-ui/core/Chip';
import ErrorLoading from '../common/ErrorLoading';
import SelectTag from '../post/SelectTag';

const initialState = {
  showModel: false,
  typeId: '',
  title: 'Tag',
};
export default function TagTabs({ handleSelectTag }: any) {
  const [state, setState] = useState(initialState);
  const { data, loading, error } = useMentionList();

  if (error || !data || !data.getListTypes) {
    return (
      <ErrorLoading error={error}>
        <Skeleton variant="rect" height={50} />
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
        {data.getListTypes.data.map((listType) => (
          <Chip
            label={listType.title.includes('-n-e-w') ? 'Title' : listType.title}
            className="mt-2 mr-1"
            onClick={() =>
              setState({ ...state, typeId: listType._id, title: listType.title, showModel: true })
            }
          />
        ))}
      </Tabs>
      {state.showModel && (
        <SelectTag
          open={state.showModel}
          onClose={() => setState(initialState)}
          typeId={state.typeId}
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

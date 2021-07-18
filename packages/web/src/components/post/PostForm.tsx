import { MentionsInput, Mention } from 'react-mentions';
import { useRouter } from 'next/router';
import Tooltip from '@material-ui/core/Tooltip';
import { useCreatePost } from '@frontend/shared/hooks/post';
import Chip from '@material-ui/core/Chip';
import InputGroup from '../common/InputGroup';
import SelectTag from '../post/SelectTag';
import ErrorLoading from '../common/ErrorLoading';
import LoadingButton from '../common/LoadingButton';
import classNames from '../post/mention.module.css';
import { onAlert } from '../../utils/alert';

// value: "Hi @@@__drjohn^^__Dr John@@@^^^ , \n\nlet's add New person ",
export default function PostScreen({ edit = false, post, onClose }: any) {
  const router = useRouter();

  const onSuccess = () => {
    if (edit) {
      onClose();
    } else {
      router.push('/profile');
    }
  };

  const {
    state,
    setState,
    data,
    loading,
    error,
    suggestions,
    onAdd,
    handleChange,
    handleSelectTag,
    handleOpenTagModel,
    onSave,
    saveLoading,
  } = useCreatePost({ onAlert, onSuccess, edit, post });

  if (error || loading || !data) {
    return <ErrorLoading error={error} loading={loading} />;
  }

  return (
    <div>
      <SelectTag
        open={state.showTagModel}
        onClose={() => setState({ ...state, showTagModel: false })}
        selectedList={state.selectedList}
        onSelect={handleSelectTag}
      />
      <InputGroup>
        <MentionsInput
          allowSuggestionsAboveCursor
          style={{ minHeight: 100 }}
          value={state.value}
          onChange={handleChange}
          // inputRef={textArea}
          // a11ySuggestionsListLabel="ivje4vi"
          classNames={classNames}>
          <Mention
            trigger="@"
            data={suggestions}
            markup="@@@____id__^^____display__@@@^^^"
            appendSpaceOnAdd
            onAdd={onAdd}
            className={classNames.mentions__mention}
          />
        </MentionsInput>
      </InputGroup>
      <InputGroup>
        {data.getLists.data.map((list) => (
          <Tooltip key={list._id} title={`Select ${list.name}`}>
            <Chip
              onClick={() => handleOpenTagModel(list)}
              color="secondary"
              label={list.name}
              className="mr-2"
            />
          </Tooltip>
        ))}
      </InputGroup>
      <InputGroup>
        <LoadingButton
          loading={saveLoading}
          onClick={onSave}
          type="button"
          variant="contained"
          color="primary"
          fullWidth>
          POST
        </LoadingButton>
      </InputGroup>
    </div>
  );
}

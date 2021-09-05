import Divider from '@material-ui/core/Divider';
import { useCreatePost } from '@frontend/shared/hooks/post';

import InputGroup from '../common/InputGroup';
// import SelectTag from '../post/SelectTag';
import ErrorLoading from '../common/ErrorLoading';
import LoadingButton from '../common/LoadingButton';
import { onAlert } from '../../utils/alert';
import Skeleton from '@material-ui/lab/Skeleton';
import { useFacebookSDK } from '../facebook/fbsdk';
import MentionInput from '../common/MentionInput';
import ImagePicker from '../common/ImagePicker';
import TagTabs from './TagTabs';

export default function PostScreen({ post, onClose = () => {} }: any) {
  const {
    fbsdk: { fbsdkLoading, fbsdkConnected },
  } = useFacebookSDK();

  const onSuccess = () => {
    onClose();
  };

  const {
    state,
    setState,
    // data,
    // loading,
    // error,
    handleChange,
    handleSelectTag,
    handleOpenTagModel,
    onSave,
  } = useCreatePost({ onAlert, onSuccess, post });

  const postToGroup = (groupId: string, message) => {
    return new Promise((resolve, reject) => {
      window.FB.api(`/${groupId}/feed`, 'post', { message: message }, (response) => {
        if (!response || response.error) {
          reject(response.error);
        } else {
          resolve(response);
        }
      });
    });
  };

  const handleSubmit = async () => {
    if (state.body === '') {
      return alert('Enter some text');
    }

    setState({ ...state, submitLoading: true });
    if (!state.edit && fbsdkConnected) {
      const selectedGroups: any = JSON.parse(localStorage.getItem('selectedGroups'));
      if (selectedGroups && selectedGroups.length > 0) {
        let message = state.body;
        message = message.split('@@@^^^').join('');
        message = message.split('^^__');
        console.log('Message', message);
        let newMessage = '';
        message.forEach((m) => {
          m = m.split('@@@__')[0];
          newMessage += m;
        });
        newMessage += '\n\nThis post was created by Vijaa www.vijaa.com';
        selectedGroups.forEach(async (groupId) => {
          try {
            await postToGroup(groupId, newMessage);
          } catch (error) {
            alert(`Error while posting to facebook ${error.message}`);
          }
        });
      }
    }
    await onSave();
  };

  if (fbsdkLoading) {
    return (
      <ErrorLoading error={{ message: 'SOmething went wrong' }}>
        <Skeleton variant="rect" height={100} className="my-2" />
        <div className="my-2 d-flex">
          <Skeleton variant="rect" width={100} height={30} className="mr-2" />
          <Skeleton variant="rect" width={100} height={30} />
        </div>
        <Skeleton variant="rect" height={30} />
      </ErrorLoading>
    );
  }

  return (
    <div>
      {/* <SelectTag
        open={state.showTagModel}
        onClose={() => setState({ ...state, showTagModel: false })}
        selectedList={state.selectedList}
        onSelect={handleSelectTag}
      /> */}
      <InputGroup>
        <MentionInput
          onChange={handleChange}
          value={state.body}
          minHeight={100}
          placeholder="What's on your mind ?"
        />
      </InputGroup>
      <InputGroup>
        <ImagePicker state={state} setState={setState} />
      </InputGroup>
      <TagTabs handleSelectTag={handleSelectTag} />
      {/* <InputGroup>
        {data.getListTypes.data.map((list) => (
          <Tooltip key={list._id} title={`Select ${list.title}`}>
            <Chip
              onClick={() => handleOpenTagModel(list)}
              color="secondary"
              label={list.title}
              className="mr-1 mb-1"
              style={{ backgroundColor: '#f5f5f5' }}
            />
          </Tooltip>
        ))}
      </InputGroup> */}
      <InputGroup>
        <LoadingButton
          loading={state.submitLoading}
          onClick={handleSubmit}
          type="button"
          variant="contained"
          color="primary"
          fullWidth>
          {state.edit ? 'EDIT' : 'CREATE'} POST
        </LoadingButton>
      </InputGroup>
    </div>
  );
}

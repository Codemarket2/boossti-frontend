import { useEffect, useState } from 'react';
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
import Skeleton from '@material-ui/lab/Skeleton';
// import FBSettings from '../facebook/FBSettings';

// value: "Hi @@@__drjohn^^__Dr John@@@^^^ , \n\nlet's add New person ",
export default function PostScreen({ edit = false, post, onClose = () => {} }: any) {
  // const router = useRouter();
  const [fbsdk, setFbsdk] = useState({ loading: true, connected: false });
  const onSuccess = () => {
    onClose();
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

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '496030015019232',
        xfbml: true,
        version: 'v11.0',
      });
      window.FB.getLoginStatus(({ authResponse }) => {
        if (authResponse) {
          setFbsdk({ ...fbsdk, loading: false, connected: true });
        } else {
          setFbsdk({ ...fbsdk, loading: false, connected: false });
        }
      });
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  });

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
    try {
      if (state.value === '') {
        return alert('Enter some text');
      }
      if (!edit && fbsdk.connected) {
        const selectedGroups: any = JSON.parse(localStorage.getItem('selectedGroups'));
        if (selectedGroups && selectedGroups.length > 0) {
          let message = state.value;
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
    } catch (error) {
      alert(error.message);
    }
  };

  if (fbsdk.loading || error || loading || !data) {
    return (
      <ErrorLoading error={error}>
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
      <p>{fbsdk.connected.toString()}</p>
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
          placeholder="What's on your mind ?"
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
          loading={state.submitLoading}
          onClick={handleSubmit}
          type="button"
          variant="contained"
          color="primary"
          fullWidth>
          {state.edit ? 'EDIT' : 'CREATE'} POST
        </LoadingButton>
      </InputGroup>
      {/* <FBSettings /> */}
    </div>
  );
}

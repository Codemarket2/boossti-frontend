import { MentionsInput, Mention } from 'react-mentions';
import Typography from '@material-ui/core/Typography';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemText from '@material-ui/core/ListItemText';
import InputGroup from '../components/common/InputGroup';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useCreatePost } from '@frontend/shared/hooks/post';
import SelectTag from '../components/post/SelectTag';
import ErrorLoading from '../components/common/ErrorLoading';
import LoadingButton from '../components/common/LoadingButton';
import classNames from '../components/post/mention.module.css';
import { onAlert } from '../utils/alert';

// value: "Hi @@@__drjohn^^__Dr John@@@^^^ , \n\nlet's add New person ",
export default function PostScreen() {
  const router = useRouter();

  const onSuccess = () => {
    router.push('/profile');
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
  } = useCreatePost({ onAlert, onSuccess });

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
          loading={state.createPostLoading}
          onClick={onSave}
          type="button"
          variant="contained"
          color="primary"
          fullWidth>
          POST
        </LoadingButton>
      </InputGroup>
      <Menu
        anchorEl={state.showMenu}
        keepMounted
        open={Boolean(state.showMenu)}
        onClose={() => setState({ ...state, showMenu: null })}>
        <MenuItem>
          <Chip
            onClick={(event) => setState({ ...state, showMenu: event.currentTarget })}
            role="button"
            color="primary"
            label={state.selectedTag}
          />
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            alert('Tag Saved');
            setState({ ...state, showMenu: null, selectedTag: null });
          }}>
          <ListItemIcon className="mr-n4">
            <BookmarkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Save Tag" />
        </MenuItem>
      </Menu>
      {state.output && (
        <Card>
          <CardContent>
            <Typography>
              {parse(state.output, {
                replace: (domNode: any) => {
                  if (domNode.name === 'a') {
                    const node = domNode.children[0];
                    return (
                      <Tooltip title="Save Tag">
                        <Chip
                          onClick={(event) =>
                            setState({
                              ...state,
                              showMenu: event.currentTarget,
                              selectedTag: node.data,
                            })
                          }
                          role="button"
                          color="primary"
                          label={node.data}
                        />
                      </Tooltip>
                    );
                  }
                },
              })}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

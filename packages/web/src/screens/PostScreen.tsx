import { useState } from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import parse from 'html-react-parser';
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
import { useGetInUseLists } from '@frontend/shared/hooks/list';
import SelectTag from '../components/post/SelectTag';
import ErrorLoading from '../components/common/ErrorLoading';

const users = [
  {
    id: 'sumi',
    display: 'Sumi',
  },
  {
    id: 'vivekvt',
    display: 'Vivek Thakur',
  },
];

// value: "Hi @@@__vivekvt^^__Vivek Thakur@@@^^^ , \n\nlet's add New person ",
export default function PostScreen() {
  const { data, loading, error } = useGetInUseLists();
  const [state, setState] = useState({
    value: '',
    output: '',
    showMenu: null,
    selectedTag: null,
    showTagModel: false,
    selectedList: {},
  });

  const onSave = () => {
    // console.log('State', state.value);
    let newComment = state.value;
    newComment = newComment.split('@@@__').join('<a href="/user/');
    newComment = newComment.split('^^__').join('">');
    newComment = newComment.split('@@@^^^').join('</a>');
    // console.log('newComment', newComment);
    setState({ ...state, output: newComment });
  };

  if (error || loading || !data) {
    return <ErrorLoading error={error} loading={loading} />;
  }

  // console.log('Data', data.getLists.data);

  const handleOpenTagModel = (list) => {
    setState({ ...state, showTagModel: true, selectedList: list });
  };

  const handleSelectTag = (_id, name) => {
    setState({
      ...state,
      value: state.value + ` @@@__${_id}^^__${name}@@@^^^`,
      showTagModel: false,
    });
  };

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
          rows="10"
          style={{ minHeight: 100 }}
          value={state.value}
          onChange={(event) => setState({ ...state, value: event.target.value })}>
          <Mention
            trigger="@"
            data={users}
            markup="@@@____id__^^____display__@@@^^^"
            // renderSuggestion={renderUserSuggestion}
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
        <Button onClick={onSave} type="button" variant="contained" color="primary" fullWidth>
          POST
        </Button>
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
        <Tooltip title="Save Tag">
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
        </Tooltip>
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
                      //   </Link>
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

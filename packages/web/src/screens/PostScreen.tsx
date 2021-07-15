import React, { useState } from 'react';
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
import classNames from '../components/post/mention.module.css';

// value: "Hi @@@__drjohn^^__Dr John@@@^^^ , \n\nlet's add New person ",
export default function PostScreen() {
  const { data, loading, error } = useGetInUseLists();
  const [state, setState] = useState({
    value: '',
    output: '',
    showMenu: null,
    selectedTag: null,
    showTagModel: false,
    selectedList: { items: [] },
    showSubList: false,
  });

  const onSave = () => {
    let newComment = state.value;
    newComment = newComment.split('@@@__').join('<a href="/user/');
    newComment = newComment.split('^^__').join('">');
    newComment = newComment.split('@@@^^^').join('</a>');
    setState({ ...state, output: newComment });
  };

  if (error || loading || !data) {
    return <ErrorLoading error={error} loading={loading} />;
  }

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

  const handleChange = ({ target }: any) => {
    target.value = target.value.split('@@@^^^@@@__').join('@@@^^^ @@@__');
    return setState({ ...state, value: target.value, showSubList: false });
  };

  const onAdd = (id, display, startPos, endPos) => {
    if (!state.showSubList) {
      let textBeforeCursorPosition = state.value.substring(0, startPos);
      let textAfterCursorPosition = state.value.substring(startPos, endPos - 1);
      let newString =
        textBeforeCursorPosition + `@@@__${id}^^__${display}@@@^^^@` + textAfterCursorPosition;
      const selectedList = data.getLists.data.filter((list) => list._id === id)[0];
      setState({
        ...state,
        value: newString,
        selectedList,
        showSubList: true,
      });
    }
  };

  const suggestions = state.showSubList
    ? state.selectedList.items.map((item) => ({ id: item._id, display: item.title }))
    : data.getLists.data.map((list) => ({ id: list._id, display: list.name }));

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

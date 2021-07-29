import parse from 'html-react-parser';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { useCreateBookmark } from '@frontend/shared/hooks/boomark';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Chip from '@material-ui/core/Chip';
import { onAlert } from '../../utils/alert';
import Backdrop from './Backdrop';

interface IProps {
  value: string;
  variant?: any;
  component?: any;
  className?: string;
  authenticated?: boolean;
}
export default function MentionParser({
  value,
  variant = 'body2',
  component = 'p',
  className = '',
  authenticated,
}: IProps) {
  const { handleBookmark, state: bookmarkState, setState: bookmarkSetState } = useCreateBookmark({
    onAlert,
  });
  let newValue = value;
  newValue = newValue.split('@@@__').join('<a href="');
  newValue = newValue.split('^^__').join('">');
  newValue = newValue.split('@@@^^^').join('</a>');

  return (
    <>
      <Backdrop open={bookmarkState.saveTagLoading} />
      <Typography variant={variant} component={component} className={className}>
        {parse(newValue, {
          replace: (domNode: any) => {
            if (domNode.name === 'a') {
              const node = domNode.children[0];
              const tag = {
                _id: domNode.attribs.href,
                text: node.data,
              };
              return (
                <Tooltip title="Save Tag">
                  <Typography
                    className="mx-1 font-weight-bold"
                    onClick={(event) =>
                      bookmarkSetState({
                        ...bookmarkState,
                        showMenu: event.currentTarget,
                        selectedTag: tag,
                      })
                    }
                    color="primary"
                    variant="body2"
                    component="span">
                    <u style={{ cursor: 'pointer' }}>{node.data}</u>
                  </Typography>
                </Tooltip>
              );
            }
          },
        })}
        <Menu
          anchorEl={bookmarkState.showMenu}
          keepMounted
          open={Boolean(bookmarkState.showMenu)}
          onClose={() => bookmarkSetState({ ...bookmarkState, showMenu: null, selectedTag: null })}>
          <MenuItem>
            <Chip
              role="button"
              color="primary"
              label={(bookmarkState.selectedTag && bookmarkState.selectedTag.text) || ''}
            />
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={async () => {
              if (authenticated) {
                await handleBookmark();
                alert('tag saved');
              } else {
                alert('You must be signed in to save the tag');
              }
            }}>
            <ListItemIcon className="mr-n4">
              <BookmarkIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Save Tag" />
          </MenuItem>
        </Menu>
      </Typography>
    </>
  );
}

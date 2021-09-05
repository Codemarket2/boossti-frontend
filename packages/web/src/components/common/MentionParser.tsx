import parse from 'html-react-parser';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import Tooltip from '@material-ui/core/Tooltip';
import { useCreateBookmark } from '@frontend/shared/hooks/boomark';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { onAlert } from '../../utils/alert';
import Backdrop from './Backdrop';

interface IProps {
  value: string;
  variant?: any;
  component?: any;
  className?: string;
  authenticated?: boolean;
  tags?: any;
}
export default function MentionParser({
  value,
  variant = 'body2',
  component = 'p',
  className = '',
  authenticated,
  tags = [],
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
      <Typography
        data-testid="mention-parser"
        variant={variant}
        component={component}
        className={className}>
        {parse(newValue, {
          replace: (domNode: any) => {
            if (domNode.name === 'a') {
              const node = domNode.children[0];
              const tag = {
                _id: domNode.attribs.href,
                text: node.data,
              };
              return (
                <Typography
                  className="mx-1 font-weight-bold"
                  onClick={(event) => {
                    let selectedTag = tags.filter((t) => t.tag._id == tag._id)[0];
                    selectedTag = selectedTag && selectedTag.tag ? selectedTag.tag : selectedTag;
                    let url =
                      selectedTag &&
                      selectedTag.types &&
                      Object.prototype.hasOwnProperty.call(selectedTag, 'types')
                        ? `/types/${selectedTag.types[0].slug}/${selectedTag.slug}`
                        : selectedTag.slug
                        ? `/types/${selectedTag.slug}`
                        : `/types/${Date.now()}`;
                    bookmarkSetState({
                      ...bookmarkState,
                      showMenu: event.currentTarget,
                      selectedTag: tag,
                      tag: selectedTag ? selectedTag : null,
                      url: url,
                    });
                  }}
                  color="primary"
                  variant="body2"
                  component="span">
                  <u style={{ cursor: 'pointer' }}>{node.data}</u>
                </Typography>
              );
            }
          },
        })}
        <Menu
          anchorEl={bookmarkState.showMenu}
          keepMounted
          open={Boolean(bookmarkState.showMenu)}
          onClose={() => bookmarkSetState({ ...bookmarkState, showMenu: null, selectedTag: null })}>
          <Link href={bookmarkState.url}>
            <MenuItem>
              <ListItemAvatar>
                <Avatar
                  alt={bookmarkState.selectedTag && bookmarkState.selectedTag.text}
                  src={
                    bookmarkState.tag &&
                    bookmarkState.tag.media &&
                    bookmarkState.tag.media[0] &&
                    bookmarkState.tag.media[0].url
                  }
                />
              </ListItemAvatar>
              <ListItemText primary={bookmarkState.selectedTag && bookmarkState.selectedTag.text} />
            </MenuItem>
          </Link>
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

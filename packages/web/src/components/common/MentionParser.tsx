import parse from 'html-react-parser';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useCreateBookmark } from '@frontend/shared/hooks/boomark';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import BookmarkIcon from '@mui/icons-material/Bookmark';
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
        className={className}
      >
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
                        ? `/${selectedTag.template.slug}/${selectedTag.slug}`
                        : selectedTag.slug
                        ? `/${selectedTag.slug}`
                        : `/${Date.now()}`;
                    bookmarkSetState({
                      ...bookmarkState,
                      showMenu: event.currentTarget,
                      selectedTag: tag,
                      tag: selectedTag || null,
                      url,
                    });
                  }}
                  color="primary"
                  variant="body2"
                  component="span"
                >
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
          onClose={() => bookmarkSetState({ ...bookmarkState, showMenu: null, selectedTag: null })}
        >
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
            }}
          >
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

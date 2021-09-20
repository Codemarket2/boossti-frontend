import Link from 'next/link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LinkIcon from '@material-ui/icons/Link';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';

export function convertToSlug(text) {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export default function LeftNavigation({ style, slug, fields, onClick = () => {} }: any) {
  return (
    <Paper variant="outlined" style={style}>
      <List component="nav" dense>
        <ListItem>
          <ListItemIcon className="mr-n4">{<LinkIcon />}</ListItemIcon>
          <ListItemText primary="Fields" />
        </ListItem>
        <Divider />
        <ListItem button>
          <Link href={`${slug}#title`}>
            <ListItemText primary="Title" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link href={`${slug}#description`}>
            <ListItemText primary="Description" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link href={`${slug}#media`}>
            <ListItemText primary="Media" />
          </Link>
        </ListItem>
        {fields.length < 1 ? (
          <div className="px-3">
            <Skeleton height={70} />
            <Skeleton height={70} />
          </div>
        ) : (
          fields.map((fieldType) => (
            <ListItem button key={fieldType._id} onClick={onClick}>
              <Link href={`${slug}#${convertToSlug(fieldType.label)}`}>
                <ListItemText primary={fieldType.label} />
              </Link>
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
}

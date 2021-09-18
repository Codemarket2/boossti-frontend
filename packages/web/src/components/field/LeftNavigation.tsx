import Link from 'next/link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LinkIcon from '@material-ui/icons/Link';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';

export default function LeftNavigation({ style, slug, fields, onClick = () => {} }: any) {
  return (
    <Paper variant="outlined" style={style}>
      <List component="nav">
        <ListItem>
          <ListItemIcon className="mr-n4">{<LinkIcon />}</ListItemIcon>
          <ListItemText primary="Fields" />
        </ListItem>
        <Divider />
        <ListItem button>
          <Link href={`${slug}#Title`}>
            <ListItemText primary="Title" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link href={`${slug}#Description`}>
            <ListItemText primary="Description" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link href={`${slug}#Media`}>
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
              <Link href={`${slug}#${fieldType.label}`}>
                <ListItemText primary={fieldType.label} />
              </Link>
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
}

import Link from 'next/link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LinkIcon from '@material-ui/icons/Link';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import Badge from '@material-ui/core/Badge';

export function convertToSlug(text) {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

interface IProps {
  style?: any;
  slug: string;
  fields: any[];
  fieldValueCount: any;
  onClick?: () => void;
}

export default function LeftNavigation({
  style,
  slug,
  fields,
  fieldValueCount,
  onClick = () => {},
}: IProps) {
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
          fields.map((fieldType, index) => (
            <ListItem button key={fieldType._id} onClick={onClick}>
              <Link href={`${slug}#${convertToSlug(fieldType.label)}`}>
                <ListItemText primary={fieldType.label} />
              </Link>
              {fieldValueCount[index] > 0 && (
                <ListItemSecondaryAction>
                  <Badge badgeContent={fieldValueCount[index]} color="primary"></Badge>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
}

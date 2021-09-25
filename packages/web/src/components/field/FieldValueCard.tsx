import parse from 'html-react-parser';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Tooltip from '@material-ui/core/Tooltip';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import moment from 'moment';
import Link from 'next/link';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ItemScreen from '../list/ItemScreen';
import ImageList from '../post/ImageList';
import { useState } from 'react';
import CommentLikeShare from '../common/commentLikeShare/CommentLikeShare';

interface IProps {
  fieldValue: any;
  field: any;
  showAction?: boolean;
  showAuthor?: boolean;
  onSelect: (arg1: any, arg2: any) => void;
}

export default function FieldValueCard({
  fieldValue,
  field,
  showAction = false,
  showAuthor = true,
  onSelect,
}: IProps) {
  const [state, setState] = useState({
    expandedItem: false,
    itemId: '',
    expandedComments: false,
  });

  const handleExpandClick = () => {
    setState({ ...state, expandedComments: !state.expandedComments });
  };

  return (
    <Card variant="outlined">
      {field.multipleValues ? (
        showAuthor && (
          <CardHeader
            avatar={<Avatar alt={fieldValue.createdBy.name} src={fieldValue.createdBy.picture} />}
            action={
              showAction && (
                <IconButton
                  aria-label="settings"
                  onClick={(event) => onSelect(event.target, fieldValue)}>
                  <MoreVertIcon />
                </IconButton>
              )
            }
            title={
              <Link href={`/user/${fieldValue.createdBy._id}`}>{fieldValue.createdBy.name}</Link>
            }
            subheader={moment(fieldValue.createdAt).format('lll')}
          />
        )
      ) : (
        <div className="d-flex justify-content-end">
          <IconButton
            className="position-absolute"
            aria-label="settings"
            onClick={(event) => onSelect(event.target, fieldValue)}>
            <MoreVertIcon />
          </IconButton>
        </div>
      )}
      <CardContent>
        {field.fieldType === 'date' ? (
          moment(fieldValue.value).format('L')
        ) : field.fieldType === 'type' ? (
          <div>
            <Tooltip title="More Details">
              <IconButton
                edge="start"
                onClick={() =>
                  setState({
                    ...state,
                    expandedItem: !state.expandedItem,
                    itemId: fieldValue._id,
                  })
                }>
                {state.expandedItem ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Tooltip>
            <Link href={`/types/${field.typeId.slug}/${fieldValue.itemId.slug}`}>
              {fieldValue.itemId.title}
            </Link>
            <Collapse
              in={state.expandedItem && state.itemId === fieldValue._id}
              timeout="auto"
              unmountOnExit>
              <ItemScreen
                hideBreadcrumbs
                typeSlug={field.typeId.slug}
                slug={fieldValue.itemId.slug}
              />
            </Collapse>
          </div>
        ) : field.fieldType === 'url' ? (
          <a target="_blank" href={fieldValue.value}>
            {fieldValue.value}
          </a>
        ) : field.fieldType === 'media' ? (
          <ImageList media={fieldValue.media} />
        ) : field.fieldType === 'textarea' ? (
          <div className="ck-content">{parse(fieldValue.value)}</div>
        ) : (
          <Typography variant="body2" color="textSecondary" component="p">
            {fieldValue.value}
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <CommentLikeShare parentId={fieldValue._id} />
        {/* <Button
          color="primary"
          onClick={handleExpandClick}
          size="small"
          startIcon={<ChatBubbleIcon />}>
          Comments
        </Button> */}
      </CardActions>
      {/* <Collapse in={state.expandedComments} timeout="auto" unmountOnExit>
        <CardContent>
          <Comment postId={fieldValue._id} />
        </CardContent>
      </Collapse> */}
    </Card>
  );
}

import parse from 'html-react-parser';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Link from 'next/link';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';
import ImageList from './ImageList';

export default function RecipeReviewCard({ post, onClickTag, onClickMore = () => {} }: any) {
  let newBody = post.body;

  newBody = newBody.split('@@@__').join('<a href="');
  newBody = newBody.split('^^__').join('">');
  newBody = newBody.split('@@@^^^').join('</a>');

  return (
    <Card className="my-3" variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="author" alt={post.createdBy.name} src={post.createdBy.picture} />
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={(event) => onClickMore(event.currentTarget, post)}>
            <MoreVertIcon />
          </IconButton>
        }
        title={<Link href={`/user/${post.createdBy._id}`}>{post.createdBy.name}</Link>}
        subheader={
          moment(post.createdAt) > moment().subtract(7, 'days')
            ? moment(post.createdAt).fromNow()
            : moment(post.createdAt).format('LL')
        }
        // subheader={moment(post.createdAt).fromNow()}
        // subheader={moment(post.createdAt).format('LLL')}
      />
      <CardContent>
        <Typography variant="body2" component="p" className="mb-1">
          {parse(newBody, {
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
                      onClick={(event) => onClickTag(event.currentTarget, tag)}
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
        </Typography>
        <ImageList images={post.images} />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="comment">
          <ModeCommentIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

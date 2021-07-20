import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import parse from 'html-react-parser';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

// const StyledText = styled(Typography)`
//   cursor: pointer !important;
// `;

export default function RecipeReviewCard({ post, onClickTag, onClickMore = () => {} }: any) {
  const classes = useStyles();
  // const [expanded, setExpanded] = React.useState(false);

  let newBody = post.body;

  newBody = newBody.split('@@@__').join('<a href="');
  newBody = newBody.split('^^__').join('">');
  newBody = newBody.split('@@@^^^').join('</a>');

  return (
    <Card className="my-3">
      <CardHeader
        avatar={
          <Avatar
            aria-label="author"
            className={classes.avatar}
            alt={post.createdBy.name}
            src={post.createdBy.picture}
          />
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={(event) => onClickMore(event.currentTarget, post)}>
            <MoreVertIcon />
          </IconButton>
        }
        title={post.createdBy.name}
        subheader={
          moment(post.createdAt) > moment().subtract(7, 'days')
            ? moment(post.createdAt).fromNow()
            : moment(post.createdAt).format('LL')
        }
        // subheader={moment(post.createdAt).fromNow()}
        // subheader={moment(post.createdAt).format('LLL')}
      />
      <CardContent>
        <Typography variant="body2" component="p">
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
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="file">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="comment">
          <ModeCommentIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {/* <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
          <ExpandMoreIcon />
        </IconButton> */}
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse> */}
    </Card>
  );
}

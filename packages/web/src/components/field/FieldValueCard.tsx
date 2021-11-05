import { useState } from 'react';
import parse from 'html-react-parser';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import Link from 'next/link';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useRouter } from 'next/router';
import ItemScreen from '../list/ItemScreen';
import ImageList from '../post/ImageList';
import CommentLikeShare from '../common/commentLikeShare/CommentLikeShare';
import DisplayContent from '../contentbuilder/DisplayContent';
import DisplayContentBox from '../contentbox/DisplayContentBox';
import SingleComment from '../comment/SingleComment';
import { convertToSlug } from './LeftNavigation';
import { useSelector } from 'react-redux';

interface IProps {
  fieldValue: any;
  field: any;
  showAction?: boolean;
  showAuthor?: boolean;
  onSelect?: (arg1: any, arg2: any) => void;
  index?: any;
  showPreview?: boolean;
  isPublish?: boolean;
}

export default function FieldValueCard({
  fieldValue,
  field,
  showAction = false,
  showAuthor = true,
  index,
  onSelect,
  showPreview,
  isPublish,
}: IProps) {
  const [state, setState] = useState({
    expandedItem: false,
    itemId: '',
  });
  const { query } = useRouter();
  const [showHideComments, setShowHideComments] = useState(false);
  const auth = useSelector(({ auth }: any) => auth);

  return (
    <Card variant="outlined" style={{ border: 'none' }}>
      {!isPublish && (auth.isAdmin || auth.attributes['custom:_id'] === fieldValue.createdBy._id) && (
        <div className="d-flex justify-content-end">
          <IconButton
            style={{ zIndex: 9999 }}
            className="position-absolute"
            aria-label="settings"
            onClick={(event) => onSelect(event.target, fieldValue)}>
            <MoreVertIcon />
          </IconButton>
        </div>
      )}

      {/* {field.multipleValues ? (
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
      )} */}
      <CardContent className="mb-5 p-0">
        {field.fieldType === 'date' ? (
          moment(fieldValue.valueDate).format('L')
        ) : field.fieldType === 'number' ? (
          fieldValue.valueNumber
        ) : field.fieldType === 'boolean' ? (
          fieldValue.valueBoolean.toString()
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
        ) : field.fieldType === 'contentBuilder' ? (
          <DisplayContent value={fieldValue.value} />
        ) : field.fieldType === 'contentBox' ? (
          <DisplayContentBox value={fieldValue.value} />
        ) : (
          <Typography variant="body2" color="textSecondary" component="p">
            {fieldValue.value}
          </Typography>
        )}
      </CardContent>
      {!isPublish && (
        <>
          <CommentLikeShare
            showHideComments={showHideComments}
            setShowHideComments={setShowHideComments}
            parentId={fieldValue._id}
            index={index}
            itemSlug={convertToSlug(field.label)}
            fieldTitle={fieldValue?.itemId?.title?.trim().toLowerCase()}
          />
          <SingleComment
            setShowHideComments={setShowHideComments}
            _id={query.commentId as string}
            itemSlug={convertToSlug(field.label)}
            fieldTitle={fieldValue?.itemId?.title?.trim().toLowerCase()}
          />
        </>
      )}
    </Card>
  );
}

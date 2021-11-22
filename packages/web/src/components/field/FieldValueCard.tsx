import { useState } from 'react';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
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

interface IProps {
  fieldValue: any;
  field: any;
  onSelect?: (arg1: any, arg2: any) => void;
  index?: any;
  previewMode?: boolean;
}

export default function FieldValueCard({
  fieldValue,
  field,
  index,
  onSelect,
  previewMode = false,
}: IProps): any {
  const [state, setState] = useState({
    expandedItem: false,
    itemId: '',
  });
  const { query } = useRouter();
  const [showHideComments, setShowHideComments] = useState(false);
  const auth = useSelector(({ auth }: any) => auth);

  return (
    <Card variant="outlined" style={{ border: 'none' }}>
      {!previewMode && (auth.admin || auth.attributes['custom:_id'] === fieldValue.createdBy._id) && (
        <div className="d-flex justify-content-end">
          <IconButton aria-label="settings" onClick={(event) => onSelect(event.target, fieldValue)}>
            <EditIcon />
          </IconButton>
        </div>
      )}
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
                }
              >
                {state.expandedItem ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Tooltip>
            <Link href={`/types/${field.typeId.slug}/${fieldValue.itemId.slug}`}>
              {fieldValue.itemId.title}
            </Link>
            <Collapse
              in={state.expandedItem && state.itemId === fieldValue._id}
              timeout="auto"
              unmountOnExit
            >
              <ItemScreen
                hideBreadcrumbs
                typeSlug={field.typeId.slug}
                slug={fieldValue.itemId.slug}
              />
            </Collapse>
          </div>
        ) : field.fieldType === 'url' ? (
          // eslint-disable-next-line react/jsx-no-target-blank
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
      {!previewMode && (
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

import { useSelector } from 'react-redux';
import { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import { useRouter } from 'next/router';
import ImageList from '../post/ImageList';
import CommentLikeShare from '../common/commentLikeShare/CommentLikeShare';
import SingleComment from '../comment/SingleComment';
import { convertToSlug } from './LeftNavigation';
import DisplayRichText from '../common/DisplayRichText';
import ListItemDrawer from '../list/ListItemDrawer';

interface IProps {
  fieldValue: any;
  field: any;
  onSelect?: (arg1: any, arg2: any) => void;
  index?: any;
  authorized: boolean;
}

export default function FieldValueCard({
  fieldValue,
  field,
  index,
  onSelect,
  authorized = false,
}: IProps): any {
  const { query } = useRouter();
  const [showHideComments, setShowHideComments] = useState(false);
  const { attributes } = useSelector(({ auth }: any) => auth);
  const currentUserId = attributes['custom:_id'];
  return (
    <div>
      {(authorized || fieldValue.createdBy?._id === currentUserId) && (
        <div className="d-flex justify-content-end">
          <IconButton aria-label="settings" onClick={(event) => onSelect(event.target, fieldValue)}>
            <EditIcon />
          </IconButton>
        </div>
      )}
      <div>
        {field.fieldType === 'date' ? (
          moment(fieldValue.valueDate).format('L')
        ) : field.fieldType === 'number' ? (
          fieldValue.valueNumber
        ) : field.fieldType === 'boolean' ? (
          fieldValue.valueBoolean.toString()
        ) : field.fieldType === 'type' ? (
          <ListItemDrawer title={fieldValue.itemId.title} slug={fieldValue.itemId.slug} />
        ) : field.fieldType === 'url' ? (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a target="_blank" href={fieldValue.value}>
            {fieldValue.value}
          </a>
        ) : field.fieldType === 'media' ? (
          <ImageList media={fieldValue.media} />
        ) : field.fieldType === 'textarea' || field.fieldType === 'contentBox' ? (
          <DisplayRichText value={fieldValue.value} />
        ) : (
          <Typography color="textSecondary">{fieldValue.value}</Typography>
        )}
      </div>
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
        _id={query?.commentId?.toString()}
        itemSlug={convertToSlug(field.label)}
        fieldTitle={fieldValue?.itemId?.title?.trim().toLowerCase()}
      />
    </div>
  );
}

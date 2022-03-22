import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ImageList from '../post/ImageList';
import InlineForm from './InlineForm';
import MediaForm from './MediaForm';
import DisplayRichText from '../common/DisplayRichText';
import Overlay from '../common/Overlay';

interface IProps {
  open: boolean;
  onClose: () => void;
  formik: any;
  crudState: any;
  setCrudState: any;
  loading: boolean;
  data: any;
  setFields: () => void;
  state: any;
  setState: any;
  permalinkPrefix: string;
}

export default function SeoOverlay({
  onClose,
  formik,
  crudState,
  setCrudState,
  loading,
  setFields,
  data,
  open,
  state,
  setState,
  permalinkPrefix,
}: IProps) {
  const onCancel = () => {
    setState({ ...state, fieldName: '' });
  };
  const onEdit = (fieldName) => {
    setFields();
    setState({ ...state, fieldName });
  };

  return (
    <Overlay open={open} title="SEO" onClose={onClose}>
      <div className="p-3">
        <Typography>
          Description
          {state.fieldName !== 'description' && (
            <Tooltip title="Edit description">
              <IconButton size="small" onClick={() => onEdit('description')}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Typography>
        {state.fieldName === 'description' ? (
          <InlineForm
            multiline
            fieldName="description"
            label="description"
            onCancel={onCancel}
            formik={formik}
            formLoading={loading}
          />
        ) : (
          <>
            <DisplayRichText value={data.description} />
          </>
        )}
        <Typography className="mt-4">
          Media
          {state.fieldName !== 'media' && (
            <Tooltip title="Edit media">
              <IconButton size="small" onClick={() => onEdit('media')}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Typography>
        {state.fieldName === 'media' ? (
          <MediaForm
            state={crudState}
            setState={setCrudState}
            onCancel={onCancel}
            onSave={formik.handleSubmit}
            loading={loading}
          />
        ) : (
          <ImageList media={data.media} />
        )}
        <Typography className="mt-5">
          Permalink
          {state.fieldName !== 'permalink' && (
            <Tooltip title="Edit permalink">
              <IconButton size="small" onClick={() => onEdit('permalink')}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Typography>
        {state.fieldName === 'permalink' ? (
          <>
            <Typography>{`${permalinkPrefix}/${formik.values.slug}`}</Typography>
            <InlineForm
              fieldName="slug"
              label="Permalink"
              onCancel={onCancel}
              formik={formik}
              formLoading={loading}
            />
          </>
        ) : (
          <Typography variant="h6">{`${permalinkPrefix}/${data.slug}`}</Typography>
        )}
      </div>
    </Overlay>
  );
}

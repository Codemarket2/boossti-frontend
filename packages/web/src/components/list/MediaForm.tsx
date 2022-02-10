import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ImagePicker from '../common/ImagePicker';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';

interface IProps {
  setState: any;
  state: any;
  onCancel: () => void;
  onSave: () => void;
  loading: boolean;
}

export default function MediaForm({ state, setState, onCancel, onSave, loading = false }: IProps) {
  return (
    <div>
      <Tooltip title="Save">
        <LoadingButton
          loading={loading}
          onClick={onSave}
          className="mr-2"
          size="small"
          variant="contained"
          type="button"
          color="primary"
        >
          Save
        </LoadingButton>
      </Tooltip>
      <Tooltip title="Cancel">
        <Button
          disabled={loading}
          onClick={onCancel}
          size="small"
          variant="outlined"
          component="span"
          color="primary"
        >
          Cancel
        </Button>
      </Tooltip>
      <InputGroup>
        <ImagePicker state={state} setState={setState} fileType="image/*" />
      </InputGroup>
    </div>
  );
}

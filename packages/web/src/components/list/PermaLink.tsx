import Button from '@material-ui/core/Button';
import { useState } from 'react';
import slugify from 'slugify';
import InputGroup from '../common/InputGroup';
import LoadingButton from '../common/LoadingButton';

interface IProps {
  fieldName: string;
  onCancel: () => void;
  setSeoState?: any;
  seoState?: any;
  multiline?: boolean;
  formik: any;
  formLoading?: boolean;
}

export default function PermaLink({
  onCancel,
  formik,
  fieldName,
  seoState,
  setSeoState,
  formLoading = false,
}: IProps) {
  const [permaLink, setPermaLink] = useState(
    formik?.values[fieldName]?.includes('-n-e-w') ? '' : formik?.values[fieldName],
  );
  return (
    <div>
      <h4>{window.location.href}</h4>
      <form onSubmit={formik.handleSubmit}>
        <InputGroup>
          <input
            name={fieldName}
            disabled={formik.isSubmitting}
            className="form-control"
            value={permaLink}
            placeholder="Enter text"
            onChange={(e) => {
              setPermaLink(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup>
          <LoadingButton
            onClick={() => {
              formik.setFieldValue(fieldName, slugify(permaLink, { lower: true }));
            }}
            type="submit"
            loading={formLoading}
            size="small"
          >
            Save
          </LoadingButton>
          <Button
            className="ml-2"
            disabled={formLoading}
            variant="outlined"
            size="small"
            onClick={() => {
              setSeoState({ ...seoState, permaLink: false });
            }}
          >
            Cancel
          </Button>
        </InputGroup>
      </form>
    </div>
  );
}

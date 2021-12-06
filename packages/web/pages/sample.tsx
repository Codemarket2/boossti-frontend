import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useGetFieldValue } from '@frontend/shared/hooks/field';
import ErrorLoading from '../src/components/common/ErrorLoading';
import InputGroup from '../src/components/common/InputGroup';
import DisplayContentBox from '../src/components/contentbox/DisplayContentBox';

const _id = '61a655debd9a5c0009a653de';

const image =
  'https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/adult-1868750_1920-EzivE1.jpg';

export default function sample() {
  const { data, error, loading } = useGetFieldValue(_id);
  const [state, setState] = useState({
    name: 'David Smith',
    image,
    email: 'contact@davidsmith.com',
  });

  const onChange = ({ target }) => setState({ ...state, [target.name]: target.value });

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  let newValue = data?.getFieldValue?.value?.split(`{{name}}`).join(state.name || 'Your Name');
  newValue = newValue?.split(`{{email}}`).join(state.email || 'Your Email');
  newValue = newValue?.split(image).join(state.image || image);

  return (
    <Grid container>
      <Grid item xs={4}>
        <div className="p-5">
          <InputGroup>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              name="name"
              value={state.name}
              onChange={onChange}
            />
          </InputGroup>
          <InputGroup>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={state.email}
              onChange={onChange}
            />
          </InputGroup>
          <InputGroup>
            <input
              accept="image/*"
              className="d-none"
              id="contained-button-file"
              type="file"
              onChange={(event) =>
                setState({ ...state, image: URL.createObjectURL(event?.target?.files[0]) })
              }
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                startIcon={<PhotoCamera />}
              >
                Image
              </Button>
            </label>
          </InputGroup>
        </div>
      </Grid>
      <Grid item xs={8}>
        <DisplayContentBox value={newValue} />
      </Grid>
    </Grid>
  );
}

import Edit from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import InputGroup from '../../common/InputGroup';

interface Credentials {
  apiKey: string;
  apiSecret: string;
}

interface Shopify {
  credentials: Credentials;
}

interface IProps {
  shopify: Shopify;
  onShopifyChange: (arg: Shopify) => void;
}

const initialState = { edit: false, apiKey: '', apiSecret: '' };

export default function ShopifySettings({ shopify, onShopifyChange }: IProps) {
  const [state, setState] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    onShopifyChange({
      ...shopify,
      credentials: { apiKey: state.apiKey, apiSecret: state.apiSecret },
    });
    setState(initialState);
  };

  return (
    <Paper variant="outlined" className="p-2">
      {state?.edit ? (
        <form onSubmit={handleSubmit}>
          <Typography>Edit Credentials</Typography>
          <InputGroup>
            <TextField
              size="small"
              fullWidth
              label="API Key"
              required
              value={state.apiKey}
              onChange={({ target }) => setState({ ...state, apiKey: target.value })}
            />
          </InputGroup>
          <InputGroup>
            <TextField
              size="small"
              fullWidth
              label="API Secret"
              required
              value={state.apiSecret}
              onChange={({ target }) => setState({ ...state, apiSecret: target.value })}
            />
          </InputGroup>
          <Button type="submit" variant="contained" size="small">
            Save
          </Button>
          <Button
            onClick={() => setState(initialState)}
            variant="outlined"
            size="small"
            className="ml-2"
          >
            Cancel
          </Button>
        </form>
      ) : (
        <>
          <Typography variant="h6">
            Shopify App Credentials
            <IconButton
              onClick={() =>
                setState({
                  ...state,
                  edit: true,
                  apiKey: shopify?.credentials?.apiKey || '',
                  apiSecret: shopify?.credentials?.apiSecret || '',
                })
              }
            >
              <Edit />
            </IconButton>
          </Typography>
          <Typography>API Key - {shopify?.credentials?.apiKey || 'na'}</Typography>
          <Typography>API Secret - {shopify?.credentials?.apiSecret || 'na'}</Typography>
        </>
      )}
    </Paper>
  );
}

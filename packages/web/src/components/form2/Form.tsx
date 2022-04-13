import { useRouter } from 'next/router';
import { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Tooltip from '@mui/material/Tooltip';
import { useUpdateForm, useDeleteForm } from '@frontend/shared/hooks/form';
import { useAuthorization } from '@frontend/shared/hooks/auth';
import Link from 'next/link';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import ErrorLoading from '../common/ErrorLoading';
import Breadcrumbs from '../common/Breadcrumbs';
import Backdrop from '../common/Backdrop';
import FormFields from './FormFields';
import FormView from './FormView';
import FormSetting from './FormSetting';
import ResponseList from '../response/ResponseList';
import Actions from './Actions';
import { onAlert } from '../../utils/alert';
import InlineInput from '../common/InlineInput';
import { QRButton } from '../qrcode/QRButton';
import ResponseLayout from '../response/ResponseLayout';
import BulkUploadAction from './BulkUploadAction';
import NotFound from '../common/NotFound';
import UnAuthorised from '../common/UnAuthorised';

interface IProps {
  _id: string;
  drawerMode?: boolean;
  onSlugChange?: (newSlug: string) => void;
}

export default function Form({ _id, drawerMode = false, onSlugChange }: IProps): any {
  const { error, state, handleOnChange, updateLoading, handleUpdateName } = useUpdateForm({
    onAlert,
    _id,
  });
  const { handleDelete } = useDeleteForm({
    onAlert,
  });

  const [options, setOptions] = useState({
    currentTab: 'preview',
    snackBar: '',
    backdrop: false,
  });

  const router = useRouter();
  const authorized = useAuthorization([state?.createdBy?._id], true);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window?.location?.href);
    setOptions({
      ...options,
      snackBar: 'Link copied to clipboard',
    });
  };
  const handlePublish = () => {
    setOptions({
      ...options,
      snackBar: state?.settings?.published
        ? 'Successfully unpublished the form'
        : 'Successfully published the form',
    });
    handleOnChange({
      settings: {
        ...state.settings,
        published: Boolean(!state?.settings?.published),
      },
    });
  };

  const onDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    const anwser = confirm('Are you sure you want to delete this form?');
    if (anwser) {
      setOptions({
        ...options,
        backdrop: true,
      });
      handleDelete(_id, () => router.push('/forms'));
    }
  };

  if (error || !state) {
    return <ErrorLoading error={error} />;
  }

  if (authorized) {
    return (
      <>
        {options.backdrop && <Backdrop open />}
        <div style={{ width: '100%' }}>
          <Snackbar
            open={Boolean(options.snackBar)}
            autoHideDuration={4000}
            onClose={() => setOptions({ ...options, snackBar: '' })}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={() => setOptions({ ...options, snackBar: '' })} severity="success">
              {options.snackBar}
            </Alert>
          </Snackbar>
          {drawerMode ? ( 
            <Typography variant="h5" className="py-2">
              <InlineInput
                placeholder="Form Name"
                value={state?.name}
                onChange={(e) => handleOnChange({ name: e.target.value })}
              />
            </Typography>
          ) : (
            <div className="d-sm-flex justify-content-between align-items-center">
              <Breadcrumbs>
                <Link href="/forms">Forms</Link>
                <InlineInput
                  placeholder="Form Name"
                  value={state?.name}
                  onChange={async (e) => {
                    setOptions({ ...options, backdrop: true });
                    const newSlug = await handleUpdateName(e.target.value);
                    setOptions({ ...options, backdrop: false });
                    if (newSlug && onSlugChange) {
                      onSlugChange(newSlug);
                    }
                  }}
                />
              </Breadcrumbs>
              <div className="d-flex  align-items-center">
                {updateLoading && <CircularProgress size={25} />}
                <QRButton />
                <Tooltip title="Copy form link">
                  <IconButton className="ml-2" onClick={handleCopyLink} size="large">
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
                <FormControlLabel
                  className="m-0"
                  control={
                    <Switch
                      color="primary"
                      checked={state?.settings?.published}
                      onChange={handlePublish}
                    />
                  }
                  label="Publish"
                />
                <Tooltip title="Delete">
                  <IconButton edge="end" onClick={onDelete} size="large">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          )}
          <Grid container spacing={1} style={{ minHeight: 'calc(100vh - 130px)' }}>
            <Grid item xs={12} md={4}>
              <FormFields
                fields={state.fields}
                setFields={(newFields) => handleOnChange({ fields: newFields })}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper variant="outlined">
                <Tabs
                  variant="scrollable"
                  value={options.currentTab}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={(event, newValue) => setOptions({ ...options, currentTab: newValue })}
                >
                  <Tab label="Preview" value="preview" />
                  <Tab label="Settings" value="settings" />
                  <Tab label="Actions" value="actions" />
                  <Tab label="Workflows" value="workflows" />
                  <Tab label="Responses" value="responses" />
                </Tabs>
              </Paper>
              {options.currentTab === 'preview' && (
                <Paper variant="outlined" className="px-2">
                  <FormView form={state} />
                </Paper>
              )}
              {options.currentTab === 'settings' && (
                <>
                  <FormSetting
                    formId={_id}
                    settings={state.settings}
                    handleOnChange={handleOnChange}
                    state={state}
                    onChange={(settings) =>
                      handleOnChange({
                        settings: { ...state.settings, ...settings },
                      })
                    }
                  />
                </>
              )}
              {options.currentTab === 'workflows' && <ResponseLayout _id={_id} />}
              {options.currentTab === 'responses' && <ResponseList form={state} />}
              {options.currentTab === 'actions' && (
                <>
                  <Actions
                    fields={state?.fields}
                    settings={state?.settings}
                    onChange={(actions) =>
                      handleOnChange({
                        settings: { ...state.settings, actions },
                      })
                    }
                  />
                  <Paper variant="outlined">
                    <BulkUploadAction form={state} />
                  </Paper>
                </>
              )}
            </Grid>
          </Grid>
        </div>
      </>
    );
  }

  if (
    state?.settings?.published &&
    (state?.settings?.whoCanViewResponses === 'all' || state?.settings?.whoCanSubmit === 'all')
  ) {
    return (
      <Container>
        <FormView form={state} />
      </Container>
    );
  }

  if (state?.settings?.published) {
    return <UnAuthorised />;
  }

  return <NotFound />;
}

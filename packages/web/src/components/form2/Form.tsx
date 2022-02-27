import { useRouter } from 'next/router';
import { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import { useUpdateForm, useDeleteForm } from '@frontend/shared/hooks/form';
import Link from 'next/link';
import ErrorLoading from '../common/ErrorLoading';
import Breadcrumbs from '../common/Breadcrumbs';
import Backdrop from '../common/Backdrop';
import FormFields from './FormFields';
import FormView from './FormView';
import FormSetting from './FormSetting';
import ResponseList from '../response/ResponseList';
import Actions from './Actions';
import { onAlert } from '../../utils/alert';
import Authorization from '../common/Authorization';
import InlineInput from '../common/InlineInput';
import { QRButton } from '../qrcode/QRButton';
import ResponseLayout from '../response/ResponseLayout';
import { useSelector } from 'react-redux';

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
  const { admin = false } = useSelector(({ auth }: any) => auth);
  const { handleDelete } = useDeleteForm({
    onAlert,
  });

  const [options, setOptions] = useState({
    currentTab: 'preview',
    snackBar: '',
    backdrop: false,
  });

  const router = useRouter();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window?.location?.href?.replace('forms', 'form'));
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

  if (!state?.settings?.ViewAuthRequired && !admin) {
    return (
      <div style={{ width: '100%' }}>
        <FormView form={state} />
      </div>
    );
  } else {
    return (
      <Authorization _id={[state?.createdBy?._id]} allowAdmin>
        {state?.settings?.ViewAuthRequired}
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
                  <IconButton className="ml-2" onClick={handleCopyLink}>
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
                  <IconButton edge="end" onClick={onDelete}>
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
                  <Tab label="Responses" value="responses" />
                  {/* <Tab label="Design" value="design" /> */}
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
                    settings={state.settings}
                    onChange={(settings) =>
                      handleOnChange({
                        settings: { ...state.settings, ...settings },
                      })
                    }
                  />
                  <ResponseLayout _id={_id} />
                </>
              )}
              {options.currentTab === 'responses' && <ResponseList form={state} />}
              {options.currentTab === 'actions' && (
                <Actions
                  form={state}
                  onChange={(actions) =>
                    handleOnChange({
                      settings: { ...state.settings, actions },
                    })
                  }
                />
              )}
            </Grid>
          </Grid>
        </div>
      </Authorization>
    );
  }
}

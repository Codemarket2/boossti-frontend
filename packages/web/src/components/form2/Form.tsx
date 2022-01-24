import { useRouter } from 'next/router';
import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
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
import ResponseList from './ResponseList';
import Actions from './Actions';
// import DesignTab from './DesignTab';
import { onAlert } from '../../utils/alert';
import Authorization from '../common/Authorization';
import InlineInput from '../common/InlineInput';

interface IProps {
  _id: string;
  drawerMode?: boolean;
}

export default function Form({ _id, drawerMode = false }: IProps): any {
  const { error, state, handleOnChange, updateLoading } = useUpdateForm({
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

  const NameInput = (
    <InlineInput
      width="100%"
      placeholder="Form Name"
      value={state?.name}
      onChange={(e) => handleOnChange({ name: e.target.value })}
    />
  );

  return (
    <Authorization _id={[state?.createdBy?._id]} allowAdmin>
      {options.backdrop && <Backdrop open />}
      <div>
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
            {NameInput}
          </Typography>
        ) : (
          <div className="d-flex justify-content-between align-items-center my-1">
            <Breadcrumbs>
              <Link href="/forms">Forms</Link>
              {NameInput}
            </Breadcrumbs>
            <div className="d-flex  align-items-center">
              {updateLoading && <CircularProgress size={25} />}
              {state?.settings?.published && (
                <Tooltip title="Copy form link">
                  <IconButton className="ml-2" onClick={handleCopyLink}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Button
                variant="outlined"
                color="primary"
                size="small"
                className="mx-2"
                onClick={handlePublish}
              >
                {state?.settings?.published ? 'Unpublish' : 'Publish'}
              </Button>
              <Button variant="outlined" color="primary" size="small" onClick={onDelete}>
                Delete
              </Button>
            </div>
          </div>
        )}
        <Grid container spacing={1} style={{ minHeight: 'calc(100vh - 130px)' }}>
          <Grid item xs={4}>
            <FormFields
              fields={state.fields}
              setFields={(newFields) => handleOnChange({ fields: newFields })}
            />
          </Grid>
          <Grid item xs={8}>
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
              <FormSetting
                settings={state.settings}
                onChange={(settings) =>
                  handleOnChange({
                    settings: { ...state.settings, ...settings },
                  })
                }
              />
            )}
            {options.currentTab === 'responses' && <ResponseList form={state} />}
            {/* {options.currentTab === 'design' && (
              <DesignTab
                form={state}
                onChange={(design) =>
                  setState({
                    ...state,
                    settings: { ...state.settings, design },
                  })
                }
              />
            )} */}
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

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
import Permissions from './Permissions';
import AuditLog from '../auditLog/AuditLog';
import Constraints from './Constraints/Constraints';
import ShopifySettings from './shopify/ShopifySettings';
import BoardsTab from './board/BoardsTab';

interface IProps {
  _id: string;
  drawerMode?: boolean;
  onSlugChange?: (newSlug: string) => void;
  hideFields?: boolean;
}

const tabs = [
  'Preview',
  'Settings',
  'Actions',
  'Workflows',
  'Responses',
  'Boards',
  'Activity',
  'Constraints',
  'Shopify',
];

export default function Form({ _id, drawerMode = false, onSlugChange, hideFields }: IProps): any {
  const { error, state, handleOnChange, updateLoading, handleUpdateName } = useUpdateForm({
    onAlert,
    _id,
  });
  const { handleDelete } = useDeleteForm({
    onAlert,
  });

  const [options, setOptions] = useState({
    currentTab: 'Preview',
    snackBar: '',
    backdrop: false,
  });

  const router = useRouter();
  const authorized = useAuthorization([state?.createdBy?._id], true);

  useEffect(() => {
    if (router?.query?.tab) {
      setOptions({ ...options, currentTab: router?.query?.tab?.toString() });
    }
  }, [router?.query?.tab]);

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
          <Grid container spacing={1}>
            {!hideFields && (
              <Grid item xs={12} sm={4}>
                <FormFields
                  fields={state.fields}
                  setFields={(newFields) => handleOnChange({ fields: newFields })}
                  parentFields={state.fields?.map((f) => ({
                    ...f,
                    formId: state._id,
                    label: `${state?.name} - ${f?.label}`,
                  }))}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={hideFields ? 12 : 8}>
              <Paper variant="outlined">
                <Tabs
                  variant="scrollable"
                  value={options.currentTab}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={(event, newValue) => {
                    router.query.tab = newValue;
                    router.push(router);
                  }}
                >
                  {tabs.map((label) => (
                    <Tab key={label} label={label} value={label} />
                  ))}
                  {state?.name?.toUpperCase().includes('ROLE') && (
                    <Tab label="Permissions" value="permissions" />
                  )}
                </Tabs>
              </Paper>
              {options.currentTab === 'Preview' && (
                <Paper variant="outlined" className="px-2">
                  <FormView
                    form={{ ...state, settings: { ...state.settings, widgetType: 'form' } }}
                  />
                </Paper>
              )}
              {options.currentTab === 'Settings' && (
                <>
                  <FormSetting
                    formId={_id}
                    settings={state.settings}
                    state={state}
                    onChange={(settings) =>
                      handleOnChange({
                        settings: { ...state.settings, ...settings },
                      })
                    }
                  />
                </>
              )}
              {options.currentTab === 'Workflows' && <ResponseLayout _id={_id} />}
              {options.currentTab === 'Responses' && (
                <>
                  <Paper variant="outlined">
                    <BulkUploadAction form={state} />
                  </Paper>
                  <ResponseList form={state} />
                </>
              )}
              {options.currentTab === 'Actions' && (
                <Actions
                  fields={state?.fields}
                  settings={state?.settings}
                  onChange={(actions) =>
                    handleOnChange({
                      settings: { ...state.settings, actions },
                    })
                  }
                />
              )}
              {options.currentTab === 'Permissions' && <Permissions formId={_id} form={state} />}
              {options.currentTab === 'Activity' && <AuditLog documentId={_id} formId={_id} />}
              {options.currentTab === 'Constraints' && (
                <Constraints
                  form={state}
                  onConstraintChange={(constraints) => {
                    handleOnChange({
                      settings: { ...state.settings, constraints },
                    });
                  }}
                />
              )}
              {options.currentTab === 'Shopify' && (
                <ShopifySettings
                  shopify={state?.settings?.shopify}
                  onShopifyChange={(shopify) =>
                    handleOnChange({ settings: { ...state.settings, shopify } })
                  }
                />
              )}
              {options.currentTab === 'Boards' && (
                <BoardsTab
                  formId={state?._id}
                  boards={state?.settings?.boards}
                  onBoardsChange={(boards) =>
                    handleOnChange({ settings: { ...state.settings, boards } })
                  }
                />
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

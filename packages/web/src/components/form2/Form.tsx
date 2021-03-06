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
import { IForm } from '@frontend/shared/types/form';
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
import Workflows from '../response/Workflows';
import BulkUploadAction from './BulkUploadAction';
import NotFound from '../common/NotFound';
import UnAuthorised from '../common/UnAuthorised';
import Permissions from './Permissions';
import AuditLog from '../auditLog/AuditLog';
import Conditions from './conditions/Conditions';
import ShopifySettings from './shopify/ShopifySettings';
import BoardsTab from './board/BoardsTab';
import DesignTab from './design/DesignTab';

interface IProps {
  form: IForm;
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
  'Design',
  'Boards',
  'Activity',
  'Conditions',
  'Shopify',
];

export default function Form({ form, drawerMode = false, onSlugChange, hideFields }: IProps): any {
  const { handleOnChange, updateLoading, handleUpdateName } = useUpdateForm({
    onAlert,
    form,
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
  const authorized = useAuthorization([form?.createdBy?._id], true);

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
      snackBar: form?.settings?.published
        ? 'Successfully unpublished the form'
        : 'Successfully published the form',
    });
    handleOnChange({
      settings: {
        ...form.settings,
        published: Boolean(!form?.settings?.published),
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
      handleDelete(form?._id, () => router.push('/forms'));
    }
  };

  if (!form) {
    return <ErrorLoading />;
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
                value={form?.name}
                onChange={(e) => handleOnChange({ name: e.target.value })}
              />
            </Typography>
          ) : (
            <div className="d-sm-flex justify-content-between align-items-center">
              <Breadcrumbs>
                <Link href="/forms">Forms</Link>
                <InlineInput
                  placeholder="Form Name"
                  value={form?.name}
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
                      checked={form?.settings?.published}
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
                  fields={form.fields}
                  setFields={(newFields) => handleOnChange({ fields: newFields })}
                  parentFields={form.fields?.map((f) => ({
                    ...f,
                    formId: form._id,
                    label: f?.label,
                    formName: form?.name,
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
                  {form?.name?.toUpperCase().includes('ROLE') && (
                    <Tab label="Permissions" value="permissions" />
                  )}
                </Tabs>
              </Paper>
              {options.currentTab === 'Preview' && (
                <Paper variant="outlined" className="px-2">
                  <FormView
                    form={{ ...form, settings: { ...form.settings, widgetType: 'form' } }}
                  />
                </Paper>
              )}
              {options.currentTab === 'Settings' && (
                <>
                  <FormSetting
                    formId={form?._id}
                    settings={form.settings}
                    state={form}
                    onChange={(settings) =>
                      handleOnChange({
                        settings: { ...form.settings, ...settings },
                      })
                    }
                  />
                </>
              )}
              {options.currentTab === 'Workflows' && <Workflows _id={form?._id} />}
              {options.currentTab === 'Responses' && (
                <>
                  <Paper variant="outlined">
                    <BulkUploadAction form={form} />
                  </Paper>
                  <ResponseList form={form} />
                </>
              )}
              {options.currentTab === 'Design' && (
                <DesignTab
                  form={form}
                  onChange={(newForm) =>
                    handleOnChange({
                      ...form,
                      ...newForm,
                    })
                  }
                />
              )}
              {options.currentTab === 'Actions' && (
                <Actions
                  fields={form?.fields}
                  settings={form?.settings}
                  onChange={(actions) =>
                    handleOnChange({
                      settings: { ...form.settings, actions },
                    })
                  }
                />
              )}
              {options.currentTab === 'Permissions' && (
                <Permissions formId={form?._id} form={form} />
              )}
              {options.currentTab === 'Activity' && (
                <AuditLog documentId={form?._id} formId={form?._id} />
              )}
              {options.currentTab === 'Conditions' && (
                <Conditions
                  form={form}
                  onConditionsChange={(conditions) => {
                    handleOnChange({
                      settings: { ...form.settings, conditions },
                    });
                  }}
                  onFieldsChange={(newFields) =>
                    handleOnChange({
                      fields: newFields,
                    })
                  }
                />
              )}
              {options.currentTab === 'Shopify' && (
                <ShopifySettings
                  shopify={form?.settings?.shopify}
                  onShopifyChange={(shopify) =>
                    handleOnChange({ settings: { ...form.settings, shopify } })
                  }
                />
              )}
              {options.currentTab === 'Boards' && (
                <BoardsTab
                  formId={form?._id}
                  boards={form?.settings?.boards}
                  onBoardsChange={(boards) =>
                    handleOnChange({ settings: { ...form.settings, boards } })
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
    form?.settings?.published &&
    (form?.settings?.whoCanViewResponses === 'all' || form?.settings?.whoCanSubmit === 'all')
  ) {
    return (
      <Container>
        <FormView form={form} />
      </Container>
    );
  }

  if (form?.settings?.published) {
    return <UnAuthorised />;
  }

  return <NotFound />;
}

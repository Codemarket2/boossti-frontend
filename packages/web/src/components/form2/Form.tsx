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
import { useUpdateForm, useDeleteForm, useGetFormTabs } from '@frontend/shared/hooks/form';
import { useAuthorization } from '@frontend/shared/hooks/auth';
import Link from 'next/link';
import Container from '@mui/material/Container';
import AddCircle from '@mui/icons-material/AddCircle';
import { IForm } from '@frontend/shared/types/form';
import slugify from 'slugify';
import { useSelector } from 'react-redux';
import ErrorLoading from '../common/ErrorLoading';
import Breadcrumbs from '../common/Breadcrumbs';
import Backdrop from '../common/Backdrop';
import FormFields from './FormFields';
import FormView from './FormView';
import FormSetting from './FormSetting';
import ResponseList, { IResponseList } from '../response/ResponseList';
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
import FormConstraints from './form-conditions/FormConstraints';
import ShopifySettings from './shopify/ShopifySettings';
import DesignTab from './design/DesignTab';
import RelationFields from './RelationFields';
import TabsList from './tabs/TabsList';
import TabView from './tabs/TabView';

const tabs = [
  'Fields',
  'Preview',
  'Settings',
  'Actions',
  'Workflows',
  'Responses',
  'Design',
  'Activity',
  'Conditions',
  'Shopify',
];

const initialState = {
  currentTab: 'Fields',
  snackBar: '',
  backdrop: false,
  formTabs: false,
  showFields: true,
};

interface IFormProps {
  form: IForm;
  drawerMode?: boolean;
  onSlugChange?: (newSlug: string) => void;
  responseListProps?: Partial<IResponseList>;
}

export default function Form({
  form,
  drawerMode = false,
  onSlugChange,
  responseListProps,
}: IFormProps): any {
  const {
    handleOnChange,
    handleOnSettingsChange,
    updateLoading,
    handleUpdateForm,
    settings,
  } = useUpdateForm({
    onAlert,
    form,
  });

  const { handleDelete } = useDeleteForm({
    onAlert,
  });
  const { formAllTabs } = useGetFormTabs(form?._id);
  const [options, setOptions] = useState(initialState);

  const router = useRouter();
  const authorized = useAuthorization([form?.createdBy?._id], true);
  const authenticated = useSelector((state: any) => state?.auth?.authenticated);

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
      snackBar: settings?.published
        ? 'Successfully unpublished the form'
        : 'Successfully published the form',
    });
    handleOnSettingsChange({
      published: Boolean(!settings?.published),
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
                <Link href="/feed">Forms</Link>
                <InlineInput
                  placeholder="Form Name"
                  value={form?.name}
                  onChange={async (e) => {
                    setOptions({ ...options, backdrop: true });
                    const updatedForm = await handleUpdateForm({ name: e.target.value });
                    setOptions({ ...options, backdrop: false });
                    if (updatedForm?.slug && onSlugChange) {
                      onSlugChange(updatedForm?.slug);
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
                      checked={settings?.published}
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
            {/* {!hideFields && (
              <Grid item xs={12} sm={4}>
                Fields
              </Grid>
            )} */}
            <Grid item xs={12} sm={options.formTabs ? 9 : 12}>
              {/* sm={hideFields ? 12 : options.formTabs ? 5 : 8} */}
              <Paper variant="outlined" className="d-flex align-item-center">
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
                  {formAllTabs?.map((tab) => (
                    <Tab
                      key={tab?._id}
                      label={tab?.label || 'NA'}
                      value={slugify(tab?.label, { lower: true })}
                    />
                  ))}
                  {settings?.tabs?.map((tab) => (
                    <Tab
                      key={tab?._id}
                      label={tab?.label || 'NA'}
                      value={slugify(tab?.label, { lower: true })}
                    />
                  ))}
                </Tabs>
                {!options?.formTabs && (
                  <Tooltip title="Add Tab">
                    <IconButton
                      color="primary"
                      onClick={() => setOptions({ ...options, formTabs: !options?.formTabs })}
                    >
                      <AddCircle />
                    </IconButton>
                  </Tooltip>
                )}
              </Paper>
              {options.currentTab === 'Fields' && (
                <>
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
                  <RelationFields formId={form?._id} />
                </>
              )}
              {options.currentTab === 'Preview' && (
                <Paper variant="outlined" className="px-2">
                  <FormView
                    {...responseListProps}
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
                    onChange={
                      (newSettings) => handleOnSettingsChange(newSettings)
                      // handleOnChange({
                      //   settings: { ...form.settings, ...settings },
                      // })
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
                  <ResponseList {...responseListProps} form={form} />
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
                  formId={form?._id}
                  fields={form?.fields}
                  settings={settings}
                  onChange={
                    (actions) => handleOnSettingsChange({ actions })
                    // handleOnChange({
                    //   settings: { ...form.settings, actions },
                    // })
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
                <FormConstraints
                  form={form}
                  onConstraintsChange={(constraints) => {
                    handleOnSettingsChange({ constraints });
                    // handleOnChange({
                    //   settings: { ...form.settings, constraints },
                    // });
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
                  shopify={settings?.shopify}
                  onShopifyChange={
                    (shopify) => handleOnSettingsChange({ shopify })
                    // handleOnChange({ settings: { ...form.settings, shopify } })
                  }
                />
              )}
              {[...(formAllTabs || []), ...(settings?.tabs || [])]?.some(
                (tab) => slugify(tab?.label, { lower: true }) === options.currentTab,
              ) && (
                <TabView
                  formId={form?._id}
                  tab={[...(formAllTabs || []), ...(settings?.tabs || [])]?.find(
                    (tab) => slugify(tab?.label, { lower: true }) === options.currentTab,
                  )}
                />
              )}
            </Grid>
            {options.formTabs && (
              <Grid item xs={12} sm={3}>
                <TabsList
                  formAllTabs={formAllTabs}
                  formId={form?._id}
                  tabs={form?.settings?.tabs}
                  onClose={() => setOptions({ ...options, formTabs: false })}
                  onTabsChange={(newTabs) =>
                    handleOnChange({
                      settings: { ...form.settings, tabs: newTabs },
                    })
                  }
                />
              </Grid>
            )}
          </Grid>
        </div>
      </>
    );
  }

  // if (
  //   settings?.published &&
  //   authenticated
  //   // &&
  //   // (settings?.whoCanViewResponses === 'all' || settings?.whoCanSubmit === 'all')
  // ) {
  //   return (
  //     <Container>
  //       <FormView
  //         form={form}
  //         // form={{ ...form, settings: { ...settings, onlyMyResponses: true } }}
  //       />
  //     </Container>
  //   );
  // }

  if (!authenticated) {
    return <UnAuthorised />;
  }

  return <NotFound />;
}

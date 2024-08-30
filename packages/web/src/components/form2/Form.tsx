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
// import Permissions from './Permissions';
import AuditLog from '../auditLog/AuditLog';
import FormConstraints from './form-conditions/FormConstraints';
import ShopifySettings from './shopify/ShopifySettings';
import DesignTab from './design/DesignTab';
import RelationFields from './RelationFields';
import TabsList from './tabs/TabsList';
import TabView from './tabs/TabView';
import { DisplayForm } from './DisplayForm';
import WorkflowView from './Work_flowView';
import EmbedFormTab from '../embed/EmbedFormTab';
import { FieldTypeEnum } from './fieldTypes';
import ParentFormResponsesDisplay from './ParentFormResponsesDisplay/ParentFormResponsesDisplay';

const tabs = [
  'Fields',
  'Form',
  'Results',
  'Settings',
  'Embedded Form',
  'Actions',
  'Workflows',
  'Design',
  'Activity',
  'Conditions',
  'Shopify',
];

const initialState = {
  currentTab: 'Form',
  snackBar: '',
  backdrop: false,
  formTabs: false,
  showFields: true,
  showAddOverlay: false,
};

interface IFormProps {
  form: IForm;
  drawerMode?: boolean;
  onSlugChange?: (newSlug: string) => void;
  responseListProps?: Partial<IResponseList>;
  previewMode?: boolean;
}

export default function Form(props: IFormProps) {
  const {
    handleOnChange,
    handleOnSettingsChange,
    updateLoading,
    handleUpdateForm,
    settings,
  } = useUpdateForm({
    onAlert,
    // eslint-disable-next-line react/destructuring-assignment
    form: props?.form,
  });

  return (
    <FormChild
      {...props}
      handleOnChange={(newForm) => {
        if (!props?.previewMode) {
          handleOnChange(newForm);
        }
      }}
      handleOnSettingsChange={(newSettings) => {
        if (!props?.previewMode) {
          handleOnSettingsChange(newSettings);
        }
      }}
      updateLoading={updateLoading}
      handleUpdateForm={handleUpdateForm}
      settings={settings}
    />
  );
}

interface IFormChild extends IFormProps {
  handleOnChange: (newForm: any) => void;
  updateLoading: boolean;
  handleUpdateForm: (newForm?: Partial<IForm>) => Promise<IForm>;
  settings: any;
  handleOnSettingsChange: (newSetting: any) => void;
}

export function FormChild({
  form,
  drawerMode = false,
  onSlugChange,
  responseListProps,
  handleOnChange,
  handleOnSettingsChange,
  updateLoading,
  handleUpdateForm,
  settings,
}: IFormChild): any {
  const { handleDelete } = useDeleteForm({
    onAlert,
  });
  const { formAllTabs } = useGetFormTabs(form?._id);
  const [state, setState] = useState(initialState);

  const router = useRouter();
  const authorized = useAuthorization([form?.createdBy?._id], true);
  const authenticated = useSelector((globalState: any) => globalState?.auth?.authenticated);

  useEffect(() => {
    let { currentTab } = initialState;
    if (router?.query?.tab) {
      currentTab = router?.query?.tab?.toString();
    }
    setState({ ...state, currentTab });
  }, [router?.query?.tab]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window?.location?.href);
    setState({
      ...state,
      snackBar: 'Link copied to clipboard',
    });
  };

  const handlePublish = () => {
    setState({
      ...state,
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
      setState({
        ...state,
        backdrop: true,
      });
      handleDelete(form?._id, () => router.push('/feed'));
    }
  };

  const isWorkflow = form?.settings?.isWorkflow;

  if (!form) {
    return <ErrorLoading />;
  }

  if (authorized || (settings?.published && authenticated)) {
    return (
      <>
        {state.backdrop && <Backdrop open />}
        <div style={{ width: '100%' }}>
          {drawerMode ? (
            <Typography variant="h5" className="py-2">
              {authorized ? (
                <InlineInput
                  placeholder="Form Name"
                  value={form?.name}
                  onChange={(e) => handleOnChange({ name: e.target.value })}
                />
              ) : (
                <Typography>{form?.name}</Typography>
              )}
            </Typography>
          ) : (
            <div className="d-sm-flex justify-content-between align-items-center">
              <Breadcrumbs>
                <Link href="/feed">{isWorkflow ? 'Workflows' : 'Forms'}</Link>
                {authorized ? (
                  <InlineInput
                    placeholder="Form Name"
                    value={form?.name}
                    onChange={async (e) => {
                      setState({ ...state, backdrop: true });
                      const updatedForm = await handleUpdateForm({ name: e.target.value });
                      setState({ ...state, backdrop: false });
                      if (updatedForm?.slug && onSlugChange) {
                        onSlugChange(updatedForm?.slug);
                      }
                    }}
                  />
                ) : (
                  <Typography>{form?.name}</Typography>
                )}
              </Breadcrumbs>
              <div className="d-flex  align-items-center">
                {updateLoading && <CircularProgress size={25} />}
                <QRButton />
                <Tooltip title="Copy form link">
                  <IconButton className="ml-2" onClick={handleCopyLink} size="large">
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
                {authorized && (
                  <>
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
                  </>
                )}
              </div>
            </div>
          )}
          <Grid container spacing={1}>
            <Grid item xs={12} sm={state.formTabs ? 9 : 12}>
              <Paper variant="outlined" className="d-flex align-item-center ">
                <Tabs
                  className="w-100"
                  variant={authorized ? 'scrollable' : 'fullWidth'}
                  value={state.currentTab}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={(event, newValue) => {
                    if (newValue === 'Form') {
                      delete router.query.tab;
                    } else {
                      router.query.tab = newValue;
                    }
                    router.push(router);
                  }}
                >
                  {tabs
                    .filter((label) => authorized || ['Form', 'Results'].includes(label))
                    .map((label) => (
                      <Tab
                        key={label}
                        label={isWorkflow && label === 'Fields' ? 'Steps' : label}
                        value={label}
                      />
                    ))}
                  {authorized &&
                    formAllTabs?.map((tab) => (
                      <Tab
                        key={tab?._id}
                        label={tab?.label || 'NA'}
                        value={slugify(tab?.label, { lower: true })}
                      />
                    ))}
                  {authorized &&
                    settings?.tabs?.map((tab) => (
                      <Tab
                        key={tab?._id}
                        label={tab?.label || 'NA'}
                        value={slugify(tab?.label, { lower: true })}
                      />
                    ))}
                </Tabs>
                {authorized && (
                  <>
                    {!state?.formTabs && (
                      <Tooltip title="Add Tab">
                        <IconButton
                          color="primary"
                          onClick={() => setState({ ...state, formTabs: !state?.formTabs })}
                        >
                          <AddCircle />
                        </IconButton>
                      </Tooltip>
                    )}
                  </>
                )}
              </Paper>
              {state.currentTab === 'Form' && (
                <>
                  {form?.fields?.some(
                    (field) => field?.fieldType === FieldTypeEnum.FormResponseDisplay,
                  ) ? (
                    <ParentFormResponsesDisplay form={form} />
                  ) : isWorkflow ? (
                    <WorkflowView form={form} />
                  ) : (
                    <Paper variant="outlined" className="px-2">
                      <FormView
                        {...responseListProps}
                        form={{ ...form, settings: { ...form.settings, widgetType: 'form' } }}
                        createCallback={(response) =>
                          router.push(
                            `/form/${form?.slug}/response/${response?.count}${
                              router?.query?.field ? `?field=${router?.query?.field}` : ''
                            }`,
                          )
                        }
                      />
                    </Paper>
                  )}
                </>
              )}
              {state.currentTab === 'Results' && (
                <>
                  <Paper className="py-3 d-flex justify-content-end px-2">
                    <BulkUploadAction form={form} />
                  </Paper>
                  {isWorkflow ? (
                    <DisplayForm
                      _id={form?.fields?.[0]?.form?._id}
                      settings={{ widgetType: 'responses' }}
                      workflowId={form?._id}
                    />
                  ) : (
                    <ResponseList {...responseListProps} form={form} />
                  )}
                </>
              )}
              {authorized && (
                <>
                  {state.currentTab === 'Fields' && (
                    <>
                      <FormFields
                        title={isWorkflow ? 'Steps' : 'Fields'}
                        fields={form.fields}
                        setFields={(newFields) => handleOnChange({ fields: newFields })}
                        parentFields={form.fields?.map((f) => ({
                          ...f,
                          formId: form._id,
                          label: f?.label,
                          formName: form?.name,
                        }))}
                        formId={form?._id}
                        isWorkflow={isWorkflow}
                        showSystemFields
                      />
                      <RelationFields formId={form?._id} />
                    </>
                  )}
                  {state.currentTab === 'Settings' && (
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
                  {state.currentTab === 'Workflows' && <Workflows _id={form?._id} />}
                  {state.currentTab === 'Design' && (
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
                  {state.currentTab === 'Actions' && (
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
                  {/* {state.currentTab === 'Permissions' && (
                    <Permissions formId={form?._id} form={form} />
                  )} */}
                  {state.currentTab === 'Activity' && (
                    <AuditLog documentId={form?._id} formId={form?._id} />
                  )}
                  {state.currentTab === 'Conditions' && (
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
                  {state.currentTab === 'Shopify' && (
                    <ShopifySettings
                      shopify={settings?.shopify}
                      onShopifyChange={
                        (shopify) => handleOnSettingsChange({ shopify })
                        // handleOnChange({ settings: { ...form.settings, shopify } })
                      }
                    />
                  )}
                  {[...(formAllTabs || []), ...(settings?.tabs || [])]?.some(
                    (tab) => slugify(tab?.label, { lower: true }) === state.currentTab,
                  ) && (
                    <TabView
                      formId={form?._id}
                      tab={[...(formAllTabs || []), ...(settings?.tabs || [])]?.find(
                        (tab) => slugify(tab?.label, { lower: true }) === state.currentTab,
                      )}
                    />
                  )}
                </>
              )}
              {state.currentTab === 'Embedded Form' && (
                <EmbedFormTab form={form} oldSettings={form.settings} />
              )}
            </Grid>
            {state.formTabs && (
              <Grid item xs={12} sm={3}>
                <TabsList
                  formAllTabs={formAllTabs}
                  formId={form?._id}
                  tabs={form?.settings?.tabs}
                  onClose={() => setState({ ...state, formTabs: false })}
                  onTabsChange={(newTabs) =>
                    handleOnChange({
                      settings: { ...form.settings, tabs: newTabs },
                    })
                  }
                />
              </Grid>
            )}
          </Grid>
          <Snackbar
            open={Boolean(state.snackBar)}
            autoHideDuration={4000}
            onClose={() => setState({ ...state, snackBar: '' })}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={() => setState({ ...state, snackBar: '' })} severity="success">
              {state.snackBar}
            </Alert>
          </Snackbar>
        </div>
      </>
    );
  }

  if (!authenticated) {
    return <UnAuthorised />;
  }

  return <NotFound />;
}

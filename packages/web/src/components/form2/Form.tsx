import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/FileCopy';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import { useUpdateForm } from '@frontend/shared/hooks/form';
import Link from 'next/link';
import ErrorLoading from '../common/ErrorLoading';
import Breadcrumbs from '../common/Breadcrumbs';
import FormFields from './FormFields';
import FormView from './FormView';
import FormSetting from './FormSetting';
import EditField from './EditField';
import ResponseList from './ResponseList';
import Actions from './Actions';
import DesignTab from './DesignTab';
import { onAlert } from '../../utils/alert';
import Authorization from '../common/Authorization';

interface IProps {
  _id: string;
  drawerMode?: boolean;
}

export default function Form({ _id, drawerMode = false }: IProps): any {
  const { error, state, setState, updateLoading } = useUpdateForm({ onAlert, _id });

  const [options, setOptions] = useState({ currentTab: 'preview', fieldId: null });

  if (error || !state) {
    return <ErrorLoading error={error} />;
  }

  const NameInput = (
    <input
      width="100%"
      placeholder="Form Name"
      style={{
        background: 'rgba(0, 0, 0, 0)',
        border: 'none',
        outline: 'none',
      }}
      value={state?.name?.includes('-n-e-w') ? 'Form Name' : state?.name}
      onChange={(e) => setState({ ...state, name: e.target.value })}
    />
  );

  return (
    <Authorization _id={state?.createdBy?._id} allowAdmin>
      <div className="px-2">
        {drawerMode ? (
          <Typography variant="h5" className="py-2">
            {NameInput}
          </Typography>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <Breadcrumbs>
              <Link href="/forms">Forms</Link>
              {NameInput}
            </Breadcrumbs>
            <div className="d-flex  align-items-center">
              {updateLoading && <CircularProgress size={25} />}
              <Tooltip title="Copy form link">
                <IconButton
                  className="ml-2"
                  onClick={() => {
                    navigator.clipboard.writeText(window?.location?.href?.replace('forms', 'form'));
                  }}
                >
                  <LinkIcon />
                </IconButton>
              </Tooltip>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                className="mx-2"
                onClick={() =>
                  setState({
                    ...state,
                    settings: {
                      ...state.settings,
                      published: Boolean(!state?.settings?.published),
                    },
                  })
                }
              >
                {state?.settings?.published ? 'Unpublish' : 'Publish'}
              </Button>

              <Button variant="outlined" color="primary" size="small">
                Delete
              </Button>
            </div>
          </div>
        )}
        <Grid container spacing={1} style={{ minHeight: 'calc(100vh - 130px)' }}>
          <Grid item xs={4}>
            {options.fieldId ? (
              <EditField
                setState={setState}
                field={state?.fields?.filter((f) => f._id === options.fieldId)[0]}
                onFieldChange={(updatedField) => {
                  setState({
                    ...state,
                    fields: state?.fields?.map((f) =>
                      f._id === updatedField._id ? updatedField : f,
                    ),
                  });
                }}
                onClose={() => setOptions({ ...options, fieldId: null })}
              />
            ) : (
              <FormFields
                state={state}
                setState={setState}
                onSelectField={(fieldId) => setOptions({ ...options, fieldId })}
              />
            )}
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
                <Tab label="Design" value="design" />
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
                  setState({ ...state, settings: { ...state.settings, ...settings } })
                }
              />
            )}
            {options.currentTab === 'responses' && <ResponseList form={state} />}
            {options.currentTab === 'design' && (
              <DesignTab
                form={state}
                onChange={(design) =>
                  setState({ ...state, settings: { ...state.settings, design } })
                }
              />
            )}
            {options.currentTab === 'actions' && (
              <Actions
                form={state}
                onChange={(actions) =>
                  setState({ ...state, settings: { ...state.settings, actions } })
                }
              />
            )}
          </Grid>
        </Grid>
      </div>
    </Authorization>
  );
}

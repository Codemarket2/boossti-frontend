import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useUpdateForm } from '@frontend/shared/hooks/form';
import Link from 'next/link';
import ErrorLoading from '../common/ErrorLoading';
import Breadcrumbs from '../common/Breadcrumbs';
import FormFields from './FormFields';
import FormView from './FormView';
import FormSetting from './FormSetting';
import { onAlert } from '../../utils/alert';

interface IProps {
  _id: string;
}

export default function Form({ _id }: IProps): any {
  const { error, state, setState, updateLoading } = useUpdateForm({ onAlert, _id });

  const [currentTab, setCurrentTab] = useState(0);

  if (error || !state) {
    return <ErrorLoading error={error} />;
  }

  return (
    <div className="px-2">
      <div className="d-flex justify-content-between align-items-center">
        <Breadcrumbs>
          <Link href="/forms">Forms</Link>
          <input
            width="100%"
            placeholder="Form Name"
            style={{
              background: 'rgba(0, 0, 0, 0)',
              border: 'none',
              outline: 'none',
            }}
            value={state.name.includes('-n-e-w') ? 'Form Name' : state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
        </Breadcrumbs>
        {updateLoading && <CircularProgress size={25} />}
      </div>
      <Grid container spacing={1} style={{ minHeight: 'calc(100vh - 130px)' }}>
        <Grid item xs={4}>
          <FormFields state={state} setState={setState} />
        </Grid>
        <Grid item xs={8}>
          <Paper variant="outlined">
            <Tabs
              centered
              value={currentTab}
              indicatorColor="primary"
              textColor="primary"
              onChange={(event, newValue) => setCurrentTab(newValue)}
            >
              <Tab label="Preview" />
              <Tab label="Setting" />
              <Tab label="Responses" disabled />
            </Tabs>
          </Paper>
          {currentTab === 0 ? (
            <FormView fields={state.fields} />
          ) : (
            <FormSetting
              settings={state.settings}
              onChange={(settings) =>
                setState({ ...state, settings: { ...state.settings, ...settings } })
              }
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

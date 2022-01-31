import { useGetForm } from '@frontend/shared/hooks/form';
import FormView from './FormView';
import ErrorLoading from '../common/ErrorLoading';
import Overlay from '../common/Overlay';
import Box from '@material-ui/core/Box';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';

interface IProps {
  _id: string;
  parentId?: string;
  createCallback?: (response: any) => void;
  customSettings: any;
}

const initialState = {
  showForm: false,
};

export default function FieldViewWrapper({
  _id,
  parentId,
  createCallback,
  customSettings,
}: IProps): any {
  const { error, data } = useGetForm(_id);
  const [state, setstate] = useState(initialState);
  let settings;
  if (customSettings) {
    settings = customSettings;
  } else {
    settings = data?.getForm?.settings;
  }

  if (error?.message?.includes("has coerced Null value for NonNull type 'ID!'")) {
    return null;
  }

  if (error || !data || !data.getForm) {
    return <ErrorLoading error={error} />;
  }
  if (settings?.widgetType === 'button') {
    return (
      <>
        <div className="text-center my-5">
          <button
            onClick={() => {
              setstate({ ...state, showForm: true });
            }}
            className="btn btn-lg btn-primary"
          >
            {settings.widgetLabel}
          </button>
        </div>
        <div>
          {state.showForm && (
            <Overlay
              open={state.showForm}
              title={`Form`}
              onClose={() => {
                setstate({ ...state, showForm: false });
              }}
            >
              <div style={{ padding: '20px' }}>
                <FormView
                  form={{ ...data.getForm, settings: settings }}
                  parentId={parentId}
                  createCallback={createCallback}
                />
              </div>
            </Overlay>
          )}
        </div>
      </>
    );
  }

  // if(settings?.widgetType == 'leaderBoard'){

  //   return(

  //   )
  // }

  return (
    <FormView
      form={{ ...data.getForm, settings: settings }}
      parentId={parentId}
      createCallback={createCallback}
    />
  );
}

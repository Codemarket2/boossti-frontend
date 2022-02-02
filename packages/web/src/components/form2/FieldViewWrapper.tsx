import { useState, useEffect } from 'react';
import { useGetForm } from '@frontend/shared/hooks/form';
import { Button, Box } from '@material-ui/core';
import FormView from './FormView';
import ErrorLoading from '../common/ErrorLoading';
import Overlay from '../common/Overlay';

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
  if (customSettings?.useCustomSettings) {
    settings = customSettings;
  } else {
    settings = {
      ...data?.getForm?.settings,
      widgetType: customSettings?.widgetType,
      buttonLabel: customSettings?.buttonLabel,
    };
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
          <Button
            onClick={() => {
              setstate({ ...state, showForm: true });
            }}
            variant="contained"
            color="primary"
            size="small"
          >
            {settings?.buttonLabel ?? data.getForm.name}
          </Button>
        </div>
        <div>
          {state.showForm && (
            <Overlay
              open={state.showForm}
              title={data.getForm.name}
              onClose={() => {
                setstate({ ...state, showForm: false });
              }}
            >
              <div style={{ padding: '20px' }}>
                <FormView
                  form={{ ...data.getForm, settings }}
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

  if (settings?.widgetType === 'leaderboard') return null;

  if (settings?.widgetType === 'oneField') return null;

  return (
    <FormView
      form={{ ...data.getForm, settings }}
      parentId={parentId}
      createCallback={createCallback}
    />
  );
}

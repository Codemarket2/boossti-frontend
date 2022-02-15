// import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetForm } from '@frontend/shared/hooks/form';
// import { useGetResponses } from '@frontend/shared/hooks/response';
// import { Button } from '@material-ui/core';
import FormView from './FormView';
import ErrorLoading from '../common/ErrorLoading';
// import Overlay from '../common/Overlay';
// import { ResponseChild2 } from './Response';

interface IProps {
  _id: string;
  parentId?: string;
  createCallback?: (response: any) => void;
  customSettings?: any;
}

const initialState = {
  showForm: false,
  responseIndex: -1,
  responded: false,
};

export default function FieldViewWrapper({
  _id,
  parentId,
  createCallback,
  customSettings,
}: IProps): any {
  // const { attributes } = useSelector(({ auth }: any) => auth);
  // const currentUserId = attributes['custom:_id'];
  const { error, data } = useGetForm(_id);
  // const [state, setState] = useState(initialState);

  // const { data: responses, error: responsesError, loading } = useGetResponses(_id, parentId);

  // let settings;
  // if (customSettings?.useCustomSettings) {
  //   settings = customSettings;
  // } else {
  //   settings = data?.getForm?.settings;
  // }

  // useEffect(() => {
  //   const pos = responses?.getResponses?.data?.findIndex((res) => {
  //     return res.createdBy?._id === currentUserId;
  //   });
  //   setState({ ...state, responseIndex: pos });
  // }, [responses]);

  if (error || !data || !data.getForm) {
    return <ErrorLoading error={error} />;
  }

  // if (!state.responded && !settings?.multipleResponses && state.responseIndex > -1)
  //   return (
  //     <ResponseChild2
  //       formId={_id}
  //       response={responses.getResponses.data[state.responseIndex]}
  //       hideAuthor
  //       hideNavigation
  //     />
  //   );

  // if (settings?.widgetType === 'button') {
  //   return (
  //     <>
  //       <div className="text-center my-5">
  //         <Button
  //           onClick={() => {
  //             setState({ ...state, showForm: true });
  //           }}
  //           variant="contained"
  //           color="primary"
  //           size="small"
  //         >
  //           {settings?.buttonLabel ?? data.getForm.name}
  //         </Button>
  //       </div>
  //       <div>
  //         {state.showForm && (
  //           <Overlay
  //             open={state.showForm}
  //             title={data.getForm.name}
  //             onClose={() => {
  //               setState({ ...state, showForm: false });
  //             }}
  //           >
  //             <div style={{ padding: '20px' }}>
  //               <FormView
  //                 form={{ ...data.getForm, settings }}
  //                 parentId={parentId}
  //                 createCallback={createCallback}
  //               />
  //             </div>
  //           </Overlay>
  //         )}
  //       </div>
  //     </>
  //   );
  // }

  // if (settings?.widgetType === 'leaderboard') return null;

  return (
    <FormView
      form={{ ...data.getForm, settings: customSettings || data.getForm?.settings }}
      parentId={parentId}
      createCallback={createCallback}
      fieldWiseView={customSettings?.widgetType === 'oneField'}
      // setResponded={() => {
      //   setState({ ...state, responded: true });
      // }}
    />
  );
}

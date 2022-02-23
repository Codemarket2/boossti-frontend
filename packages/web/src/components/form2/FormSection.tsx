import { useState } from 'react';
import { useGetResponses } from '@frontend/shared/hooks/response';
import Button from '@material-ui/core/Button';
import FieldViewWrapper from './FieldViewWrapper';
import Response from '../response/Response';
import ErrorLoading from '../common/ErrorLoading';
import Overlay from '../common/Overlay';
import { ResponseListWrapper } from '../response/ResponseList';

export const DisplayForm = ({
  formId,
  parentId,
  authorized,
  customSettings,
}: {
  formId: string;
  parentId: string;
  authorized: boolean;
  customSettings: any;
}) => {
  const { data, error } = useGetResponses(formId, parentId);
  const [open, setOpen] = useState(false);

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  return (
    <>
      {!customSettings?.onlyOwnerCanSubmit ? (
        <>
          <div className="text-center">
            <Button variant="outlined" onClick={() => setOpen(true)}>
              {`${data?.getResponses?.count} Responses`}
            </Button>
          </div>
          {open && (
            <Overlay minWidth="85vw" title="Responses" open={open} onClose={() => setOpen(false)}>
              <ResponseListWrapper formId={formId} parentId={parentId} />
            </Overlay>
          )}
          <FieldViewWrapper _id={formId} parentId={parentId} customSettings={customSettings} />
        </>
      ) : authorized && !(data?.getResponses && data?.getResponses?.count > 0) ? (
        <FieldViewWrapper _id={formId} parentId={parentId} customSettings={customSettings} />
      ) : (
        <>
          {data?.getResponses?.data?.[0]?._id && (
            <Response hideNavigation hideAuthor responseId={data?.getResponses?.data?.[0]?._id} />
          )}
        </>
      )}
    </>
  );
};

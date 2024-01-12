import TablePagination from '@mui/material/TablePagination';
import { useGetResponses, useDeleteResponse } from '@frontend/shared/hooks/response';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';
import { DisplayResponse } from './DisplayResponse';
import Table2 from './Table2';
import Table from './Tablecopy';
import { ResponseViewSelectInput } from '../form2/FormSetting';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import CardComponent from '../Spotify/SpotifyCard';
export interface IResponseList {
  form: any;
  workflowId?: string;
  showOnlyMyResponses?: boolean;
  isTemplateInstance?: string;
  valueFilter?: any;
  onClickResponse?: (response, form) => void;
  parentResponseId?: string;
}

export default function ResponseList({
  form,
  workflowId,
  showOnlyMyResponses,
  isTemplateInstance,
  valueFilter,
  onClickResponse,
  parentResponseId,
}: IResponseList): any {
  const { data, error, loading, state, setState, refetch } = useGetResponses({
    formId: form?._id,
    onlyMy: showOnlyMyResponses,
    workflowId,
    valueFilter,
    parentResponseId,
  });
  // console.log(form?._id, showOnlyMyResponses, workflowId, valueFilter, parentResponseId, 'HEHE');
  console.log(data, 'Form Data');
  const [responsesView, setResponsesView] = useState(form?.settings?.responsesView || 'table');

  const { handleDelete, deleteLoading } = useDeleteResponse({ onAlert });

  return (
    <div>
      <div>
        {data?.getResponses?.data?.map((response) => (
          // {console.log(response.values[0].values)}
          <div
            key={response._id}
            className="draggable-form-item"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', JSON.stringify([response]));
            }}
          >
            <div style={{ width: '200px', height: '300px' }}>
              <CardComponent
                imageSource={response.values[0].value}
                title={response.values[1].value}
                description={response.values[2].value}
                width={2}
                height={1.5}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import TablePagination from '@mui/material/TablePagination';
import { useGetResponses, useDeleteResponse } from '@frontend/shared/hooks/response';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Backdrop from '../common/Backdrop';
import { onAlert } from '../../utils/alert';
import CardComponent from './SpotifyCard';
import { IResponseList } from '../response/ResponseList';

function Spotify({
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
  const width = 100;
  const height = 100;
  // console.log(data, 'data');
  // console.log(data?.getResponses?.data, 'getresponses');
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {data?.getResponses?.data?.map((response) => (
          <div
            key={response._id}
            className="draggable-form-item"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', JSON.stringify([response]));
            }}
            // style={{ marginRight: '100 px' }}
          >
            <div style={{ width: '90px', height: '125px' }}>
              <CardComponent
                imageSource={response.values[0].value}
                title={response.values[1].value}
                description={response.values[2].value}
                height={1}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Spotify;

import { useState } from 'react';
import { IconButton, TableCell, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditResponseDrawer from './EditResponseDrawer';
import LaunchIcon from '@mui/icons-material/Launch';
import Authorization from '../common/Authorization';
import DeleteButton from '../common/DeleteButton';
import { useDeleteResponse } from '@frontend/shared/hooks/response';
import { onAlert } from '../../utils/alert';
import { useRouter } from 'next/router';
export default function ResponseActions({ response, form, refetch }) {
  const { handleDelete, deleteLoading } = useDeleteResponse({ onAlert });
  const [selectedResponse, setSelectedResponse] = useState(null);
  const router = useRouter();
  console.log('selectedResponse', selectedResponse);
  console.log('response', response);
  console.log({
    compare: selectedResponse?._id === response?._id,
    selectedRId: selectedResponse?._id,
    rId: response?._id,
  });
  return (
    <>
      <div className="d-flex">
        <Authorization _id={[response?.createdBy?._id]} allowAdmin returnNull>
          <DeleteButton
            onClick={async () => {
              await handleDelete(response._id, refetch);
            }}
            edge="start"
          />
          <Tooltip title="Edit Response">
            <IconButton onClick={() => setSelectedResponse(response)} edge="start" size="large">
              <EditIcon />
            </IconButton>
          </Tooltip>
          {selectedResponse?._id === response?._id && (
            <>
              <EditResponseDrawer
                open
                form={form}
                response={selectedResponse}
                onClose={() => setSelectedResponse(null)}
              />
            </>
          )}
        </Authorization>
        <Tooltip title="Open Response">
          <IconButton
            onClick={() => {
              router.push(`/forms/${form.slug}/response/${response.count}`);
            }}
            edge="start"
            size="large"
          >
            <LaunchIcon />
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
}

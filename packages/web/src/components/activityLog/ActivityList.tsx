/* eslint-disable react/jsx-wrap-multilines */
import Typography from '@material-ui/core/Typography';
import { useGetMyResponses } from '@frontend/shared/hooks/response';
import { useEffect } from 'react';
import Link from 'next/link';

export default function ActivityList() {
  const { data, error, loading, state, setState } = useGetMyResponses();

  console.log(data?.getMyResponses);
  // console.log(getMyResponses?.count);

  return (
    <>
      <Typography variant="h4">Activity Log</Typography>
      {loading ? (
        <>
          <Typography variant="h6">Loading...</Typography>
        </>
      ) : (
        <>
          <table>
            <tr>
              <th>Form Id</th>
              <th>Created By</th>
              <th>Edit Link</th>
            </tr>
            {data?.getMyResponses?.data?.map((d) => (
              <tr>
                <td>{d?.formId}</td>
                <td>{d?.createdBy?.name}</td>
                <td>
                  <Link href={`response/${d?._id}`}>
                    <a> Edit </a>
                  </Link>
                </td>
              </tr>
            ))}
          </table>
        </>
      )}
    </>
  );
}

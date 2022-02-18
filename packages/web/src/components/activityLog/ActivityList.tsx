/* eslint-disable react/jsx-wrap-multilines */
import Typography from '@material-ui/core/Typography';
import { useGetMyResponses } from '@frontend/shared/hooks/response';
import Link from 'next/link';
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import ErrorLoading from '../common/ErrorLoading';
import { ResponseChild2 } from '../response/Response';

export default function ActivityList() {
  const { data, error, loading } = useGetMyResponses();

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  return (
    <>
      <Typography variant="h4">Activity Log</Typography>
      {loading ? (
        <>
          <Typography variant="h6">Loading...</Typography>
        </>
      ) : (
        <>
          {data?.getMyResponses?.data?.map((d, i) => (
            <ActivityAccordion data={d} key={i} />
          ))}
        </>
      )}
    </>
  );
}

function ActivityAccordion({ data }: any) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{data?.formId?.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="w-100">
          <ResponseChild2 formId={data?.formId?._id} response={data} hideBreadcrumbs />
          <Link href={`response/${data._id}`}>
            <Button variant="outlined">Edit</Button>
          </Link>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

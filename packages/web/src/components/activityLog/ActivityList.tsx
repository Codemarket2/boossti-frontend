/* eslint-disable react/jsx-wrap-multilines */
import Typography from '@mui/material/Typography';
import { useGetMyResponses } from '@frontend/shared/hooks/response';
import Link from 'next/link';
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ErrorLoading from '../common/ErrorLoading';
import { DisplayResponseWithFormId } from '../response/DisplayResponseById';

export default function ActivityList() {
  const { data, error, loading } = useGetMyResponses();

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  return (
    <>
      <Typography variant="h4">HEHEfdgfdgfd</Typography>
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
          <DisplayResponseWithFormId formId={data?.formId?._id} response={data} hideBreadcrumbs />
          <Link href={`response/${data._id}`}>
            <Button variant="outlined">Edit</Button>
          </Link>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

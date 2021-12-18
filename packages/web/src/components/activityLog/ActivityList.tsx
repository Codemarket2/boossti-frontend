/* eslint-disable react/jsx-wrap-multilines */
import Typography from '@material-ui/core/Typography';
import { useGetMyResponses } from '@frontend/shared/hooks/response';
import Link from 'next/link';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

export default function ActivityList() {
  const { data, error, loading, state, setState } = useGetMyResponses();

  console.log(data?.getMyResponses);

  return (
    <>
      <Typography variant="h4">Activity Log</Typography>
      {loading ? (
        <>
          <Typography variant="h6">Loading...</Typography>
        </>
      ) : (
        <>
          {data?.getMyResponses?.data?.map((d) => (
            <ActivityAccordion data={d} />
          ))}
        </>
      )}
    </>
  );
}

function ActivityAccordion({ data }) {
  console.log(data);
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{data?.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            {data?.values?.map((v) => (
              <Grid container spacing={2} key={v._id}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <span style={{ margin: '0px 20px' }}>Field Id : {v.field} </span>{' '}
                  <span>Value : {v.value}</span>
                </Grid>
              </Grid>
            ))}
            <Link href={`response/${data._id}`}>
              <Button variant="outlined">Edit</Button>
            </Link>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

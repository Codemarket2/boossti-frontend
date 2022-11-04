import { useGetResponses } from '@frontend/shared/hooks/response';
import { useNewFeed } from '@frontend/shared/hooks/feed/newFeed';
import { IForm, IResponse } from '@frontend/shared/types';
import { getCreatedAtDate } from '@frontend/shared/utils/date';
import { systemForms } from '@frontend/shared/utils/systemForms';
import Notifications from '@mui/icons-material/Notifications';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import Link from 'next/link';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Breadcrumbs from '../../common/Breadcrumbs';
import ErrorLoading from '../../common/ErrorLoading';
import InputGroup from '../../common/InputGroup';

interface IFeedProps {
  feedForm: IForm;
  showList: boolean;
}

export default function Feed({ feedForm, showList }: IFeedProps) {
  const [filter, setFilter] = useState({ status: 'all' });
  const attributes = useSelector((state: any) => state?.auth?.attributes);
  const receiverField = feedForm?.fields?.find(
    (field) => field?.label?.toLowerCase() === systemForms?.feed?.fields?.receiver?.toLowerCase(),
  );

  const statusField = feedForm?.fields?.find(
    (field) => field?.label?.toLowerCase() === systemForms?.feed?.fields?.status?.toLowerCase(),
  );

  let valueFilter: any = {
    'values.field': receiverField?._id,
    'values.response': attributes?.['custom:_id'],
  };

  if (['read', 'unread'].includes(filter?.status)) {
    valueFilter = {
      $and: [
        {
          'values.field': receiverField?._id,
          'values.response': attributes?.['custom:_id'],
        },
        {
          'values.field': statusField?._id,
          'values.value': filter?.status,
        },
      ],
    };
  }

  const { data, error, refetch, loading } = useGetResponses({
    formId: feedForm?._id,
    valueFilter,
    limit: showList ? 10 : 2,
  });

  const { newFeed, setNewFeed } = useNewFeed({
    refetch,
    count: data?.getResponses?.count,
    feedResponses: data?.getResponses?.data,
    feedForm,
  });

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={Boolean(newFeed)}
        autoHideDuration={6000}
        onClose={() => setNewFeed(null)}
      >
        <a target="_blank" rel="noreferrer" href={`${newFeed?.link}&feedId=${newFeed?._id}`}>
          <Alert
            variant="filled"
            onClose={() => setNewFeed(null)}
            severity="success"
            icon={<Notifications />}
          >
            <AlertTitle color="inherit">{newFeed?.message}</AlertTitle>
            {getCreatedAtDate(newFeed?.createdAt, 2, 'lll')}
          </Alert>
        </a>
      </Snackbar>
      {showList && (
        <div>
          <Breadcrumbs>
            <Typography color="textPrimary">Feed</Typography>
          </Breadcrumbs>
          <div className="d-flex align-items-center">
            <InputGroup>
              <FormControl size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filter?.status}
                  label="Status"
                  onChange={(event) =>
                    setFilter((oldFilter) => ({ ...oldFilter, status: event?.target?.value }))
                  }
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="read">Read</MenuItem>
                  <MenuItem value="unread">Unread</MenuItem>
                </Select>
              </FormControl>
            </InputGroup>
            <Typography className="ml-2">Total {data?.getResponses?.count} result found</Typography>
            {loading && <CircularProgress className="ml-2" size={20} />}
          </div>
          <div>
            {!data || error ? (
              <ErrorLoading error={error} />
            ) : (
              <Paper className="p-2">
                {data?.getResponses?.data?.map((feedResponse) => (
                  <FeedCard
                    key={feedResponse?._id}
                    feedForm={feedForm}
                    feedResponse={feedResponse}
                  />
                ))}
              </Paper>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const FeedCard = ({ feedResponse, feedForm }: { feedResponse: IResponse; feedForm: IForm }) => {
  const statusField = feedForm?.fields?.find(
    (field) => field?.label?.toLowerCase() === systemForms?.feed?.fields?.status?.toLowerCase(),
  );
  const statusValue = feedResponse?.values?.find((value) => value?.field === statusField?._id)
    ?.value;

  const messageField = feedForm?.fields?.find(
    (field) => field?.label?.toLowerCase() === systemForms?.feed?.fields?.message?.toLowerCase(),
  );
  const messageValue = feedResponse?.values?.find((value) => value?.field === messageField?._id)
    ?.value;

  const linkField = feedForm?.fields?.find(
    (field) => field?.label?.toLowerCase() === systemForms?.feed?.fields?.link?.toLowerCase(),
  );
  const linkValue = feedResponse?.values?.find((value) => value?.field === linkField?._id)?.value;

  return (
    <Link href={`${linkValue}&feedId=${feedResponse?._id}`}>
      <Alert
        style={{ cursor: 'pointer' }}
        icon={<Notifications />}
        className="my-2"
        variant={statusValue === 'unread' ? 'filled' : 'outlined'}
        action={
          <Button color="inherit" size="small">
            View
          </Button>
        }
      >
        <AlertTitle>{messageValue}</AlertTitle>
        {getCreatedAtDate(feedResponse?.createdAt, 2, 'lll')}
      </Alert>
    </Link>
  );
};

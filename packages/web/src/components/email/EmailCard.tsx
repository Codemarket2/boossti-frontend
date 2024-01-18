import React from 'react';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import parse from 'html-react-parser';
import { styled } from '@mui/material/styles';
import { useGetAllEmails } from '@frontend/shared/hooks/email/getEmail';
import ErrorLoading from '../common/ErrorLoading';
import Loading from '../common/Loading';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '150px !important',
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer',
  flexDirection: 'column',
  paddingLeft: '2%',
  marginBottom: '5px',
}));

export default function EmailCard() {
  const { data, error, loading } = useGetAllEmails();
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorLoading error={error} />;
  }

  return (
    <div>
      <Paper style={{ padding: 10 }}>
        <h6>Total Send Emails: {data?.getAllEmails?.count}</h6>
        {data?.getAllEmails?.data.map((email) => (
          <div key={email._id}>
            <StyledCard
              variant="outlined"
              onClick={() => {
                alert('clicked');
              }}
            >
              <Typography>
                To:
                {email.receiverEmail.map((receive) => {
                  return receive;
                })}
              </Typography>
              <Typography>
                From: <span>{email.senderEmail}</span>{' '}
              </Typography>
              <Typography style={{ display: 'flex' }}>
                <div>Body:</div>
                <div>{parse(email.body)}</div>
              </Typography>
            </StyledCard>
          </div>
        ))}
      </Paper>
    </div>
  );
}

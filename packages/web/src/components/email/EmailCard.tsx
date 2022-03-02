import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import parse from 'html-react-parser';

import { useGetAllEmails } from '@frontend/shared/hooks/email/getEmail';
import ErrorLoading from '../common/ErrorLoading';
import Loading from '../common/Loading';

// align-items: center;
const StyledCard = styled(Card)`
  height: 150px !important;
  display: flex;
  justify-content: center;
  cursor: pointer;
  flex-direction: column;
  padding-left: 2%;
  margin-bottom: 5px;
`;

export default function EmailCard() {
  const { data, error, loading } = useGetAllEmails();
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorLoading error={error} />;
  }
  if (data) {
    console.log(data);
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

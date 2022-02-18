import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useCancelSubscription } from '@frontend/shared/hooks/onBoarding';
import {
  Typography,
  Container,
  Button,
  CardActionArea,
  Card,
  CardContent,
  CardActions,
} from '@material-ui/core';

export default function DashboardScreen() {
  const user = useSelector(({ auth }: any) => auth.user);
  const { handleCancelSubscribe } = useCancelSubscription();
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.subscription || !user.subscription.active) {
      router.push('/onboarding');
    }
  }, [user]);

  if (!user || !user.subscription) {
    return <div>Loading</div>;
  }

  return (
    <Container>
      <Typography>Dashboard</Typography>
      <div className="justify-content-center align-items-center w-100">
        <Card style={{ maxWidth: 375 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {user.subscription.active ? 'Active Subscription' : 'No Subscription '}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {user.subscription.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Subscribed On - {moment(user.subscription.subscribedOn).format('LLL')}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Expiring On - {moment(user.subscription.expiringOn).format('LLL')}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              className="w-100"
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => handleCancelSubscribe()}
            >
              Cancel Subscription
            </Button>
          </CardActions>
        </Card>
      </div>
    </Container>
  );
}

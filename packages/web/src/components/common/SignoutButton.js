import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';
import { unsetAuthUser } from '@frontend/shared/redux/actions/auth';

export default function SignoutButton() {
  const authenticated = useSelector(({ auth }) => auth.authenticated);
  const dispatch = useDispatch();
  const handleLogout = () => {
    Auth.signOut().then(() => {
      dispatch(unsetAuthUser());
    });
  };
  return authenticated ? <Button onClick={() => handleLogout()}>Signout</Button> : null;
}

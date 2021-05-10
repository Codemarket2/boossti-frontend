import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { useSignin } from '@frontend/shared/hooks/auth';
import { Form, Button, Spinner } from 'react-bootstrap';

const onAlert = (title, message) => {
  alert(`${title}, ${message}`);
};

export default function SignInForm(props) {
  const { state, setState, onSubmit } = useSignin({ mobile: true, onAlert });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(state);
  };

  if (state.verify) {
    return (
      <form onSubmit={handleSubmit}>
        <div className="single__account">
          <Form.Group controlId="formBasicCode">
            <Form.Label>Verify your email!</Form.Label>
            <small>Verification code has been sent to {state.email}</small>
            <Form.Control
              onChange={({ target: { value } }) => setState({ ...state, code: value })}
              value={state.code}
              type="text"
              name="code"
              id="code"
              placeholder="Enter Verification Code"
              required
            />
            <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
          </Form.Group>
          <Button
            style={{ pointerEvents: state.disabled ? 'none' : 'auto' }}
            type="submit"
            className="account__btn">
            {state.disabled ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              'Verify'
            )}
          </Button>
        </div>
      </form>
    );
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <div className="single__account">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={({ target: { value } }) => setState({ ...state, email: value })}
              value={state.email}
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={({ target: { value } }) => setState({ ...state, password: value })}
              value={state.password}
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
          </Form.Group>
          <p
            onClick={() => props.changeLogin(false)}
            className="forget__pass"
            style={{ cursor: 'pointer' }}>
            Lost your password?
          </p>
          <div>
            <Button
              style={{ pointerEvents: state.disabled ? 'none' : 'auto' }}
              type="submit"
              className="account__btn">
              {state.disabled ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                'Login'
              )}
            </Button>
            <br />
            <p className="text-center">OR</p>
            <Button
              style={{ pointerEvents: state.disabled ? 'none' : 'auto' }}
              type="button"
              variant="danger"
              className="account__btn mt-3"
              onClick={() => Auth.federatedSignIn({ provider: 'Google' })}
              block>
              Sign in with Google
            </Button>
            <br />
            <Button
              style={{ pointerEvents: state.disabled ? 'none' : 'auto' }}
              type="button"
              block
              className="account__btn"
              onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}>
              Sign in with Facebook
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

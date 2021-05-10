import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { Form, Button, Spinner } from 'react-bootstrap';

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
      verify: false,
      disabled: false
    };
  }

  forgetPassword = () => {
    const { email } = this.state;
    this.setState({ ...this.state, disabled: true });
    Auth.forgotPassword(email)
      .then((res) => {
        this.setState({
          disabled: false,
          verify: true
        });
      })
      .catch(({ message }) => {
        // console.log('err', message);
        this.setState({ ...this.state, disabled: false });
        alert(message);
      });
  };

  resetPassword = () => {
    const { email, code, password, confirmPassword } = this.state;

    if (password === confirmPassword) {
      Auth.forgotPasswordSubmit(email, code, password)
        .then((res) => {
          this.setState({
            code: '',
            email: '',
            password: '',
            confirmPassword: '',
            disabled: false
          });
          this.props.changeLogin(true);
        })
        .catch((err) => {
          this.setState({ ...this.state, disabled: false });
          alert(err.message);
        });
    } else {
      alert("Password and Confirm Password doesn't Match!");
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { verify } = this.state;
    this.setState({ ...this.state, disabled: true });
    if (verify) {
      this.resetPassword();
    } else {
      this.forgetPassword();
    }
    e.target.reset();
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { email, code, password, confirmPassword, disabled, verify } = this.state;
    if (verify) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="single__account">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Verification Code</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                value={code}
                type="text"
                name="code"
                id="code"
                placeholder="Verification Code"
                required
              />
              <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                value={password}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
              />
              <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                value={confirmPassword}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                required
              />
              <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
            </Form.Group>
            <p
              style={{ cursor: 'pointer' }}
              onClick={() => this.props.changeLogin(true)}
              className="forget__pass">
              Already have account login?
            </p>
            <Button
              style={{ pointerEvents: disabled ? 'none' : 'auto' }}
              type="submit"
              className="account__btn">
              {disabled ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                'Forget Password'
              )}
            </Button>
          </div>
        </form>
      );
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="single__account">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                value={email}
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
            </Form.Group>
            <p
              style={{ cursor: 'pointer' }}
              onClick={() => this.props.changeLogin(true)}
              className="forget__pass">
              Already have account login?
            </p>
            <Button
              style={{ pointerEvents: disabled ? 'none' : 'auto' }}
              type="submit"
              className="account__btn">
              {disabled ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                'Reset Password'
              )}
            </Button>
          </div>
        </form>
      );
    }
  }
}

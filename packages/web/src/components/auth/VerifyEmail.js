import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { Form, Button, Spinner } from 'react-bootstrap';

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'contactvivekvt@gmail.com',
      code: '',
      verify: false,
      disabled: false
    };
  }

  getVerificationCode = () => {
    const { email } = this.state;
    this.setState({ ...this.state, disabled: true });
    Auth.verifyCurrentUserAttribute('email')
      .then((res) => {
        console.log('res', res);
        this.setState({
          disabled: false,
          verify: true
        });
      })
      .catch(({ message }) => {
        this.setState({ ...this.state, disabled: false });
        alert(message);
      });
  };

  verifyCode = () => {
    const { email, code } = this.state;
    Auth.verifyCurrentUserAttributeSubmit('email', code)
      .then((res) => {
        console.log('res', res);
        this.setState({
          code: '',
          email: '',
          disabled: false
        });
      })
      .catch((err) => {
        this.setState({ ...this.state, disabled: false });
        alert(err.message);
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { verify } = this.state;
    this.setState({ ...this.state, disabled: true });
    if (verify) {
      this.verifyCode();
    } else {
      this.getVerificationCode();
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
          <h1>Verify Your Email</h1>
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
            <Button
              style={{ pointerEvents: disabled ? 'none' : 'auto' }}
              type="submit"
              className="account__btn">
              {disabled ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                'Get Code'
              )}
            </Button>
          </div>
        </form>
      );
    }
  }
}

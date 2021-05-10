import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLoading, hideLoading } from 'react-redux-loading';
import { Auth } from 'aws-amplify';
import { Form, Button, Spinner } from 'react-bootstrap';
// import { initializeUser } from '@frontend/shared/redux/actions/user';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      verify: false,
      code: '',
      disabled: false,
      auth: false,
    };
  }

  signUp = () => {
    const { password, email, name } = this.state;

    Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        name,
        picture: 'https://codemarket-common-storage.s3.amazonaws.com/public/default/profile.jpeg',
      },
    })
      .then((res) => {
        this.setState({
          password: '',
          name: '',
          verify: true,
          disabled: false,
        });
        this.props.dispatch(hideLoading());
      })
      .catch((err) => {
        this.setState({ ...this.state, disabled: false });
        this.props.dispatch(hideLoading());
        alert(err.message);
      });
  };

  confirmSignUp = () => {
    const { email, code } = this.state;
    Auth.confirmSignUp(email, code)
      .then((res) => {
        this.setState({
          code: '',
          email: '',
          disabled: false,
          auth: true,
          verify: false,
        });
        this.props.dispatch(hideLoading());
        alert('Account successfully created!');
      })
      .catch((err) => {
        this.setState({ ...this.state, disabled: false });
        this.props.dispatch(hideLoading());
        alert(err.message);
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(showLoading());
    // this.props.dispatch(initializeUser());
    const { verify } = this.state;
    this.setState({ ...this.state, disabled: true });
    if (verify) {
      this.confirmSignUp();
    } else {
      this.signUp();
    }
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, password, name, code, verify, disabled } = this.state;
    if (verify) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="single__account">
            {/* <div className='input__box'>
              <span>Verify your email!</span>
              <small>Verification code has been sent to {email}</small>
              <input
                onChange={this.handleChange}
                value={code}
                type='text'
                name='code'
                id='code'
                placeholder='Enter Verification Code'
                required
              />
            </div> */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Verify your email!</Form.Label>
              <br />
              <small>Verification code has been sent to {email}</small>
              <Form.Control
                onChange={this.handleChange}
                value={code}
                type="text"
                name="code"
                id="code"
                placeholder="Enter Verification Code"
                required
              />
              <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
            </Form.Group>
            <p
              onClick={() => this.setState({ ...this.state, verify: false })}
              className="forget__pass"
              style={{ cursor: 'pointer' }}>
              Signup Again?
            </p>
            <Button
              style={{ pointerEvents: disabled ? 'none' : 'auto' }}
              type="submit"
              className="account__btn">
              {disabled ? (
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
        <form onSubmit={this.handleSubmit}>
          <div className="single__account">
            {/* <div className='input__box'>
              <span>Name</span>
              <input
                onChange={this.handleChange}
                value={name}
                type='text'
                name='name'
                id='name'
                placeholder='Name'
                required
              />
            </div>
            <div className='input__box'>
              <span>Email address</span>
              <input
                onChange={this.handleChange}
                value={email}
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                required
              />
            </div>
            <div className='input__box'>
              <span>Password</span>
              <input
                onChange={this.handleChange}
                value={password}
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                required
              />
            </div> */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                value={name}
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                required
              />
              <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
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
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                value={password}
                type="password"
                name="password"
                placeholder="Password"
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
                'Register'
              )}
            </Button>
          </div>
        </form>
      );
    }
  }
}

export default connect()(Signup);

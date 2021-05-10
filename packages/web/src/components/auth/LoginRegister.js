import React from 'react';
import { connect } from 'react-redux';
import { Tab, Nav } from 'react-bootstrap';
import Signup from './Signup';
import Login from './Login';

const LoginRegister = (props) => {
  return (
    <div className="row pt-5">
      <div className="col-lg-12">
        <Tab.Container defaultActiveKey="login">
          <Nav variant="pills" className="acount__nav justify-content-center mb-3">
            <Nav.Item>
              <Nav.Link eventKey="login" className="text-dark">
                Sign In
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="register" className="text-dark">
                Sign Up
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="login">
              <Login />
            </Tab.Pane>
            <Tab.Pane eventKey="register">
              <Signup />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth, user }) => {
  return {
    auth,
    user
  };
};

export default connect(mapStateToProps)(LoginRegister);

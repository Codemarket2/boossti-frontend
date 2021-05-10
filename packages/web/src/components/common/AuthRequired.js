import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import UnAuthorised from './UnAuthorised';
import NotFound from './NotFound';

const AuthRequired = (props) => {
  return (
    <div>
      {props.initial ? (
        props.authenticated ? (
          props.mustAdmin ? (
            props.admin ? (
              <>{props.children}</>
            ) : (
              <NotFound />
            )
          ) : (
            props.children
          )
        ) : (
          <UnAuthorised redirectPath={props.redirectPath || '/'} />
        )
      ) : (
        <div className="text-center pt-5">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
    admin: auth.authenticated ? auth.data.admin : false,
    initial: auth.initial,
  };
};
export default connect(mapStateToProps)(AuthRequired);

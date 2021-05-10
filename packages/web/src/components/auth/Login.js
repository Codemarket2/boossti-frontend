import React, { useState } from 'react';
import ForgetPassword from './ForgetPassword';
import Signin from './Signin';

const Login = (props) => {
  const [showLogin, setShowLogin] = useState(true);
  const changeLogin = (v) => {
    setShowLogin(v);
  };
  return (
    <div>
      {showLogin ? (
        <Signin changeLogin={changeLogin} />
      ) : (
        <ForgetPassword changeLogin={changeLogin} />
      )}
    </div>
  );
};

export default Login;

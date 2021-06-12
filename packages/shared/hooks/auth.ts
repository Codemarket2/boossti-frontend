import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';
import { setAuthUser, initialAuthUser } from '../redux/actions/auth';
import { showLoading, hideLoading } from '../redux/actions/loading';
import { useInitialUser } from './users';

export function useCurrentAuthenticatedUser(): null {
  const dispatch = useDispatch();
  useInitialUser();
  const getUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        const data = {
          attributes: user.attributes,
          signInUserSession: user.signInUserSession,
          admin: user.signInUserSession.accessToken.payload['cognito:groups']
            ? user.signInUserSession.accessToken.payload['cognito:groups'].indexOf('superadmin') >
              -1
            : false,
        };
        dispatch(setAuthUser(data));
      }
    } catch (error) {
      dispatch(initialAuthUser());
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return null;
}

interface IForgetPasswordState {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
  verify: boolean;
  disabled: boolean;
}

interface IForgetPasswordArgs {
  onAlert: (a: string, b: string) => void;
  changeLogin: (a: boolean) => void;
}

export function useForgetPassword({
  onAlert = () => {},
  changeLogin = () => {},
}: IForgetPasswordArgs) {
  const dispatch = useDispatch();
  const [state, setState] = useState<IForgetPasswordState>({
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
    verify: false,
    disabled: false,
  });

  const forgetPassword = async () => {
    setState({ ...state, disabled: true });
    await Auth.forgotPassword(state.email);
    setState({
      ...state,
      disabled: false,
      verify: true,
    });
  };

  const resetPassword = async () => {
    const { email, code, password, confirmPassword } = state;
    if (password === confirmPassword) {
      await Auth.forgotPasswordSubmit(email, code, password);
      setState({
        ...state,
        code: '',
        email: '',
        password: '',
        confirmPassword: '',
        disabled: false,
      });
      changeLogin(true);
    } else {
      throw new Error("Password and Confirm Password doesn't Match!");
    }
  };

  const onSubmit = async () => {
    try {
      dispatch(showLoading());
      setState({ ...state, disabled: true });
      if (state.verify) {
        await resetPassword();
      } else {
        await forgetPassword();
      }
      dispatch(hideLoading());
    } catch (error) {
      setState({ ...state, disabled: false });
      dispatch(hideLoading());
      onAlert('Error', error.message);
    }
  };

  return { state, setState, onSubmit };
}

interface ISignUpState {
  name: string;
  email: string;
  password: string;
  code: string;
  verify: boolean;
  showPassword: boolean;
  disabled: boolean;
}

interface ISignUpArgs {
  onAlert: (a: string, b: string) => void;
}

export function useSignUp({ onAlert = () => {} }: ISignUpArgs) {
  const dispatch = useDispatch();
  const [state, setState] = useState<ISignUpState>({
    name: '',
    email: '',
    password: '',
    disabled: false,
    code: '',
    verify: false,
    showPassword: false,
  });

  const signUp = async () => {
    const { password, email, name } = state;
    Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        name,
        picture: 'https://codemarket-common-storage.s3.amazonaws.com/public/default/profile.jpeg',
      },
    });
    setState({
      ...state,
      password: '',
      name: '',
      verify: true,
      disabled: false,
    });
    dispatch(hideLoading());
  };

  const confirmSignUp = async () => {
    const { email, code } = state;
    await Auth.confirmSignUp(email, code);
    setState({
      ...state,
      code: '',
      email: '',
      disabled: false,
      verify: false,
    });
    dispatch(hideLoading());
    alert('Account successfully created!');
  };

  const onSubmit = async () => {
    try {
      dispatch(showLoading());
      setState({ ...state, disabled: true });
      if (state.verify) {
        await confirmSignUp();
      } else {
        await signUp();
      }
      dispatch(hideLoading());
    } catch (error) {
      setState({ ...state, disabled: false });
      dispatch(hideLoading());
      onAlert('Error', error.message);
    }
  };

  return { state, setState, onSubmit };
}

interface ISignInArgs {
  onAlert: (a: string, b: string) => void;
}

interface ISignInState {
  email: string;
  password: string;
  code: string;
  verify: boolean;
  disabled: boolean;
  auth: boolean;
  forgetPassword: boolean;
  showPassword: boolean;
}

export function useSignIn({ onAlert = () => {} }: ISignInArgs) {
  // mobile = false,
  // checkToken = () => null,
  // updateEndpoint = () => {},
  const [state, setState] = useState<ISignInState>({
    email: '',
    password: '',
    code: '',
    verify: false,
    disabled: false,
    auth: false,
    forgetPassword: false,
    showPassword: false,
  });

  const dispatch = useDispatch();
  // const deleteOldEndpoint = useDeleteOldEndpoint();
  // const addUserEndpoint = useAddUserEndpoint();

  const onSubmit = async () => {
    try {
      dispatch(showLoading());
      setState({ ...state, disabled: true });
      if (state.verify) {
        await confirmSignUp();
      } else {
        await signIn();
      }
      dispatch(hideLoading());
    } catch (error) {
      setState({
        ...state,
        disabled: false,
      });
      onAlert('Error', error.message);
    }
  };

  const signIn = async () => {
    const { password, email } = state;
    try {
      const user = await Auth.signIn(email, password);
      setState({
        ...state,
        verify: false,
        disabled: false,
      });

      // if (mobile) {
      //   const checkTokenRes = await checkToken();
      //   // const endpoint = await getEndpoint(user.attributes.sub);
      //   // if (endpoint) {
      //   //   await deleteOldEndpoint({ userId: user.attributes.sub });
      //   // }

      //   if (checkTokenRes) {
      //     const deleteRes = await deleteOldEndpoint({ userId: user.attributes.sub });
      //     console.log('deleteRes', deleteRes);
      //     await updateEndpoint({ userId: user.attributes.sub, address: checkTokenRes });
      //   }
      // }

      const data = {
        attributes: user.attributes,
        signInUserSession: user.signInUserSession,
        admin: user.signInUserSession.accessToken.payload['cognito:groups']
          ? user.signInUserSession.accessToken.payload['cognito:groups'].indexOf('superadmin') > -1
          : false,
      };
      dispatch(setAuthUser(data));
    } catch (error) {
      setState({ ...state, disabled: false });
      if (error.code === 'UserNotConfirmedException') {
        sendVerificationCode(email);
      } else {
        onAlert('Error', error.message);
      }
    }
  };

  const sendVerificationCode = async (email) => {
    await Auth.resendSignUp(email);
    setState({
      ...state,
      email,
      disabled: false,
      verify: true,
    });
  };

  const confirmSignUp = async () => {
    const { email, code } = state;
    await Auth.confirmSignUp(email, code);
    setState({
      ...state,
      code: '',
      email: '',
      disabled: false,
      auth: true,
      verify: false,
    });
    onAlert('Email Verified Successfully', 'Please Sign In now with your email and password');
  };

  return { state, setState, signIn, onSubmit };
}

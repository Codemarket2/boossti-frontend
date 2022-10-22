import { useEffect, useState } from 'react';

interface IUseDebounce {
  callback: () => any;
  time?: number;
  listenForChange?: boolean;
  variable?: any;
}

export const useDebounce = ({
  callback,
  time = 1000,
  listenForChange = false,
  variable,
}: IUseDebounce) => {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    let timeOutId;
    if (flag) {
      setFlag(false);
      setTimeout(() => {
        if (callback) {
          callback();
        }
      }, time);
    }
    return () => clearTimeout(timeOutId);
  }, [flag]);

  useEffect(() => {
    if (listenForChange && variable) {
      callFunction();
    }
  }, [variable]);

  const callFunction = () => setFlag(true);

  return { callFunction };
};

import { useEffect } from 'react';

interface IUseDebounce {
  callback: () => any;
  value: any;
  time?: number;
}

export const useDebounce = ({ callback, time = 1500, value }: IUseDebounce) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, time);
    return () => clearTimeout(handler);
  }, [value]);
};

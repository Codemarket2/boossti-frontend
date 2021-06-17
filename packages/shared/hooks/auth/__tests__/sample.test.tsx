import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useState, useCallback } from 'react';

export default function useCounter() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((x) => x + 1), []);
  return { count, increment };
}

test('should use counter', () => {
  // const wrapper = ({ children }) => <div>{children}</div>;
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toBe(0);
  expect(typeof result.current.increment).toBe('function');
});

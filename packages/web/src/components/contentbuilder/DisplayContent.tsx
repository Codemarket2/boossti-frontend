import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

interface IProps {
  value: string;
}

export default function Home({ value }: IProps) {
  const [state, setState] = useState(`container${uuid()}`);

  async function onLoad() {
    let range = document.createRange();
    const wrapper = document.querySelector(`.${state}`);
    wrapper.innerHTML = '';
    wrapper.appendChild(range.createContextualFragment(value)); // We use createContextualFragment so that embedded javascript code (code block) will be executed
  }

  useEffect(() => {
    if (value && state) {
      onLoad();
    }
  }, [value, state]);

  return <div className={`is-container container ${state}`}></div>;
}

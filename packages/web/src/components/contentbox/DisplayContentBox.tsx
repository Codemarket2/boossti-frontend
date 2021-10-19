import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import StyledDiv from '../contentbuilder/StyledDiv';
import { getSepratorValue } from './seprator';

interface IProps {
  value: string;
}

export default function DisplayContentBox({ value }: IProps) {
  const [state, setState] = useState(`container${uuid()}`);

  async function onLoad() {
    const { pageHTML, mainCss, sectionCss } = getSepratorValue(value);
    if (mainCss) {
      document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend', mainCss);
    }
    if (sectionCss) {
      document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend', sectionCss);
    }
    let range = document.createRange();
    const wrapper = document.querySelector(`.${state}`);
    wrapper.innerHTML = '';
    wrapper.appendChild(range.createContextualFragment(pageHTML)); // We use createContextualFragment so that embedded javascript code (code block) will be executed
  }

  useEffect(() => {
    if (value && state) {
      onLoad();
    }
  }, [value, state]);

  return (
    <StyledDiv>
      <div className={`${state} is-wrapper`}></div>
    </StyledDiv>
  );
}

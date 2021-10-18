import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import StyledDiv from '../contentbuilder/StyledDiv';

interface IProps {
  pageHTML: string;
  mainCss: string;
  sectionCss: string;
}

export default function Home({ pageHTML, mainCss, sectionCss }: IProps) {
  const [state, setState] = useState(`container${uuid()}`);

  async function onLoad() {
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
    if (pageHTML && state) {
      onLoad();
    }
  }, [pageHTML, state]);

  return (
    <StyledDiv>
      <div className={`${state} is-wrapper`}></div>
    </StyledDiv>
  );
}

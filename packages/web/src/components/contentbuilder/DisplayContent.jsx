import { useEffect } from 'react';
import StyledDiv from './StyledDiv';

export default function Home({ value }) {
  async function onLoad() {
    let range = document.createRange();
    const wrapper = document.querySelector('.container');
    wrapper.innerHTML = '';
    wrapper.appendChild(range.createContextualFragment(value)); // We use createContextualFragment so that embedded javascript code (code block) will be executed
  }
  useEffect(() => {
    onLoad();
  }, [value]);
  return (
    <StyledDiv>
      <div className="is-container container"></div>
    </StyledDiv>
  );
}

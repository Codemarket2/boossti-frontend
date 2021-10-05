import { useEffect } from 'react';

export default function Home({ htmlData, onClickEdit }) {
  async function onLoad() {
    let range = document.createRange();
    const wrapper = document.querySelector('.container');
    wrapper.innerHTML = '';
    wrapper.appendChild(range.createContextualFragment(htmlData)); // We use createContextualFragment so that embedded javascript code (code block) will be executed
  }
  useEffect(() => {
    onLoad();
  }, []);
  return (
    <>
      <div className="panel-home is-cms">
        <section>
          <span style={{ cursor: 'pointer' }} onClick={onClickEdit}>
            Edit
          </span>
        </section>
      </div>
      <div className="is-container container"></div>
    </>
  );
}

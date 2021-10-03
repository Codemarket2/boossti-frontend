import { useEffect } from 'react';
import Link from 'next/link';
// import './Home.css';

export default function Home() {
  useEffect(() => {
    onLoad();
  }, []);
  async function onLoad() {
    // Clear
    // localStorage.removeItem('mywebcontent');
    // Initial sample (initial) content (or you can get content from a database. In this demo we will use browser's localStorage)
    let html = `<div class="row clearfix">
                      <div class="column full">
                          <h2 class="size-32" style="text-align: center; font-weight: 400;">Simply Beautiful</h2>
                      </div>
                  </div>
                  <div class="row clearfix">
                      <div class="column full" data-noedit="">
                          <div class="spacer height-40"></div>
                      </div>
                  </div>
                  <div class="row clearfix">
                      <div class="column half">
                          <img src="https://codemarket-common-bucket.s3.amazonaws.com/public/defaults/pictures/default.jpg" alt="vivekvt">
                      </div><div class="column half">
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                      </div>
                  </div>`;
    // Check if there is previously saved content. If so, use it.
    if (localStorage.getItem('mywebcontent')) {
      html = localStorage.getItem('mywebcontent');
    } else {
      localStorage.setItem('mywebcontent', html);
    }
    // Render html content
    let range = document.createRange();
    const wrapper = document.querySelector('.container');
    wrapper.innerHTML = '';
    wrapper.appendChild(range.createContextualFragment(html)); // We use createContextualFragment so that embedded javascript code (code block) will be executed
  }
  return (
    <>
      <div className="panel-home is-cms">
        <section>
          <Link className="is-btn" href={'/builder'}>
            Edit
          </Link>
        </section>
      </div>
      <div className="is-container container"></div>
    </>
  );
}

import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About" isActive={activeIndex === 0} onShow={() => setActiveIndex(0)}>
        With a population of about 2 million, Almaty is Kazakhstans largest city. From 1929 to 1997,
        it was its capital city.
      </Panel>
      <Panel title="Etymology" isActive={activeIndex === 1} onShow={() => setActiveIndex(1)}>
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for apple and is often
        translated as full of apples. In fact, the region surrounding Almaty is thought to be the
        ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a
        likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

function Panel({ title, children, isActive, onShow }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button type="button" onClick={onShow}>
          Show
        </button>
      )}
    </section>
  );
}
Panel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired,
  onShow: PropTypes.func.isRequired,
};

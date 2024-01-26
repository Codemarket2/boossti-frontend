import PropTypes from 'prop-types';

function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = `${name} ✔`;
  }
  return <li className="item">{itemContent}</li>;
}
Item.propTypes = {
  name: PropTypes.string.isRequired,
  isPacked: PropTypes.bool.isRequired,
};
export default function PackingList() {
  return (
    <section>
      <h1>Sally Rides Packing List</h1>
      <ul>
        <Item isPacked name="Space suit" />
        <Item isPacked name="Helmet with a golden leaf" />
        <Item isPacked={false} name="Photo of Tam" />
      </ul>
    </section>
  );
}

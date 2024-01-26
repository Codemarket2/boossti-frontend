import PropTypes from 'prop-types';

function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

Cup.propTypes = {
  guest: PropTypes.number.isRequired,
};

export default function TeaGathering() {
  const cups = [];
  for (let i = 1; i <= 12; i += 1) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return <div>{cups}</div>;
}

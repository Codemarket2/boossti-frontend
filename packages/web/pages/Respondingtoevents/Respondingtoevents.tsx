import PropTypes from 'prop-types';

export default function Event() {
  return (
    <Toolbar onPlayMovie={() => alert('Playing!')} onUploadImage={() => alert('Uploading!')} />
  );
}

function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}>Play Movie</Button>
      <Button onClick={onUploadImage}>Upload Image</Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
}
// Event.propTypes = {
//   onPlayMovie: PropTypes.func.isRequired,
//   onUploadImage: PropTypes.func.isRequired,
// };

Toolbar.propTypes = {
  onPlayMovie: PropTypes.func.isRequired,
  onUploadImage: PropTypes.func.isRequired,
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

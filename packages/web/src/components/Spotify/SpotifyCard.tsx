import React from 'react';
import PropTypes from 'prop-types';
import SpotifyCol from './SpotifyCol';

interface CardProps {
  imageSource: string;
  title: string;
  description: string;
}

const CardComponent: React.FC<CardProps> = (props) => {
  const { imageSource, title, description } = props;

  const cardStyle: React.CSSProperties = {
    width: '100px',
    // height: '100px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
  };

  const cardHoverStyle: React.CSSProperties = {
    transform: 'scale(1)',
    backgroundColor: 'grey',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: 'auto',
    borderBottom: '1px solid #ddd',
  };

  const cardContentStyle: React.CSSProperties = {
    padding: '0.5 px',
    color: 'white',
    textAlign: 'center',
  };

  return (
    <div
      style={{ ...cardStyle, ...cardHoverStyle }}
      //   onMouseOver={() => console.log('Mouse over')}
      //   onFocus={() => console.log('Focus')}
    >
      <img src={imageSource} alt="Card " style={imageStyle} />
      <div style={cardContentStyle}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

CardComponent.propTypes = {
  imageSource: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default CardComponent;

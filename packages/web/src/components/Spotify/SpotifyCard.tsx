import React from 'react';
import PropTypes from 'prop-types';
import SpotifyCol from './SpotifyCol';

interface CardProps {
  imageSource: string;
  title: string;
  description: string;
  // width: number;
  height: number;
  textStyles?: React.CSSProperties;
  descriptionStyles?: React.CSSProperties;
}

const CardComponent: React.FC<CardProps> = (props) => {
  const { imageSource, title, description, height, textStyles, descriptionStyles } = props;
  const cardStyle: React.CSSProperties = {
    width: `100%`, // Use percentage for width
    height: `100%`,
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
    height: '60%',
    borderBottom: '1px solid #ddd',
    // objectFit: 'cover',
  };

  const cardContentStyle: React.CSSProperties = {
    padding: '0.5 px',
    color: 'white',
    textAlign: 'center',
  };
  const descriptionStyle: React.CSSProperties = {
    fontSize: `${height}rem`,
    ...descriptionStyles,
  };

  return (
    <div
      style={{
        ...cardStyle,
        ...cardHoverStyle,
      }}
    >
      {/* onMouseOver={() => console.log('Mouse over')}
         onFocus={() => console.log('Focus')} */}

      <img src={imageSource} alt="Card " style={imageStyle} />
      <div style={cardContentStyle}>
        {/* <h2 style={{ fontSize: `${height}rem` }}>{title}</h2>
        <p style={{ fontSize: `${height}rem` }}>{description}</p> */}
        <h2 style={descriptionStyle}>{title}</h2>
        <p style={descriptionStyle}>{description}</p>
      </div>
    </div>
  );
};

CardComponent.propTypes = {
  imageSource: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  textStyles: PropTypes.shape({
    // Specify specific property types for textStyles
    color: PropTypes.string,
    fontSize: PropTypes.string,
    // Add more property types as needed
  }),
  descriptionStyles: PropTypes.shape({
    // Specify specific property types for descriptionStyles
    color: PropTypes.string,
    fontSize: PropTypes.string,
    // Add more property types as needed
  }),
};
export default CardComponent;

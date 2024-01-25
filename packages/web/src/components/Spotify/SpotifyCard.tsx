import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

interface CardProps {
  imageSource: string;
  title: string;
  description: string;
  width: number;
  height: number;
  textStyles?: React.CSSProperties;
  descriptionStyles?: React.CSSProperties;
}

const CardComponent: React.FC<CardProps> = (props) => {
  const { imageSource, title, description, height, descriptionStyles } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  console.log(descriptionStyles, 'descriptionStyles');
  const cardStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '70%',
    borderBottom: '1px solid #ddd',
  };

  const cardContentStyle: React.CSSProperties = {
    padding: '10px',
    color: 'black',
    width: '100%',
    height: '30%',
    textAlign: 'center',
    transition: 'font-size 0.3s ease-in-out',
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: `${height}rem`,
    ...descriptionStyles,
  };

  return (
    <div ref={containerRef} style={cardStyle}>
      <img src={imageSource} alt="Card Image" style={imageStyle} />
      <div style={cardContentStyle}>
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
  // width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  textStyles: PropTypes.object, // PropTypes for text styles
  descriptionStyles: PropTypes.object,
};
export default CardComponent;

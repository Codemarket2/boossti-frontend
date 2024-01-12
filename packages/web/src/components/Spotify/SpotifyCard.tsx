import React, { useRef, useEffect, useState } from 'react';

interface CardProps {
  imageSource: string;
  title: string;
  description: string;
  width: number;
  height: number;
}

const CardComponent: React.FC<CardProps> = (props) => {
  const { imageSource, title, description, height, width } = props;
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={containerRef} style={cardStyle}>
      <img src={imageSource} alt="Card Image" style={imageStyle} />
      <div style={cardContentStyle}>
        <h2 style={{ fontSize: `${height}rem` }}>{title}</h2>
        <p style={{ fontSize: `${height}rem` }}>{description}</p>
      </div>
    </div>
  );
};

export default CardComponent;

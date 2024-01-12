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

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerSize({ width, height });
    }
  }, [containerSize.width, containerSize.height]);

  console.log(containerSize, containerSize, 'This is in the size thing');
  const cardStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
    // backgroundColor: 'black',
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
    fontSize: `${containerSize.width / 10}vw`, // Using vw unit based on container width
    transition: 'font-size 0.3s ease-in-out', // Adding transition for smoother effect
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

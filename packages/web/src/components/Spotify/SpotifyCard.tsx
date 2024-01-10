import React from 'react';

interface CardProps {
  imageSource: string;
  title: string;
  description: string;
  // width : number;
  // height : number;
}

const CardComponent: React.FC<CardProps> = (props) => {
  const { imageSource, title, description } = props;

  const cardStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
  };

  const cardHoverStyle: React.CSSProperties = {
    transform: 'scale(1.05)',
    backgroundColor: 'black',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: 'auto',
    borderBottom: '1px solid #ddd',
  };

  const cardContentStyle: React.CSSProperties = {
    padding: '10px',
    color: 'white',
    textAlign: 'center',
    fontSize: '1em', // or '1rem' - adjust as needed
  };

  return (
    <div style={{ ...cardStyle, ...cardHoverStyle }} onMouseOver={() => console.log('Mouse over')}>
      <img src={imageSource} alt="Card Image" style={imageStyle} />
      <div style={cardContentStyle}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CardComponent;

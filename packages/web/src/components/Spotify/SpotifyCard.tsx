import React, { useRef, useState } from 'react';
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
  const {
    imageSource,
    title: initialTitle,
    description: initialDescription,
    height,
    descriptionStyles,
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(initialTitle);

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(initialDescription);

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

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleDescriptionClick = () => {
    setIsEditingDescription(true);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleDescriptionBlur = () => {
    setIsEditingDescription(false);
  };

  return (
    <div ref={containerRef} style={cardStyle}>
      <img src={imageSource} alt="Card Image" style={imageStyle} />
      <div style={cardContentStyle}>
        {isEditingTitle ? (
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            style={descriptionStyle}
          />
        ) : (
          <h2 style={descriptionStyle} onClick={handleTitleClick}>
            {title}
          </h2>
        )}
        {isEditingDescription ? (
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            onBlur={handleDescriptionBlur}
            style={descriptionStyle}
          />
        ) : (
          <p style={descriptionStyle} onClick={handleDescriptionClick}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

CardComponent.propTypes = {
  imageSource: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  textStyles: PropTypes.object,
  descriptionStyles: PropTypes.object,
};

export default CardComponent;

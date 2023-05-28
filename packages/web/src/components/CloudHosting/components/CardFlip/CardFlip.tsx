import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import ReactCardFlip from 'react-card-flip';

const useStyles = makeStyles({
  card: {
    width: 300,
    height: 400,
    perspective: '1000px',
    transition: 'transform 0.6s',
  },
  cardFront: {
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    transform: 'rotateY(180deg)',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
});

function FlippingCard() {
  const classes = useStyles();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseOver = () => {
    setIsFlipped(true);
  };

  return (
    <>
      <Card>
        <CardContent>
          <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            {/* //Front Side  */}
            <div onMouseEnter={handleMouseOver}>
              <CardMedia
                component="img"
                height="200"
                image="/humanQuestionMark.jpg"
                alt="Human Question Mark"
              />
              <h2>Front Side</h2>
            </div>
            {/* Back Side */}
            <div>
              <CardMedia component="img" height="200" image="front-image.jpg" alt="Front Image" />
              <h2>Back Side</h2>
            </div>
          </ReactCardFlip>
        </CardContent>
      </Card>
    </>
  );
}

export default FlippingCard;

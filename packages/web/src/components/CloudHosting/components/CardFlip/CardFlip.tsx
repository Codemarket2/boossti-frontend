import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

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

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  return (
    <Card className={classes.card} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <CardContent
        className={isFlipped ? `${classes.cardBack} ${classes.card}` : classes.cardFront}
      >
        {isFlipped ? (
          <>
            <CardMedia component="img" height="200" image="back-image.jpg" alt="Back Image" />
            <h2>Back Side</h2>
          </>
        ) : (
          <>
            <CardMedia component="img" height="200" image="front-image.jpg" alt="Front Image" />
            <h2>Front Side</h2>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default FlippingCard;

import React from 'react';
import clsx from 'clsx';
import Swiper from 'swiper';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';
import { SectionHeader, IconAlternate } from '../../../../components/molecules';
import { CardReview } from '../../../../components/organisms';

const useStyles = makeStyles((theme) => ({
  swiperContainer: {
    width: '100%',
    maxWidth: 500,
  },
}));

const Reviews = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  React.useEffect(() => {
    new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-container .swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      autoplay: {
        delay: 2000,
      },
    });
  });

  return (
    <div className={className} data-aos="fade-up" {...rest}>
      <SectionHeader
        title="Take a look what our customers say"
        subtitle="Take a quick glance at some of our past projects. If you would like to see some more great work, get in touch with us to take a look at our private portfolio."
      />
      <div className={clsx('swiper-container', classes.swiperContainer)}>
        <div className="swiper-wrapper">
          {data.map((item: any, index: number) => (
            <CardReview
              key={index}
              className={'swiper-slide'}
              noBorder
              noShadow
              text={item.feedback}
              icon={<IconAlternate color={colors.indigo} fontIconClass="fas fa-quote-right" />}
              authorName={item.authorName}
              authorTitle={item.authorOccupation}
              authorPhoto={item.authorPhoto}
            />
          ))}
        </div>
        <div className="swiper-pagination" />
      </div>
    </div>
  );
};

export default Reviews;

import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SectionHeader, IconAlternate } from '../../../../components/molecules';
import { CardBase, DescriptionListIcon } from '../../../../components/organisms';

const Features = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => (
  <div className={className} {...rest}>
    <SectionHeader
      title={
        <span>
          The Best Front And{' '}
          <Typography color="secondary" variant="inherit" component="span">
            Landing Pages
          </Typography>{' '}
          In One Platform
        </span>
      }
      fadeUp
    />
    <Grid container spacing={2}>
      {data.map((adv: any, index: number) => (
        <Grid
          key={index}
          item
          container
          alignItems="center"
          direction="column"
          xs={6}
          md={3}
          data-aos="fade-up">
          <CardBase liftUp variant="outlined" style={{ borderTop: `5px solid ${adv.color[500]}` }}>
            <DescriptionListIcon
              icon={
                <IconAlternate
                  fontIconClass={adv.icon}
                  color={adv.color}
                  shape="circle"
                  size="small"
                />
              }
              title={adv.title}
            />
          </CardBase>
        </Grid>
      ))}
    </Grid>
  </div>
);

export default Features;

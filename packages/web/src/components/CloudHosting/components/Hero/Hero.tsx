import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import * as d3 from 'd3'; // This Library is used for displaying piechart
import { SectionHeader } from '../../components2/molecules';
import { Section } from '../../components2/organisms';
import Boxes from '../Boxes/Boxes';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'white',
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
    },
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minHeight: 470,
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  section: {
    marginTop: '15vh',
    paddingTop: 0,
    paddingBottom: 0,
  },
  sectionHeader: {
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up('md')]: {
      maxWidth: '50%',
      width: 'calc(100vw - 625px)',
    },
  },
  textWhite: {
    color: 'white',
  },
  textBlue: {
    color: 'rgb(13,4,72)',
  },
  pieChart: {
    // alignSelf: 'flex-start',
    // maxWidth: 625,
    transform: 'translateX(-50%)',
    height: 'auto',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: '50%',
      right: 0,
      width: 'auto',
      transform: 'translateY(-50%) !important',
    },
  },
}));

const Hero = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();
  const svgRef = useRef();
  // Code for pieChart
  const width = 400;
  const height = 400;
  const [hoveredArc, setHoveredArc] = useState(null);
  const [showBox, setShowBox] = useState(false);
  // Function to handle mouseover event on pie arcs
  const handleMouseOver = (event, d) => {
    setHoveredArc(d.data);
    setarcData(d.data);

    // console.log("In")
    setShowBox(true);
  };

  // Function to handle mouseout event on pie arcs
  const handleMouseOut = () => {
    setHoveredArc(null);

    setShowBox(false);
    // console.log("out")
  };

  const [arcData, setarcData] = useState<{ label: string; value: number }>(null);
  const data = [
    { label: 'Channels', value: 30 },
    { label: 'Community', value: 50 },
    { label: 'Branding', value: 20 },
  ];
  // this function is when a particular arc is clicked
  const handleArcClick = (event, dat) => {
    // Perform your desired task here
    // console.log('Clicked arc:', dat);
    setarcData(dat);
    // setOpen(true);
  };
  useEffect(() => {
    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);

    const pie = d3.pie<{ label: string; value: number }>().value((d) => d.value); // Specify the type for pie
    const arc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2 - 1); // Specify the type for arc

    const arcs = svg
      .selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => d3.schemeCategory10[i % 10])
      .on('click', (event, d) => handleArcClick(event, d.data))
      .on('mouseenter', handleMouseOver)
      .on('mouseleave', handleMouseOut);
    arcs
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text((d) => d.data.label);
  }, []);
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div className={classes.hero}>
        {arcData && showBox ? (
          <Boxes data={arcData} />
        ) : (
          <Section className={classes.section}>
            <div className={classes.sectionHeader}>
              {/* <Typography variant="h6" gutterBottom className={classes.textBlue}>
              Download Free for Mac, Windows and Linux OS
            </Typography> */}
              <SectionHeader
                titleVariant="h4"
                title={<span className={classes.textBlue}>Growth Marketing Agency</span>}
                subtitle={
                  <span className={classes.textBlue}>
                    ROI driven,Powered by AI/ML,Data Science,App Coding & Emotional design-Email
                    marketing , Social Media Marketing and community building
                  </span>
                }
                ctaGroup={[
                  <Button variant="contained" size="large">
                    Explore
                  </Button>,
                ]}
                align="left"
                data-aos="fade-up"
              />
            </div>
          </Section>
        )}
        <div className={classes.pieChart}>
          <svg ref={svgRef} />
        </div>
      </div>
    </div>
  );
};

export default Hero;

interface HeroShapedProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * Children to placed inside the section right side
   */
  rightSide: JSX.Element;
  /**
   * Children to placed inside the section left side
   */
  leftSide: JSX.Element;
  // All other props
  [x:string]: any;
}
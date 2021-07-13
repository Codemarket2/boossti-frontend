interface HeroBackgroundProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * Children to placed inside the hero
   */
  children?: JSX.Element;
  /**
   * Background image of the hero
   */
  backgroundImg?: string;
  /**
   * Background color of the hero
   */
  backgroundColor?: string;
  /**
   * Background position of the hero
   */
  backgroundPosition?: string;
  /**
   * Custom classes for the content section
   */
  contentSectionClassName?: string;
  /**
   * Should disable here cover opacity
   */
  disbaleCoverOpacity?: boolean;
  // All other props
  [x:string]: any;
}
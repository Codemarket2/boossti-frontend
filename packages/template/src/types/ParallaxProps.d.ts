interface ParallaxProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * The content
   */
  children?: JSX.Element;
  /**
   * The parallax background image
   */
  backgroundImage: string;

  // All other props
  [x:string]: any;
}
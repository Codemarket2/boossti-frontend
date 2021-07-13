interface HeroSimpleBackgroundProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * The main content
   */
  children: JSX.Element;
  /**
   * The background image of the hero
   */
  backgroundImage: string;
  /**
   * The background size of the hero
   */
  backgroundSize?: string | number;
  /**
   * The background position of the hero
   */
  backgroundPosition?: string | number;
  // All other props
  [x:string]: any;
}
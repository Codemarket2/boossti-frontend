interface HeroSideImageProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * Children to placed inside the hero
   */
  children?: JSX.Element;
  /**
   * Background color of the hero
   */
  backgroundColor?: string;
  /**
   * Side image
   */
  imageSrc: string;
  /**
   * Side image srcset
   */
  imageSrcSet?: string;
  /**
   * Should show in reverse order
   */
  reverse?: boolean;
  // All other props
  [x:string]: any;
}
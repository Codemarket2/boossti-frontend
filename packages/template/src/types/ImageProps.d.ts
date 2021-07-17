interface ImageProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * Source of the image
   */
  src: string;
  /**
   * Source set for the responsive images
   */
  srcSet?: string;
  /**
   * Image title
   */
  alt?: string;
  /**
   * Lazy loading properties
   */
  lazyProps?: object;
  /**
   * Should lazy load the image
   */
  lazy?: boolean;
  // All other props
  [x:string]: any;
}
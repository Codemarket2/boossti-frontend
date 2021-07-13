interface SwiperImageProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * External classes for the images
   */
  imageClassName?: string;
  /**
   * The array of images object which should consist of src, alt and srcset attributes
   */
  items: Array<ImageProps>;
  /**
   * Styles classes of the navigation button
   */
  navigationButtonStyle?: string;
  // All other props
  [x:string]: any;
}
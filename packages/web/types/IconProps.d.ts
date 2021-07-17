interface IconProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * The classes of the font icon
   */
  fontIconClass: string;
  /**
   * Source set for the responsive images
   */
  size?: 'extraSmall' | 'small' | 'medium' | 'large';
  /**
   * Color of the icon
   */
  fontIconColor?: string;
  // All other props
  [x:string]: any;
}
interface IconTextProps {
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
  color?: string;
  /**
   * Title of the icon-text
   */
  title: string;
  /**
   * Additional properties to pass to the Icon component
   */
  iconProps?: object;
  /**
   * Additional properties to pass to the Typography component
   */
  typographyProps?: object;
  // All other props
  [x:string]: any;
}
interface DescriptionListIconProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * The title
   */
  title: string;
  /**
   * the subtitle
   */
  subtitle?: string;
  /**
   * Whether should show the alternate icon
   */
  icon: JSX.Element;
  /**
   * The alignment of the items
   */
  align?: 'left' | 'right' | 'center';
  /**
   * Title variant
   */
  titleVariant?: 'inherit' | 'button' | 'overline' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'srOnly' | undefined;
  /**
   * Subtitle variant
   */
  subtitleVariant?: 'inherit' | 'button' | 'overline' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'srOnly' | undefined;
  /**
   * Additional props to pass to the title Typography component
   */
  titleProps?: object;
  /**
   * Additional props to pass to the subtitle Typography component
   */
  subtitleProps?: object;
  // All other props
  [x:string]: any;
}
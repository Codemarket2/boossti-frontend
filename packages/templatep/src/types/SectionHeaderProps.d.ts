interface SectionHeaderProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * Title of the section header
   */
  title: string | JSX.Element;
  /**
   * Subtitle of the section header
   */
  subtitle?: string | JSX.Element;
  /**
   * Label title of the section header
   */
  label?: string;
  /**
   * The overline component in the section header
   */
  overline?: JSX.Element;
  /**
   * Array of the CTAs
   */
  ctaGroup?: Array<JSX.Element>;
  /**
   * Whether to fade up on scroll
   */
  fadeUp?: boolean;
  /**
   * Header content (title, subtitle, CTAs) alignment
   */
  align?: 'right' | 'left' | 'center';
  /**
   * Whether to disable bottom margin of the section
   */
  disableGutter?: boolean;
  /**
   * Styles classes to be attached to the title from the parent component
   */
  titleClasses?: string;
  /**
   * Title variant
   */
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * SubTitle variant
   */
  subtitleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2';
  /**
   * SubTitle color
   */
  subtitleColor?: 'textPrimary' | 'textSecondary' | 'primary' | 'secondary';
  /**
   * Additional properties to pass to the label Typography component
   */
  labelProps?: object;
  /**
   * Additional properties to pass to the title Typography component
   */
  titleProps?: object;
  /**
   * Additional properties to pass to the subtitle Typography component
   */
  subtitleProps?: object;
  // All other props
  [x:string]: any;
}
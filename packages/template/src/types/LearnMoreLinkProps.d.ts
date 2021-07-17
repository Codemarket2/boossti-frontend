interface LearnMoreLinkProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * The component to load as a main DOM
   */
  component?: 'Link' | 'a';
  /**
   * Title of the link
   */
  title: string;
  /**
   * Variant of the link
   */
  variant?: 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2';
  /**
   * Href of the link
   */
  href?: string;
  /**
   * Color of the link
   */
  color?: 'inherit' | 'initial' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error' | undefined;
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
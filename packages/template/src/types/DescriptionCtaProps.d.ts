interface DescriptionCtaProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * Title of the list
   */
  title: string;
  /**
   * Subtitle of the list
   */
  subtitle?: string;
  /**
   * Primary CTA of the list
   */
  primaryCta: JSX.Element;
  /**
   * Secondary CTA of the list
   */
  secondaryCta?: JSX.Element;
  /**
   * Alignment
   */
  align?: 'left' | 'right' | 'center';
  /**
   * Additional properties to pass to the wrapper Grid item components
   */
  wrapperProps?: object;
  /**
   * Additional properties to pass to the title Typography components
   */
  titleProps?: object;
  /**
   * Additional properties to pass to the subtitle Typography components
   */
  subtitleProps?: object;
  /**
   * Additional properties to pass to the button group div container
   */
  buttonGroupProps?: object;
  /**
   * Additional properties to pass to the primary button wrapper div container
   */
  primaryButtonWrapperProps?: object;
  /**
   * Additional properties to pass to the secondary button wrapper div container
   */
  secondaryButtonWrapperProps?: object;
  // All other props
  [x:string]: any;
}
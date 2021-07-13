interface SectionProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * Children to placed inside the section
   */
  children?: JSX.Element;
  /**
   * Should show narrow sections
   */
  narrow?: boolean;
  /**
   * Should the section be full width
   */
  fullWidth?: boolean;
  /**
   * Should the section render with no padding
   */
  disablePadding?: boolean;

  // All other props
  [x:string]: any;
}
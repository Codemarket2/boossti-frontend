interface SectionAlternateProps {
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
  innerNarrowed?: boolean;
  // All other props
  [x:string]: any;
}
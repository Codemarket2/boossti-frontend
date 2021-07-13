interface CountUpNumberProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * The Suffix of the count up number
   */
  suffix?: string;
  /**
   * The Prefix of the count up number
   */
  prefix?: string;
  /**
   * The label text of the count up number
   */
  label: string;
  /**
   * Starting number
   */
  start?: number;
  /**
   * End number
   */
  end: number;
  /**
   * Text color
   */
  textColor?: 'inherit' | 'initial' | 'textPrimary' | 'primary' | 'secondary' | 'textSecondary' | 'error' | undefined;
  /**
   * Label color
   */
  labelColor?: 'inherit' | 'initial' | 'textPrimary' | 'primary' | 'secondary' | 'textSecondary' | 'error' | undefined;
  /**
   * Additional properties to pass to the VisibilitySensor Component
   */
  visibilitySensorProps?: object;
  /**
   * Additional properties to pass to the wrapper div
   */
  wrapperProps?: object;
  /**
   * Additional properties to pass to the count wrapper Typography component
   */
  countWrapperProps?: object;
  /**
   * Additional properties to pass to the CountUp React component
   */
  countNumberProps?: object;
  /**
   * Additional properties to pass to the label Typography component
   */
  labelProps?: object;
  // All other props
  [x:string]: any;
}
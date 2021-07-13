interface CardJobMinimalProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * Job title of the card
   */
  title: string;
  /**
   * Job subtitle of the card
   */
  subtitle: string;
  /**
   * Should show arrow or not
   */
  showArrow?: boolean;
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
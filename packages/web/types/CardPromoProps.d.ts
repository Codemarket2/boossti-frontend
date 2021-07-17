interface CardPromoProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * Promo title to show inside the card
   */
  title: string;
  /**
   * Promo subtitle to show inside the card
   */
  subtitle?: string;
  /**
   * Promo description to show inside the card
   */
  description?: string;
  /**
   * Promo font icon class name to show inside the card
   */
  fontIconClass: string;
  /**
   * Promo icon color to show inside the card
   */
  color: Array<string> | any;
  /**
   * The content alignment
   */
  align?: 'left' | 'right' | 'center';
  /**
   * Title color
   */
  titleColor?: 'inherit' | 'initial' | 'textPrimary' | 'primary' | 'secondary' | 'textSecondary' | 'error' | undefined;
  /**
   * Additional props to pass to the IconAlternate component
   */
  iconAlternateProps?: object;
  /**
   * Additional props to pass to the title Typography component
   */
  titleProps?: object;
  /**
   * Additional props to pass to the subtitle Typography component
   */
  subtitleProps?: object;
  /**
   * Additional props to pass to the desciption Typography component
   */
  descriptionProps?: object;
  // All other props
  [x:string]: any;
}
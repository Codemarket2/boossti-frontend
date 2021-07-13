interface CardPricingStandardProps {
  /**
   *  External classes
   */
  className?: string;
  /**
   * Title of the pricing card
   */
  title: string;
  /**
   *  Subtitle of the pricing card
   */
  subtitle?: string;
  /**
   * The pricing component of the pricing card
   */
  priceComponent: JSX.Element;
  /**
   * The features check component of the pricing card
   */
  featureCheckComponent?: JSX.Element;
  /**
   * Features array of the pricing card
   */
  features?: Array<any>;
  /**
   *  CTA button of the pricing card
   */
  cta: JSX.Element;
  /**
   * Diclaimer of the pricing card
   */
  disclaimer?: string;
  /**
   * Additional props to pass to the title Typography component
   */
  titleProps?: object;
  /**
   * Additional props to pass to the subtitle Typography component
   */
  subtitleProps?: object;
  /**
   * Additional props to pass to the disclaimer Typography component
   */
  disclaimerProps?: object;
  /**
   * Additional props to pass to the feature title Typography component
   */
  featureTitleProps?: object;
  // All other props
  [x:string]: any;
}
interface CardProductProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * External classes for the media
   */
  mediaClassName?: string;
  /**
   * Whether to show custom shadow
   */
  withShadow?: boolean;
  /**
   * Whether to render the card without shadow
   */
  noShadow?: boolean;
  /**
   * Whether to hide the card borders
   */
  noBorder?: boolean;
  /**
   * Whether to show transparent background
   */
  noBg?: boolean;
  /**
   * Whether to lift up on hover
   */
  liftUp?: boolean;
  /**
   * The Card content
   */
  cardContent: any;
  /**
   * The Card Media content
   */
  mediaContent: any;
  /**
   * The content alignment
   */
  align?: 'left' | 'right' | 'center';
  // All other props
  [x:string]: any;
}
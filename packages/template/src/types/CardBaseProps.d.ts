interface CardBaseProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * The children content of the basic card
   */
  children: JSX.Element;
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
   * The content alignment
   */
  align?: 'left' | 'right' | 'center';
  /**
   * Additional props to pass to the CardContent component
   */
  cardContentProps?: object;
  // All other props
  [x:string]: any;
}
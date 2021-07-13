interface CardCategoryProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * Icon to show inside the category card
   */
  icon: JSX.Element;
  /**
   * Category title to show inside the category card
   */
  title: string;
  /**
   * The content alignment
   */
  align?: 'left' | 'right' | 'center';
  // All other props
  [x:string]: any;
}


interface AccoundionItemProps {
  id: number | string;
  title: string;
  subtitle: string;
  text: string;
  link: string;
}

interface AccordionProps {
  /**
   * Classname from the parent component
   */
  className?: string;
  /**
   * Items to show inside the accordion
   */
  items: Array<AccoundionItemProps>;
  /**
   * Additional properties to pass to the title Typography component
   */
  titleProps?: object;
  /**
   * Additional properties to pass to the subtitle Typography component
   */
  subtitleProps?: object;
  /**
   * Additional properties to pass to the text Typography component
   */
  textProps?: object;
  /**
   * Additional properties to pass to the link component
   */
  linkProps?: object;
  // All other props
  [x:string]: any;
}
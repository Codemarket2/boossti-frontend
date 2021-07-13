interface TypedTextProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * react-typed properties. For more info visit https://www.npmjs.com/package/react-typed
   */
  typedProps: object;
  // All other props
  [x:string]: any;
}

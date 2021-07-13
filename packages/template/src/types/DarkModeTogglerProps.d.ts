interface DarkModeTogglerProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * The theme mode
   */
  themeMode?: string;
  /**
   * Theme toggler function
   */
  onClick: (event: React.MouseEvent) => void;
  /**
   * Color of the icon
   */
  fontIconColor?: string;
  // All other props
  [x:string]: any;
};
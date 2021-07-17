interface MarkerProps {
  location: {
    x: number,
    y: number,
    address?: string,
  },
}

interface MapProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * Map zoom
   */
  zoom?: number;
  /**
   * Map center
   */
  center: Array<number>;
  /**
   * data of the locations. Example: [{ location: { x: number, y: number } }]
   */
  pins: Array<MarkerProps>;
  // All other props
  [x:string]: any;
}
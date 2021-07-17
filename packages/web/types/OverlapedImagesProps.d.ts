interface OverlapedImagesProps {
 /**
  * External classes
  */
 className?: string;
 /**
  * Image item - Object of src, srcset and alt properties
  */
 image1: ImageProps;
 /**
  * Image item - Object of src, srcset and alt properties
  */
 image2: ImageProps;
 /**
  * Image item - Object of src, srcset and alt properties
  */
 image3: ImageProps;
 // All other props
 [x:string]: any;
}
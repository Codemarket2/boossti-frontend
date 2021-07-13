interface CardJobProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * Badge color of the job card
   */
  badgeColor: string;
  /**
   * Badge title of the job card
   */
  badgeTitle: string;
  /**
   * Job title of the card
   */
  jobTitle: string;
  /**
   * Job location of the card
   */
  jobLocation: string;
  /**
   * Job type of the card
   */
  jobType: string;
  /**
   * Job location of the card
   */
  jobDate: string;
  /**
   * Company logo of the card
   */
  companyLogo: string;
  /**
   * Company name of the card
   */
  companyName: string;
  // All other props
  [x:string]: any;
}
interface CardJobCompanyProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * Job title of the card
   */
  jobTitle: string;
  /**
   * Job location of the card
   */
  jobLocation: string;
  /**
   * Company logo of the card
   */
  companyLogo: string;
  /**
   * Company name of the card
   */
  companyName: string;
  /**
   * Count of the jobs in the the card
   */
  jobsCount: string;
  /**
   * Company info in the card
   */
  companyInfo: string;
  // All other props
  [x:string]: any;
}
interface CardJobTagProps {
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
  // All other props
  [x:string]: any;
}
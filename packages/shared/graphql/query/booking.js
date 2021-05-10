import { gql } from '@apollo/client';

export const Check_Booking_Availability = gql`
  query CheckBookingAvailability($listingId: String!, $start: AWSDateTime!, $end: AWSDateTime!) {
    checkBookingAvailability(listingId: $listingId, start: $start, end: $end)
  }
`;

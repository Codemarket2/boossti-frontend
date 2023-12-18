import { gql } from '@apollo/client';

export const GET_ALL = gql`
  query GetOwnerListingsSearch(
    $search: String
    $limit: Int
    $page: Int
    $username: String
    $active: Boolean
  ) {
    getAllListingsSearch(
      search: $search
      limit: $limit
      page: $page
      username: $username
      active: $active
    ) {
      count
      listings {
        _id
        bookingCount {
          total
        }
        bookings
        createdAt
        location {
          coordinates
          type
        }
        locationDetails {
          address
          city
          country
          code
          features
          listingType
          marker {
            coordinates
            type
          }
          parkingEntranceImages
          parkingSpaceImages
          phone
          postalCode
          propertyName
          propertyType
          state
          streetViewImages
          unitNum
        }
        ownerId
        ownerEmail
        ownerName
        pricingDetails {
          pricingRates {
            perDayRate
            perHourRate
            perMonthRate
            perWeekRate
          }
          pricingType
        }
        published
        ratingAverage
        ratingQuantity
        spaceAvailable {
          advanceBookingTime {
            unit
            value
          }
          customTimeRange {
            startDate
            endDate
          }
          friday {
            endHour
            endMinute
            isActive
            startHour
            startMinute
          }
          hasNoticeTime
          instantBooking
          maxTime {
            unit
            value
          }
          minTime {
            unit
            value
          }
          monday {
            endHour
            endMinute
            isActive
            startHour
            startMinute
          }
          noticeTime {
            unit
            value
          }
          saturday {
            endHour
            endMinute
            isActive
            startHour
            startMinute
          }
          scheduleType
          sunday {
            endHour
            endMinute
            isActive
            startHour
            startMinute
          }
          thursday {
            endHour
            endMinute
            isActive
            startHour
            startMinute
          }
          tuesday {
            endHour
            endMinute
            isActive
            startHour
            startMinute
          }
          wednesday {
            endHour
            endMinute
            isActive
            startHour
            startMinute
          }
        }
        spaceDetails {
          aboutSpace
          accessInstructions
          compact
          compactSpaces
          height1 {
            unit
            value
          }
          height2 {
            unit
            value
          }
          heightRestriction
          isLabelled
          large
          largeSpaces
          largestSize
          midsized
          midsizedSpaces
          motorcycle
          motorcycleSpaces
          oversized
          oversizedSpaces
          parkingSpaceType
          qtyOfSpaces
          sameSizeSpaces
          spaceLabels {
            isBooked
            label
            largestSize
          }
        }
        thumbnail
        staff {
          _id
          role
          staffId
          user
        }
      }
    }
  }
`;

export const GET_ONE = gql`
  query GetListing($id: ID!) {
    getListing(id: $id) {
      _id
      bookingCount {
        total
      }
      bookings
      createdAt
      location {
        coordinates
        type
      }
      locationDetails {
        address
        city
        country
        code
        features
        listingType
        marker {
          coordinates
          type
        }
        parkingEntranceImages
        parkingSpaceImages
        phone
        postalCode
        propertyName
        propertyType
        state
        streetViewImages
        unitNum
      }
      ownerId
      ownerEmail
      ownerName
      pricingDetails {
        pricingRates {
          perDayRate
          perHourRate
          perMonthRate
          perWeekRate
        }
        pricingType
      }
      published
      ratingAverage
      ratingQuantity
      spaceAvailable {
        advanceBookingTime {
          unit
          value
        }
        customTimeRange {
          startDate
          endDate
        }
        friday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        hasNoticeTime
        instantBooking
        maxTime {
          unit
          value
        }
        minTime {
          unit
          value
        }
        monday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        noticeTime {
          unit
          value
        }
        saturday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        scheduleType
        sunday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        thursday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        tuesday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        wednesday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
      }
      spaceDetails {
        aboutSpace
        accessInstructions
        compact
        compactSpaces
        height1 {
          unit
          value
        }
        height2 {
          unit
          value
        }
        heightRestriction
        isLabelled
        large
        largeSpaces
        largestSize
        midsized
        midsizedSpaces
        motorcycle
        motorcycleSpaces
        oversized
        oversizedSpaces
        parkingSpaceType
        qtyOfSpaces
        sameSizeSpaces
        spaceLabels {
          isBooked
          label
          largestSize
        }
      }
      thumbnail
      ratingAverage
      ratingQuantity
    }
  }
`;

export const GET_PUBLISHED_LISTINGS_WITH_LATLNG = gql`
  query GetListingsWithBookings(
    $lat: Float!
    $lng: Float!
    $start: AWSDateTime!
    $end: AWSDateTime!
    $startDay: Int!
    $startHour: Int!
    $startMinute: Int!
    $endDay: Int!
    $endHour: Int!
    $endMinute: Int!
  ) {
    getListingsWithBookings(
      lat: $lat
      lng: $lng
      start: $start
      end: $end
      startDay: $startDay
      startHour: $startHour
      startMinute: $startMinute
      endDay: $endDay
      endHour: $endHour
      endMinute: $endMinute
    ) {
      _id
      bookingCount {
        total
      }
      bookings
      createdAt
      location {
        coordinates
        type
      }
      locationDetails {
        address
        city
        country
        code
        features
        listingType
        marker {
          coordinates
          type
        }
        parkingEntranceImages
        parkingSpaceImages
        phone
        postalCode
        propertyName
        propertyType
        state
        streetViewImages
        unitNum
      }
      ownerId
      ownerEmail
      ownerName
      pricingDetails {
        pricingRates {
          perDayRate
          perHourRate
          perMonthRate
          perWeekRate
        }
        pricingType
      }
      published
      ratingAverage
      ratingQuantity
      spaceAvailable {
        advanceBookingTime {
          unit
          value
        }
        customTimeRange {
          startDate
          endDate
        }
        friday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        hasNoticeTime
        instantBooking
        maxTime {
          unit
          value
        }
        minTime {
          unit
          value
        }
        monday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        noticeTime {
          unit
          value
        }
        saturday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        scheduleType
        sunday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        thursday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        tuesday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        wednesday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
      }
      spaceDetails {
        aboutSpace
        accessInstructions
        compact
        compactSpaces
        height1 {
          unit
          value
        }
        height2 {
          unit
          value
        }
        heightRestriction
        isLabelled
        large
        largeSpaces
        largestSize
        midsized
        midsizedSpaces
        motorcycle
        motorcycleSpaces
        oversized
        oversizedSpaces
        parkingSpaceType
        qtyOfSpaces
        sameSizeSpaces
        spaceLabels {
          isBooked
          label
          largestSize
        }
      }
      thumbnail
      ratingAverage
      ratingQuantity
    }
  }
`;

export const sampleString = 'sampleString';

// import * as React from 'react';
// import { render, cleanup } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import UserCard from '../UserCard';

// // afterEach(cleanup);

// const props = {
//   user: {
//     name: 'vivekvt',
//     username: 'vivekvt',
//     picture:
//       'https://parkyourself-content-bucket15051-dev.s3.amazonaws.com/public/assets/images/default.jpg',
//     listings: 1,
//     bookings: 2,
//     active: true,
//     createdAt: new Date(),
//   },
//   handleToggle: () => {},
//   showTime: false,
// };

// test('User Card Test', () => {
//   const { getByRole, getByTestId } = render(<UserCard {...props} />);
//   expect(getByTestId('user-name')).toHaveTextContent(props.user.name);
//   expect(getByTestId('user-listings-count')).toHaveTextContent(props.user.listings.toString());
//   expect(getByTestId('user-bookings-count')).toHaveTextContent(props.user.bookings.toString());
//   expect(getByRole('img')).toHaveAttribute('src', props.user.picture);
//   expect(getByRole('img')).toHaveAttribute('alt', props.user.name);
//   expect(getByTestId('user-block-button')).toHaveTextContent(
//     props.user.active ? 'Block' : 'Unblock',
//   );
// });

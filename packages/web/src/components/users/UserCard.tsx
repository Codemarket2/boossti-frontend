// import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Spinner } from 'react-bootstrap';
import { FiStar } from 'react-icons/fi';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

import { IUser } from '@frontend/shared/types/user';

const moment = extendMoment(Moment);

export interface IProps {
  handleToggle: (n: number, status: string) => void;
  user: IUser;
  showTime: boolean;
}

export default function UserCard({ user, handleToggle, showTime }: IProps) {
  const [disabled, setDisabled] = useState(false);
  const handleToggle2 = async (username, status) => {
    setDisabled(true);
    await handleToggle(username, status);
    setDisabled(false);
  };

  const start = new Date(user.createdAt);
  const end = new Date();
  const range = moment.range(start, end);
  const monthDiff = range.diff('months');
  const dayDiff = range.diff('days');
  const hourDiff = range.diff('hours');
  return (
    <Card>
      <FlexWrapper>
        <PictureWrapper>
          <Image
            alt={user.name}
            src={
              user.picture
                ? user.picture
                : 'https://parkyourself-content-bucket15051-dev.s3.amazonaws.com/public/assets/images/default.jpg'
            }
          />
        </PictureWrapper>
        <div>
          {/* <Link href={`/admin/users/${user.username}`}>
            <a className="text"> */}
          <b data-testid="user-name">{user.name}</b>
          {/*   </a>
         </Link> */}
          <br />
          <span>
            Bookings - <span data-testid="user-bookings-count">{user.bookings}</span>
          </span>
          <br />
          <span>
            Spaces - <span data-testid="user-listings-count">{user.listings}</span>
          </span>
          <br />
        </div>
      </FlexWrapper>
      <div className="d-flex justify-content-center justify-content-justify-content-md-end">
        {showTime ? (
          <div className="d-flex justify-content-center justify-content-justify-content-md-end">
            {monthDiff <= 0 ? (dayDiff <= 0 ? hourDiff : dayDiff) : monthDiff}
            {monthDiff <= 0 ? (dayDiff <= 0 ? ' hour ago' : ' day ago') : ' month ago'}
          </div>
        ) : (
          <div className="text-right">
            <p className="m-0 mb-1">
              <FiStar size={18} className="mt-n1 mr-1 text-warning" />
              4.7 (17)
            </p>
            <Button
              data-testid="user-block-button"
              size="sm"
              variant={user.active ? 'dark' : 'warning'}
              onClick={() => handleToggle2(user.username, !user.active)}>
              {disabled ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : user.active ? (
                'Block'
              ) : (
                'Unblock'
              )}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

const Card = styled.div`
  border: ${(props) => `1px solid grey`};
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PictureWrapper = styled.div`
  width: 70px;
  margin-right: 10px;
`;

const FlexWrapper = styled.div`
  display: flex;
`;

const Image = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
}))`
  border-radius: 50px;
  overflow: hidden;
  width: 70px;
`;

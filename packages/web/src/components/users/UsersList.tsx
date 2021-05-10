import React, { useEffect } from 'react';
import { useGetAllUser } from '@frontend/shared/hooks/users';
import { Button, Form } from 'react-bootstrap';
import Loading from '../common/Loading';
import UserCard from './UserCard';

interface IProps {
  setUserCount?: (n: number) => void;
  driver?: boolean;
  spaceOwner?: boolean;
  showTime?: boolean;
  lowerRange?: Date;
  higherRange?: Date;
  active?: boolean;
}

function UsersList({
  setUserCount,
  driver,
  spaceOwner,
  showTime,
  lowerRange,
  higherRange,
  active,
}: IProps): JSX.Element {
  const { filter, setFilter, allData, loading, toggleUser } = useGetAllUser({
    driver: driver ? true : false,
    spaceOwner: spaceOwner ? true : false,
    lowerRange: lowerRange ? lowerRange : null,
    higherRange: higherRange ? higherRange : null,
    active: active == true || active == false ? active : null,
  });

  useEffect(() => {
    if (setUserCount) {
      setUserCount(allData.count);
    }
  }, [allData.count]);

  return (
    <div className="mt-2">
      <div className="mb-2">
        <Form.Control
          type="email"
          placeholder="Search"
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        />
      </div>
      {allData.users.map((u) => (
        <UserCard user={u} handleToggle={toggleUser} showTime={showTime} />
      ))}
      {loading ? (
        <Loading />
      ) : (
        allData.count > filter.limit * filter.page && (
          <div className="text-center pt-3">
            <Button size="sm" onClick={() => setFilter({ ...filter, page: filter.page + 1 })}>
              Load More
            </Button>
          </div>
        )
      )}
    </div>
  );
}

export default UsersList;

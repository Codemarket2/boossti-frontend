import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Tabs, Tab, Dropdown, Modal } from 'react-bootstrap';
import dateFilterConfig from '@frontend/shared/config/dateFilter';
import { FiMenu, FiX } from 'react-icons/fi';
import { DateRange } from 'react-date-range';
import moment from 'moment';
import UsersList from './UsersList';

function UsersTabs(props) {
  const [key, setKey] = useState('today');

  const [userCount, setUserCount] = useState({
    custom: 0,
    today: 0,
    lastWeek: 0,
    lastMonth: 0,
  });

  const [customCount, setCustomCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [lastWeekCount, setLastWeekCount] = useState(0);
  const [lastMonthCount, setLastMonthCount] = useState(0);

  const [state, setState] = useState([
    {
      startDate: new Date(dateFilterConfig.oneWeekBack),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [dateFilter, setDateFilter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [verify, setVerify] = useState(false);

  const filterStartDate = state[0].startDate.toString();
  const filterEndDate = state[0].endDate.toString();

  const [filter, setFilter] = useState({
    active: false,
    block: false,
    limit: 10,
    page: 1,
    search: '',
  });

  return (
    <div className="admin-users pb-4">
      <div className="d-flex justify-content-between">
        <h1 className="heading">Users</h1>
        <Dropdown drop="left">
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            <FiMenu size={25} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <span onClick={() => setShowModal(true)}>Date Range</span>
              {dateFilter && (
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setDateFilter(false);
                    setKey('today');
                  }}>
                  <FiX size={25} className="ml-2" />
                </span>
              )}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="mb-2">
        <Form.Control
          type="email"
          placeholder="Search"
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        />
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Date Range</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setState([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={state}
            />
          </div>
          {verify && (!filterStartDate || !filterEndDate) && (
            <p className="text-center text-danger">Please select start and end Date range</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (!filterStartDate || !filterEndDate) {
                return setVerify(true);
              } else {
                setKey('custom');
                setDateFilter(true);
                setShowModal(false);
              }
            }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {dateFilter ? (
        <Tabs
          defaultActiveKey="today"
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}>
          <Tab
            eventKey="custom"
            title={`${moment(filterStartDate).format('LL')} - ${moment(filterEndDate).format(
              'LL',
            )} (${customCount})`}>
            <UsersList
              showTime={true}
              higherRange={filterEndDate}
              lowerRange={filterStartDate}
              setUserCount={(count) => setCustomCount(count)}
              custom={true}
              // setUserCount={(count) => setUserCount({ ...userCount, lastWeek: count })}
            />
          </Tab>
        </Tabs>
      ) : (
        <Tabs
          defaultActiveKey="today"
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}>
          <Tab eventKey="today" title={`Today (${todayCount})`}>
            <UsersList
              showTime={true}
              higherRange={new Date()}
              lowerRange={dateFilterConfig.oneDayBack}
              setUserCount={(count) => setTodayCount(count)}
              // setUserCount={(count) => setUserCount({ ...userCount, today: count })}
            />
          </Tab>
          <Tab eventKey="lastWeek" title={`Last Week (${lastWeekCount})`}>
            <UsersList
              showTime={true}
              higherRange={new Date()}
              lowerRange={dateFilterConfig.oneWeekBack}
              setUserCount={(count) => setLastWeekCount(count)}
              // setUserCount={(count) => setUserCount({ ...userCount, lastWeek: count })}
            />
          </Tab>
          <Tab eventKey="lastMonth" title={`Last Month (${lastMonthCount})`}>
            <UsersList
              showTime={true}
              higherRange={new Date()}
              lowerRange={dateFilterConfig.oneMonthBack}
              setUserCount={(count) => setLastMonthCount(count)}
              // setUserCount={(count) => setUserCount({ ...userCount, lastMonth: count })}
            />
          </Tab>
        </Tabs>
      )}
    </div>
  );
}

export default connect()(UsersTabs);

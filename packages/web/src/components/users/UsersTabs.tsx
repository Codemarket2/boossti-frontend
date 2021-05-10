import React, { useState } from 'react';
import { Form, Tabs, Tab, Dropdown } from 'react-bootstrap';
import { FiMenu } from 'react-icons/fi';
import UsersList from './UsersList';

export default function UsersTabs() {
  const [filter, setFilter] = useState({
    active: false,
    block: false,
    limit: 10,
    page: 1,
    search: '',
  });

  const handleFilterChange = (status) => {
    if (status === 'active') {
      setFilter({ ...filter, active: !filter.active });
    } else {
      setFilter({ ...filter, block: !filter.block });
    }
  };

  let activeStatus = null;
  if (filter.active && !filter.block) {
    activeStatus = true;
  } else if (!filter.active && filter.block) {
    activeStatus = false;
  } else {
    activeStatus = null;
  }

  return (
    <div className="admin-users pb-4">
      <div className="d-flex justify-content-between">
        <h1 className="heading">Users</h1>
        <Dropdown drop="left">
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            <FiMenu size={25} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">
              <Form.Check
                type="checkbox"
                checked={filter.active}
                label="Active"
                onChange={() => handleFilterChange('active')}
              />
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">
              <Form.Check
                type="checkbox"
                checked={filter.block}
                label="Block"
                onChange={() => handleFilterChange('block')}
              />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
        <Tab eventKey="all" title="All">
          <UsersList active={activeStatus} />
        </Tab>
        <Tab eventKey="drivers" title="Drivers">
          <UsersList active={activeStatus} driver={true} />
        </Tab>
        <Tab eventKey="spaceOwners" title="Space Owners">
          <UsersList active={activeStatus} spaceOwner={true} />
        </Tab>
      </Tabs>
    </div>
  );
}

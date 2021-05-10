/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import {
  IoMenu,
  IoChatboxOutline,
  IoSearch,
  IoExitOutline,
  IoPersonCircleOutline,
} from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import MaterialCommunityIcons from '@mdi/react';
import { mdiAccountSettings } from '@mdi/js';
import colors from '@frontend/shared/config/colors';
// import { QrCodeScannerIcon, ListingIcon } from '../../assets/icons/CustomIcons';
// import logo from '../../assets/images/logo2.png';

const NavSidebar = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { asPath } = useRouter();

  return (
    <>
      {props.auth.authenticated ? (
        <div>
          <div
            onClick={() => setIsSidebarOpen(false)}
            className={`sidebar_wrapper ${isSidebarOpen ? 'sidebar_block' : 'sidebar_hidden'}`}
          />
          <div>
            {!isSidebarOpen && (
              <button className="btn-menu" onClick={() => setIsSidebarOpen(true)} type="button">
                <IoMenu className="menu_icon" style={{ color: colors.secondary }} />
              </button>
            )}
          </div>
          <div
            className={`sidebar_component s_ease_out lg:translate-x-0 lg:static lg:inset-0 ${
              isSidebarOpen ? 's_translate_x_0' : 's_translate_x_full'
            }`}>
            <div className="sidebar_wrapper_inner">
              <div className="sidebar_logo_wrapper">
                <Link href="/dashboard">
                  <img src={logo} alt="parkyourself" className="sidebar_logo" />
                </Link>
              </div>
              <div className="sidebar_logo_wrapper_bottom">
                <div>
                  <Link href="/dashboard">
                    <div className="link_wrapper">
                      <IoPersonCircleOutline
                        className={asPath.includes('dashboard') ? 'link_icon_active' : 'link_icon'}
                      />
                      <div
                        className={asPath.includes('dashboard') ? 'link_text_active' : 'link_text'}>
                        Profile
                      </div>
                    </div>
                  </Link>
                </div>
                {props.admin && (
                  <div>
                    <Link href="/admin/users">
                      <div className="link_wrapper">
                        <MaterialCommunityIcons
                          path={mdiAccountSettings}
                          className={
                            asPath.includes('admin') && asPath.includes('users')
                              ? 'link_icon_active'
                              : 'link_icon'
                          }
                        />
                        <div
                          className={
                            asPath.includes('admin') && asPath.includes('users')
                              ? 'link_text_active'
                              : 'link_text'
                          }>
                          Admin
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
                <div>
                  <Link href="/parkings">
                    <div className="link_wrapper">
                      <IoSearch
                        className={
                          asPath.includes('parkings') && !asPath.includes('orders')
                            ? 'link_icon_active'
                            : 'link_icon'
                        }
                      />
                      <div
                        className={
                          asPath.includes('parkings') && !asPath.includes('orders')
                            ? 'link_text_active'
                            : 'link_text'
                        }>
                        Find Parking
                      </div>
                    </div>
                  </Link>
                </div>
                <div>
                  {props.isSpaceOwner ? (
                    <Link href="/parkings/orders">
                      <div className="link_wrapper">
                        <div
                          className={
                            asPath.includes('parkings') && asPath.includes('orders')
                              ? 'link_icon_1_active'
                              : 'link_icon_1'
                          }>
                          {/* <QrCodeScannerIcon /> */}QR
                        </div>
                        <div
                          className={
                            asPath.includes('parkings') && asPath.includes('orders')
                              ? 'link_text_active'
                              : 'link_text'
                          }>
                          Parking Orders
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <Link href="/bookings/my">
                      <div className="link_wrapper">
                        <div
                          className={
                            asPath.includes('bookings') && asPath.includes('my')
                              ? 'link_icon_1_active'
                              : 'link_icon_1'
                          }>
                          {/* <QrCodeScannerIcon /> */}QR
                        </div>
                        <div
                          className={
                            asPath.includes('bookings') && asPath.includes('my')
                              ? 'link_text_active'
                              : 'link_text'
                          }>
                          My Bookings
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
                {props.isSpaceOwner && (
                  <div>
                    <Link href="/listings/my">
                      <div className="link_wrapper">
                        <div
                          className={
                            asPath.includes('listings') && asPath.includes('my')
                              ? 'link_icon_active'
                              : 'link_icon'
                          }>
                          {/* <ListingIcon /> */}QR
                        </div>
                        <div
                          className={
                            asPath.includes('listings') && asPath.includes('my')
                              ? 'link_text_active'
                              : 'link_text'
                          }>
                          My Listings
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
                <div>
                  <Link href="/inbox">
                    <div className="link_wrapper">
                      <IoChatboxOutline
                        className={asPath.includes('inbox') ? 'link_icon_active' : 'link_icon'}
                      />
                      <div className={asPath.includes('inbox') ? 'link_text_active' : 'link_text'}>
                        Inbox
                      </div>
                    </div>
                  </Link>
                </div>
                <div>
                  <div className="link_wrapper" onClick={() => props.handleLogout()}>
                    <IoExitOutline className="link_icon" />
                    <div className="link_text">Logout</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        props.initial && (
          <Link href="/">
            <Button variant="outline-dark">Login</Button>
          </Link>
        )
      )}
    </>
  );
};

export default NavSidebar;

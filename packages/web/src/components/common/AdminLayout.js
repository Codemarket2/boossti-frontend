import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Menu, X } from 'react-feather';
import logo from '../../assets/images/logo2.png';
import AuthRequired from './AuthRequired';

const AdminLayout = (props) => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState({ settings: false });
  const [menuWidth, setMenuWidth] = useState('0px');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (router.pathname.includes('/admin/settings')) {
      setActiveMenu({ settings: true });
    }
  }, []);

  return (
    <AuthRequired redirectPath="/" mustAdmin={true}>
      <div className="admin-layout">
        <Head>
          <title>Parkyourself Admin</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ul className={showMenu ? 'admin-menu-ul' : ' '}>
          <li>
            <Link href="/dashboard">
              <img src={logo} alt="logo image" className="img-fluid cursor-pointer" />
            </Link>
          </li>
          <li>
            <Link href="/admin/users">
              <a className={router.pathname === '/admin/users' ? 'active' : ' '}>Users</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/bookings">
              <a className={router.pathname === '/admin/bookings' ? 'active' : ' '}>Bookings</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/parkings">
              <a className={router.pathname === '/admin/parkings' ? 'active' : ' '}>
                Parking Inventory
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/registration-stats">
              <a className={router.pathname === '/admin/registration-stats' ? 'active' : ' '}>
                Registration Stats
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/cashouts">
              <a className={router.pathname === '/admin/cashouts' ? 'active' : ' '}>Cashouts</a>
            </Link>
          </li>
          <li>
            <a
              className={router.pathname.includes('/admin/settings') ? 'active' : ' '}
              onClick={() => setActiveMenu({ settings: !activeMenu.settings })}>
              Settings
            </a>
            {activeMenu.settings && (
              <ul className="sidebar-sub-menu">
                <li>
                  <Link href="/admin/settings/listing-type">
                    <a
                      className={
                        router.pathname === '/admin/settings/listing-type' ? 'active2' : ' '
                      }>
                      Listing Type
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/settings/property-type">
                    <a
                      className={
                        router.pathname === '/admin/settings/property-type' ? 'active2' : ' '
                      }>
                      Property Type
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/settings/application-fee">
                    <a
                      className={
                        router.pathname === '/admin/settings/application-fee' ? 'active2' : ' '
                      }>
                      Application Fee
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/settings/term-condition">
                    <a
                      className={
                        router.pathname === '/admin/settings/term-condition' ? 'active2' : ' '
                      }>
                      Terms & Conditions
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/settings/privacy-policy">
                    <a
                      className={
                        router.pathname === '/admin/settings/privacy-policy' ? 'active2' : ' '
                      }>
                      Privacy Policy
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/settings/faq">
                    <a className={router.pathname === '/admin/settings/faq' ? 'active2' : ' '}>
                      FAQ
                    </a>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
        <div className="admin-div pt-3 pb-3">
          <div className="admin-menu-toggle">
            <div className="d-flex justify-content-between align-items-center">
              <Link href="/dashboard">
                <img src={logo} alt="logo image" className="img-fluid cursor-pointer" />
              </Link>
              {showMenu ? (
                <X onClick={() => setShowMenu(false)} size={30} className="cursor-pointer" />
              ) : (
                <Menu onClick={() => setShowMenu(true)} size={30} className="cursor-pointer" />
              )}
            </div>
          </div>
          {props.children}
        </div>
      </div>
    </AuthRequired>
  );
};

export default AdminLayout;

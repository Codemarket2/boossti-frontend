import { useState } from 'react';

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div className="container">
      <div className="d-flex justify-content-center py-3">
        <img
          style={{ width: 150 }}
          alt="logo"
          src="https://katelesterinteriors.com/wp-content/uploads/2019/10/KL_interiors.svg"
        />
      </div>
      <div
        style={{ border: '1px solid #bdbdbc', borderRight: 'none', borderLeft: 'none' }}
        className="py-2 d-block d-lg-none">
        <div
          className="d-flex justify-content-center  align-items-center font-weight-bold"
          onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <span className="ml-1">Menu</span>
        </div>
      </div>
      <div
        style={{ border: '1px solid #bdbdbc', borderRight: 'none', borderLeft: 'none' }}
        className={`p-2 ${showMobileMenu ? 'd-block' : 'd-none d-lg-block'}`}>
        <ul style={{ listStyleType: 'none' }} className="d-flex justify-content-between m-0">
          <li>
            <a className="text-dark" href="#">
              HOME
            </a>
          </li>
          <li>
            <a className="text-dark" href="#">
              ABOUT
            </a>
          </li>
          <li>
            <a className="text-dark" href="#">
              PROCESS
            </a>
          </li>
          <li>
            <a className="text-dark" href="#">
              COMPLETED PROJECTS
            </a>
          </li>
          <li>
            <a className="text-dark" href="#">
              CONTACT
            </a>
          </li>
          <li>
            <a className="text-dark" href="#">
              BLOG
            </a>
          </li>
          <li>
            <a className="text-dark" href="#">
              katelesterHOME
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

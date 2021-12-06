import React from 'react';
import Link from 'next/link';

interface IProps {
  backUrl?: string;
}

const NotFound = ({ backUrl = '/' }: IProps) => (
  <div className="container mt-5 pt-5">
    <div className="row">
      <div className="col-lg-6 col-md-9 m-auto text-center">
        <div className="errorContentCentered d-flex align-items-center justfy-content-center">
          <div className="errorPageContentWrap">
            <h2>404</h2>
            <h3>PAGE NOT FOUND</h3>
            <p>
              Sorry but the page you are looking for does not exist, have been removed, name changed
              or is temporarily unavailable.
            </p>
            <Link href={backUrl}>Back To Homepage</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;

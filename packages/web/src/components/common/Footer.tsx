export default function Footer() {
  return (
    <div className="container">
      <div
        className="py-1"
        style={{ border: '1px solid #bdbdbc', borderRight: 'none', borderLeft: 'none' }}
      >
        <div className="d-flex justify-content-center align-items-center align-content-center">
          <h3 style={{ fontSize: '15px' }} className="m-0">
            Follow Us On:
          </h3>
          <ul style={{ listStyleType: 'none' }} className="d-flex pl-2 m-0 p-0">
            <li>
              <a className="text-dark mx-2" href="https://www.facebook.com/">
                <i style={{ fontSize: '20px' }} className="icon ion-social-facebook" />
              </a>
            </li>
            <li>
              <a className="text-dark mx-2" href="https://www.pinterest.com/">
                <i style={{ fontSize: '20px' }} className="icon ion-social-pinterest" />
              </a>
            </li>
            <li>
              <a className="text-dark mx-2" href="https://www.instagram.com/">
                <i style={{ fontSize: '20px' }} className="icon ion-social-instagram" />
              </a>
            </li>
            <li>
              <a className="text-dark mx-2" href="https://twitter.com/">
                <i style={{ fontSize: '20px' }} className="icon ion-social-twitter" />
              </a>
            </li>
            <li>
              <img
                alt="footer-img"
                className="m-0 p-0"
                width="14px"
                src="https://katelesterinteriors.com/wp-content/uploads/2020/11/houzz-logo.png"
              />
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center mt-2">
        KATE LESTER INTERIORS • 837 PACIFIC COAST HIGHWAY • HERMOSA BEACH, CA 90254 • T:
        310.372.0504 • INFO@KATELESTERINTERIORS.COM <br /> © 2011-2019 Kate Lester Interiors | All
        Rights Reserved
      </p>
    </div>
  );
}

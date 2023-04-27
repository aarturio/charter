import { Fragment, useState } from "react";
const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  let cssNav = "menu-icon";
  if (showNavbar) {
    cssNav = "menu-icon checked";
  }

  return (
    <Fragment>
      {/* start of navbar */}
      <div className="navbar">
        {/* sidebar */}
        <div className="sidebar">
          <div className={cssNav}>
            <div className="line line-1"></div>
            <div className="line line-2"></div>
            <div className="line line-3"></div>
          </div>

          <ul className="social-icons-list">
            <li>
              <a
                href="https://www.linkedin.com/in/akopovny/"
                className="social-link"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="https://github.com/aarturio" className="social-link">
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
          </ul>
          <div className="year">2023</div>
        </div>
        {/* end of sidebar */}
        {/* navigation */}
        <nav className="navigation">
          <div className="navigation-header">
            <h1 className="navigation-heading">Grand Hotel</h1>
            <form className="navigation-search">
              <input
                type="text"
                className="navigation-search-input"
                placeholder="Search"
              />
              <button className="navigation-search-btn">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
          <ul className="navigation-list">
            <li className="navigation-item">
              <a href="#" className="navigation-link">
                Pie chart
              </a>
            </li>
            <li className="navigation-item">
              <a href="#" className="navigation-link">
                Change log
              </a>
            </li>
          </ul>
          <div className="copyright">
            <p>&copy; 2023. Grand Hotel. All rights reserved.</p>
          </div>
        </nav>
        {/* end of navigation */}
      </div>
      {/* end of navbar */}
    </Fragment>
  );
};

export default Navbar;

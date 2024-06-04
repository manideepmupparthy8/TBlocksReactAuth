import { Link, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

export default function Layout({ isLoggedIn, onLogout }) {
  const renderNavLinks = useCallback(() => {
    if (isLoggedIn) {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={onLogout}>Logout</button>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
        </ul>
      );
    }
  }, [isLoggedIn, onLogout]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {renderNavLinks()}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

Layout.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

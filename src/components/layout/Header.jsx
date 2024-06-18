
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import React, { useContext } from "react";

const Header = () => {

  const navigate = useNavigate();

  const handleLogout = ()=>{
    sessionStorage.removeItem('token'); 
    navigate('/login');
  }

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        {/* <div className="navbar-brand">
        <FilterListIcon />
        </div> */}
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {/* <a href="/cart" style={{ textDecoration: "none" }}>
          <span id="cart" className="ms-3">
            {" "}
            Cart{" "}
          </span>
        </a> */}

        <div className="ms-4 dropdown">
          <button
            className="btn dropdown-toggle text-white"
            type="button"
            id="dropDownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <figure className="avatar avatar-nav">
              <img
                src="../../../default_avatar.jpg"
                alt="User Avatar"
                className="rounded-circle"
              />
            </figure>
            <span>{sessionStorage.getItem('username')}</span>
          </button>
          <div
            className="dropdown-menu w-100"
            aria-labelledby="dropDownMenuButton"
          >

            <a className="dropdown-item" href="/profile">
              {" "}
              Profile{" "}
            </a>

            <a className="dropdown-item text-danger" textalign='left' onClick={handleLogout}>
              {" "}
              Logout{" "}
            </a>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Header;
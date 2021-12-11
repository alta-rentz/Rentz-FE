import './navbar.scss';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { ImLocation } from 'react-icons/im'
import { Dropdown, Button } from 'react-bootstrap';
// import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const goRegister = () => {
    navigate('/Register')
  };

  return (
    <>
      <div className="c-navbar">
        <div className="page-navbar">
          <div className="logo">Rentz.ID</div>
          <div className="search-navbar">
            <input type="text" placeholder="Rent camera, book ..."/>
            <Button className="btn-search">< FaSearch /></Button>
            <Dropdown>
            <Dropdown.Toggle className="dropdown-navbar" id="dropdown-basic">
              <ImLocation style={{ color : "#FF8C00" }}/> Location
            </Dropdown.Toggle>

            <Dropdown.Menu  align="end">
              <Dropdown.Item href="#/action-1">Medan</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Padang</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Jakarta</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        <div className="user-icon">
        <Dropdown className= "dropdown-none">
            <Dropdown.Toggle className="dropdown-user" id="dropdown-basic">
            <FaUserCircle size="35px"/>
            </Dropdown.Toggle>

            <Dropdown.Menu  align="end">
              <Dropdown.Item href="#/action-1">Login</Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={goRegister}>Register</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar;
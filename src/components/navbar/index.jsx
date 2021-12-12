import './navbar.scss';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { ImLocation } from 'react-icons/im'
import { Dropdown, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
  const [city, updateCity] = useState(null);
  const navigate = useNavigate();
  const [isLogin, updateLogin] = useState(false);

  console.log(isLogin);

  // useEffect(() => {
  //     axios.get(" http://localhost:3004/city")
  //     .then(({data}) => {
  //       console.log(data);
  //     })
  // }, [axios])

  const login = () => {
    const localStore = localStorage.getItem("token");
    if(localStore){
    updateLogin(true)
    }
  }

  const logout = () => {
    localStorage.clear();
    updateLogin(false)
  }
    const goRegister = () => {
      navigate('/daftar')
    };
    const goLogin = () => {
      navigate('/masuk')
    };

    

  return (
    <>
      <div className="c-navbar">
        <div className="page-navbar">
          <div className="logo" onClick={() => navigate('/')}>Rentz.ID</div>
          <div className="search-navbar">
            <input type="text" placeholder="Rental kamera, Buku ..."/>
            <Button className="btn-search">< FaSearch /></Button>
            <Dropdown>
            <Dropdown.Toggle className="dropdown-navbar" id="dropdown-basic">
              <ImLocation style={{ color : "#FF8C00" }}/> Lokasi
            </Dropdown.Toggle>

            <Dropdown.Menu  align="end">
              <Dropdown.Item href="#/action-1">Medan</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Padang</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Jakarta</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        <div className="user-icon">
        <Dropdown className= "dropdown-none" onClick={login}>
            <Dropdown.Toggle className="dropdown-user" id="dropdown-basic">
            <FaUserCircle size="35px"/>
            </Dropdown.Toggle>

            <Dropdown.Menu  align="end">
            {isLogin && <span ><Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item></span>}
          {!isLogin && <span><Dropdown.Item onClick={goRegister}>Daftar</Dropdown.Item>
            <Dropdown.Item onClick={goLogin}>Masuk</Dropdown.Item></span>}
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
import './navbar.scss';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { ImLocation } from 'react-icons/im'
import { Dropdown, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import brand from '../../images/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLogin, updateLogin] = useState(false);
  const [name, updateName] = useState("")
  const getToken = localStorage.getItem("token");
  const getName = localStorage.getItem("userName");

  useEffect(() => {
    if(getToken){
      updateLogin(true)
      updateName(getName)
      }
  },[getToken, getName]);

  const logout = () => {
    localStorage.clear();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: "Anda telah keluar",
      showConfirmButton: false,
      timer: 1500
    }).then((result) => {
      navigate('/');
      updateLogin(false)
    })
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
          <div className="logo" onClick={() => navigate('/')}> <img src={brand} alt="" width="140px"/></div>
          <div className="search-navbar">
            <input type="text" placeholder="Rental kamera, Buku ..."/>
            <Button className="btn-search">< FaSearch /></Button>
            <Dropdown>
            <Dropdown.Toggle className="dropdown-navbar" id="dropdown-basic">
              <ImLocation style={{ color : "#046c91" }}/> Lokasi
            </Dropdown.Toggle>

            <Dropdown.Menu  align="end">
              <Dropdown.Item href="#/action-1">Medan</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Padang</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Jakarta</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        <div className="user-icon">
        <Dropdown className= "dropdown-none" >
            <Dropdown.Toggle className="dropdown-user" id="dropdown-basic">
             {isLogin && <><div className='dot'></div><div className='user-login'>{name[0].toLocaleUpperCase()}</div></>} 
             {!isLogin && <FaUserCircle style={{ color : "#C7D3E3" }} size="40px"/>} 
            </Dropdown.Toggle>

            <Dropdown.Menu  align="end">
            {isLogin && <>
            <span ><Dropdown.Item onClick={() => navigate('/profil')}>Profil</Dropdown.Item></span>
            <span ><Dropdown.Item onClick={() => navigate('/keranjang')}>Keranjang</Dropdown.Item></span>
            <span ><Dropdown.Item style={{ color : "red" }} onClick={() => logout()}>Logout</Dropdown.Item></span>
            </>}
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
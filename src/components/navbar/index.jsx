import './navbar.scss';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { ImLocation } from 'react-icons/im';
import { IoClose } from 'react-icons/io5';
import { RiCloseCircleFill } from 'react-icons/ri';
import { TiShoppingCart } from 'react-icons/ti';
import { BsBoxSeam } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import { Dropdown, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import brand from '../../images/logo.png';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import CheckLogin from '../checkLoginCart';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLogin, updateLogin] = useState(false);
  const [name, updateName] = useState("")
  const getToken = localStorage.getItem("token");
  const getName = localStorage.getItem("userName");
  const [userModal, setUserModal] = useState(false);
  const [locationModal, setlocationModal] = useState(false);
  const [setInputLocation] = useState("");
  const [activeClose, setActiveClose] = useState(false);
  const [getCart, updateGetCart] = useState(null)

  const headers = {
    "Authorization": 'Bearer ' + localStorage.getItem("token")
  };

  useEffect(() => {
   
    axios.get('https://rentz-id.site/jwt/cart', {headers : headers} )
    .then(({data}) => {
      updateGetCart(data)
    }).catch((err) => {

    })
  },[])

  useEffect(() => {
    if(getToken){
      updateLogin(true)
      updateName(getName)
      }
  },[getToken, getName]);

  const logout = () => {
    localStorage.clear();
    setUserModal(false);
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: "Anda telah keluar",
      showConfirmButton: false,
      timer: 1500
    }).then((result) => {
      navigate('/');
      updateLogin(false)
    })
  }
    const goRegister = () => {
      navigate('/daftar');
      setUserModal(false);
    };

    const goLogin = () => {
      navigate('/masuk');
      setUserModal(false);
    };

    const srcLocation = (e) => {
      setInputLocation(e.target.value);
      setActiveClose(true)
    }

    const bntClose = () => {
      setlocationModal(false);
      setUserModal(false);
    }
    
    const resetInput = () => {
      document.getElementById('s-location').value = "";
      setInputLocation("");
      setActiveClose(false)
    }

    const city = (city) => {
      document.getElementById('s-location').value = city;
      setInputLocation(city);
      setActiveClose(true)
    }

    if (getCart === null) {
      return(<>
        <div className="c-navbar">
        <div className="page-navbar">
          <div className="logo" onClick={() => navigate('/')}> <img src={brand} alt="" width="140px"/></div>
          {/* <div className="search-navbar">
            <input type="text" placeholder="Rental kamera, Buku ..."/>
            <Button className="btn-search">< FaSearch /></Button>

          </div> */}

          <div className='navbar-user'>
            {/* <Dropdown>
            <Dropdown.Toggle className="dropdown-navbar" id="dropdown-basic">
              <ImLocation style={{ color : "#046c91" }}/> Lokasi
            </Dropdown.Toggle>
           

            <Dropdown.Menu  align="end">
              <Dropdown.Item href="#/action-1">Medan</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Padang</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Jakarta</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown> */}
            {isLogin && 
              <div className='navbar-cart' id="cart-login" onClick={() => navigate('/keranjang')}> 
              <p style={{ color : "#c7d3e3" }}><TiShoppingCart /></p>
             </div>
            }

            {!isLogin && 
              <div className='navbar-cart' id="cart-notLogin"  >
              <p style={{ color : "#c7d3e3" }}><CheckLogin /></p>
             </div>
            }
            

            <span className='location-phone' onClick={() => setlocationModal(true)}><ImLocation  style={{ color : "#c7d3e3" }} size={25}/></span> 
            <div className="user-icon">
            <Dropdown className= "dropdown-none" >
            <Dropdown.Toggle className="dropdown-user" id="dropdown-basic">
             {isLogin && <><div className='dot'></div><div id="logo-user-login" className='user-login'>{name[0].toLocaleUpperCase()}</div></>} 
             {!isLogin && <FaUserCircle id="logo-user-notlogin" className="svg_icons" style={{ color : "#C7D3E3" }}/>} 
            </Dropdown.Toggle>

            <Dropdown.Menu  align="end">
            {isLogin && <>
            <span ><Dropdown.Item onClick={() => navigate('/profil')} id="profil">Profil</Dropdown.Item></span>
            <span ><Dropdown.Item onClick={() => navigate('/produk')} id="add-rent">Rentalkan Produk</Dropdown.Item></span>
            <span ><Dropdown.Item onClick={() => navigate('/histori-pembayaran')} id="add-rent">Histori Pembayaran</Dropdown.Item></span>
            <span ><Dropdown.Item style={{ color : "red" }} onClick={() => logout()} id="logout">Logout</Dropdown.Item></span>
            </>}
            {!isLogin && <span><Dropdown.Item id="daftar" onClick={goRegister}>Daftar</Dropdown.Item>
            <Dropdown.Item id="masuk" onClick={goLogin}>Masuk</Dropdown.Item></span>}
            </Dropdown.Menu>
           </Dropdown>
           <span className='user-phone' onClick={() => setUserModal(true)}>
           {isLogin && <><div className='dot'></div><div id="user-login-phone" className='user-login'>{name[0].toLocaleUpperCase()}</div></>} 
           {!isLogin && <FaUserCircle id="user-notlogin-phone"  className="svg_icons" style={{ color : "#C7D3E3" }}/>}    
            </span>
           </div>
           </div>
           </div>
          </div>

         
        {locationModal &&  
        
        <div className='page-location-phone'>
           <Slide direction="up" in={true} style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 400 } : {})}>
            <div className='page-location'>
              <div className='header-location'>
                <IoClose size={30} onClick={() => bntClose()}/>
                <span>Pilihan Kota</span>
              </div>
              <div className='src-location'>
                <span className='icon-src'><FaSearch /></span>
                <input id='s-location' type="text" placeholder='Tulis nama kota' onChange={(e) => srcLocation(e)}/>
                {activeClose && <span className='icon-close' onClick={() => resetInput()}><RiCloseCircleFill/></span> }
                {!activeClose && <></> }
                
              </div>
              <h6>Kota Populer</h6>
              <div className='list-city'>
                <p className='box-city' onClick={() => city('jakarta')}>Jakarta</p>
                <p className='box-city' onClick={() => city('Medan')}>Medan</p>
                <p className='box-city' onClick={() => city('Bandung')}>Bandung</p>
              </div>
            </div> 
            </Slide>   
        </div>
        }
       
        {!locationModal && <></>}

        {userModal && 
           <div className='page-location-phone'>
           <Slide direction="up" in={true} style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 400 } : {})}>
            <div className='page-users'>
              <div className='header-location'>
                <IoClose size={30} onClick={() => bntClose()}/>
                <span>Menu</span>
              </div>
              <span className='line'></span>

            {isLogin && <div className='menu'>
                <span className="menu-phone" onClick={() => navigate('/profil')}><FaUserCircle size={25} style={{ marginRight : " 10px" }}/>Profil</span>
                <span className="menu-phone" onClick={() => navigate('/produk')}><BsBoxSeam size={25} style={{ marginRight : " 10px" }}/>Rentalkan Produk</span>
                <span className="menu-phone" style={{ color : "red" }} onClick={() => logout()}><AiOutlineLogout size={25} style={{ marginRight : " 10px" }}/>Logout</span>
            </div>}
            {!isLogin && <div className='c-rl'>
              <span className="login-phone" onClick={goLogin}>Masuk</span>
              <span className='register-phone' onClick={goRegister}>Daftar</span>
              </div>}
            </div> 
            </Slide>   
        </div>
        }
        {!userModal && <></>}
         
      </>)
    }

  return (
    <>
      <div className="c-navbar">
        <div className="page-navbar">
          <div className="logo" onClick={() => navigate('/')}> <img src={brand} alt="" width="140px"/></div>
          {/* <div className="search-navbar">
            <input type="text" placeholder="Rental kamera, Buku ..."/>
            <Button className="btn-search">< FaSearch /></Button>

          </div> */}

          <div className='navbar-user'>
            {/* <Dropdown>
            <Dropdown.Toggle className="dropdown-navbar" id="dropdown-basic">
              <ImLocation style={{ color : "#046c91" }}/> Lokasi
            </Dropdown.Toggle>
           

            <Dropdown.Menu  align="end">
              <Dropdown.Item href="#/action-1">Medan</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Padang</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Jakarta</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown> */}

            {isLogin && 
            <div className='navbar-cart' id="cart-login" onClick={() => navigate('/keranjang')}> 
             <p style={{ color : "#c7d3e3" }}><TiShoppingCart /></p>
             <div className='dot-cart'></div>
            </div>
            }

            {!isLogin && 
            <div className='navbar-cart' id="cart-notLogin" onClick={() => navigate('/keranjang')}> 
             <p style={{ color : "#c7d3e3" }}><TiShoppingCart /></p>
            </div>
            }

            <span className='location-phone' onClick={() => setlocationModal(true)}><ImLocation  style={{ color : "#c7d3e3" }} size={25}/></span> 
            <div className="user-icon">
            <Dropdown className= "dropdown-none" >
            <Dropdown.Toggle className="dropdown-user" id="dropdown-basic">
             {isLogin && <><div className='dot'></div><div id="logo-user-login" className='user-login'>{name[0].toLocaleUpperCase()}</div></>} 
             {!isLogin && <FaUserCircle id="logo-user-notlogin" className="svg_icons" style={{ color : "#C7D3E3" }}/>} 
            </Dropdown.Toggle>

            <Dropdown.Menu  align="end">
            {isLogin && <>
            <span ><Dropdown.Item onClick={() => navigate('/profil')} id="profil">Profil</Dropdown.Item></span>
            <span ><Dropdown.Item onClick={() => navigate('/produk')} id="add-rent">Rentalkan Produk</Dropdown.Item></span>
            <span ><Dropdown.Item onClick={() => navigate('/histori-pembayaran')} id="add-rent">Histori Pembayaran</Dropdown.Item></span>
            <span ><Dropdown.Item style={{ color : "red" }} onClick={() => logout()} id="logout">Logout</Dropdown.Item></span>
            </>}
            {!isLogin && <span><Dropdown.Item id="daftar" onClick={goRegister}>Daftar</Dropdown.Item>
            <Dropdown.Item id="masuk" onClick={goLogin}>Masuk</Dropdown.Item></span>}
            </Dropdown.Menu>
           </Dropdown>
           <span className='user-phone' onClick={() => setUserModal(true)}>
           {isLogin && <><div className='dot'></div><div id="user-login-phone" className='user-login'>{name[0].toLocaleUpperCase()}</div></>} 
           {!isLogin && <FaUserCircle id="user-notlogin-phone"  className="svg_icons" style={{ color : "#C7D3E3" }}/>}    
            </span>
           </div>
           </div>
           </div>
          </div>

         
        {locationModal &&  
        
        <div className='page-location-phone'>
           <Slide direction="up" in={true} style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 400 } : {})}>
            <div className='page-location'>
              <div className='header-location'>
                <IoClose size={30} onClick={() => bntClose()}/>
                <span>Pilihan Kota</span>
              </div>
              <div className='src-location'>
                <span className='icon-src'><FaSearch /></span>
                <input id='s-location' type="text" placeholder='Tulis nama kota' onChange={(e) => srcLocation(e)}/>
                {activeClose && <span className='icon-close' onClick={() => resetInput()}><RiCloseCircleFill/></span> }
                {!activeClose && <></> }
                
              </div>
              <h6>Kota Populer</h6>
              <div className='list-city'>
                <p className='box-city' onClick={() => city('jakarta')}>Jakarta</p>
                <p className='box-city' onClick={() => city('Medan')}>Medan</p>
                <p className='box-city' onClick={() => city('Bandung')}>Bandung</p>
              </div>
            </div> 
            </Slide>   
        </div>
        }
       
        {!locationModal && <></>}

        {userModal && 
           <div className='page-location-phone'>
           <Slide direction="up" in={true} style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 400 } : {})}>
            <div className='page-users'>
              <div className='header-location'>
                <IoClose size={30} onClick={() => bntClose()}/>
                <span>Menu</span>
              </div>
              <span className='line'></span>

            {isLogin && <div className='menu'>
                <span className="menu-phone" onClick={() => navigate('/profil')}><FaUserCircle size={25} style={{ marginRight : " 10px" }}/>Profil</span>
                <span className="menu-phone" onClick={() => navigate('/produk')}><BsBoxSeam size={25} style={{ marginRight : " 10px" }}/>Rentalkan Produk</span>
                <span className="menu-phone" style={{ color : "red" }} onClick={() => logout()}><AiOutlineLogout size={25} style={{ marginRight : " 10px" }}/>Logout</span>
            </div>}
            {!isLogin && <div className='c-rl'>
              <span className="login-phone" onClick={goLogin}>Masuk</span>
              <span className='register-phone' onClick={goRegister}>Daftar</span>
              </div>}
            </div> 
            </Slide>   
        </div>
        }
        {!userModal && <></>}
         
    </>
  )
}

export default Navbar;
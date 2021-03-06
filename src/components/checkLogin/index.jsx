import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './checkLogin.scss';

const CheckLogin = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let locationPathName = window.location.pathname;
  let pathName = locationPathName.substring(locationPathName.lastIndexOf('/') + 1);

  return(
    <>
     <Button onClick={handleShow} id="rent-notlogin">
        Rental
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
           <p className='check'>Harap masuk terlebih dahulu... <u onClick={() => navigate(`/masuk/${pathName}`)} id="masuk1">Masuk</u> atau <u onClick={() => navigate(`/daftar/${pathName}`)} id="daftar1">Daftar</u></p>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default CheckLogin;
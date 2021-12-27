import { Modal } from 'react-bootstrap';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CheckLogin = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let locationPathName = window.location.pathname;
  let pathName = locationPathName.substring(locationPathName.lastIndexOf('/') + 1);

  return(
    <>
     <p onClick={handleShow} style={{ display : "inline", cursor : "pointer"}}>
        Tampilkan
      </p>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
           <p className='check'>Harap masuk terlebih dahulu... <u onClick={() => navigate(`/masuk/${pathName}`)} id="masuk2">Masuk</u> atau <u onClick={() => navigate(`/daftar/${pathName}`)} id="daftar2">Daftar</u></p>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default CheckLogin;
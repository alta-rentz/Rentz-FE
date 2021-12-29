import { Modal } from 'react-bootstrap';
import './category-elektronik.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryElektronik = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='c1' onClick={handleShow}>
      <div className='c-in1'></div>
      <div className='c-text'>
        <h5 >
          Elekronik
        </h5>
      </div>
    </div>

    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    dialogClassName="custom-dialog"
  >
    <Modal.Header closeButton>
      <Modal.Title>Elektronik</Modal.Title>
    </Modal.Header>
    <div className='body-cat'>
    <Modal.Body>
      <div className='p-cat'>
        <div className='c-sub' onClick={() => navigate('kategori/101')}>
          <div className='img'></div>
          <div className='text'>Laptop</div>
        </div>
        <div className='c-sub' onClick={() => navigate('kategori/102')}>
          <div className='img2'></div>
          <div className='text'>Komputer</div>
        </div>
        <div className='c-sub' onClick={() => navigate('kategori/107')}>
          <div className='img3'></div>
          <div className='text'>Kamera</div>
        </div>
        <div className='c-sub' onClick={() => navigate('kategori/103')}>
          <div className='img4'></div>
          <div className='text'>Playstation</div>
        </div>
        <div className='c-sub' onClick={() => navigate('kategori/104')}>
          <div className='img5'></div>
          <div className='text'>Drone</div>
        </div>
      </div>
    </Modal.Body>
    </div>
  </Modal>
    </>
  )
}

export default CategoryElektronik;
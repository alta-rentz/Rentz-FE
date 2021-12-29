import { Modal } from 'react-bootstrap';
import './category-olahraga.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryOlahraga = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  return (
    <>
     <div className='c1' onClick={handleShow}>
      <div className='c-in3'></div>
      <div className='c-text'>
        <h5 >
         Olahraga
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
      <Modal.Title>Olahraga</Modal.Title>
    </Modal.Header>
    <div className='body-cat'>
    <Modal.Body>
      <div className='p-cat'>
        <div className='c-sub' onClick={() => navigate('/kategori/404')}>
          <div className='img-olahraga'></div>
          <div className='text'>Kacamata Renang</div>
        </div>
        <div className='c-sub' onClick={() => navigate('/kategori/407')}>
          <div className='img-olahraga2'></div>
          <div className='text'>Bola Sepak</div>
        </div>
        <div className='c-sub' onClick={() => navigate('/kategori/408')}>
          <div className='img-olahraga3'></div>
          <div className='text'>Bola Volly</div>
        </div>
        <div className='c-sub' onClick={() => navigate('/kategori/402')}>
          <div className='img-olahraga4'></div>
          <div className='text'>Bola Yoga</div>
        </div>
        <div className='c-sub' onClick={() => navigate('/kategori/406')}>
          <div className='img-olahraga5'></div>
          <div className='text'>Skiping Jump</div>
        </div>
        <div className='c-sub' onClick={() => navigate('/kategori/401')}>
          <div className='img-olahraga6'></div>
          <div className='text'>Karpet Yoga</div>
        </div>
      </div>
    </Modal.Body>
    </div>
  </Modal>
    </>
  )
}

export default CategoryOlahraga;
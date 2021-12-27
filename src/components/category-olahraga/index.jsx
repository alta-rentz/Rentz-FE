import { Modal } from 'react-bootstrap';
import './category-olahraga.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryOlahraga = () => {
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
        <div className='c-sub'>
          <div className='img-olahraga'></div>
          <div className='text'>Bola Basket</div>
        </div>
        <div className='c-sub'>
          <div className='img-olahraga2'></div>
          <div className='text'>Bola Kaki</div>
        </div>
        <div className='c-sub'>
          <div className='img-olahraga3'></div>
          <div className='text'>Bola Volley</div>
        </div>
        <div className='c-sub'>
          <div className='img-olahraga4'></div>
          <div className='text'>Bola Yoga</div>
        </div>
        <div className='c-sub'>
          <div className='img-olahraga5'></div>
          <div className='text'>Skiping Jump</div>
        </div>
        <div className='c-sub'>
          <div className='img-olahraga6'></div>
          <div className='text'>Matras Yoga</div>
        </div>
      </div>
    </Modal.Body>
    </div>
  </Modal>
    </>
  )
}

export default CategoryOlahraga;
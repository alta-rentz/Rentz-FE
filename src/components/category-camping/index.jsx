import { Modal } from 'react-bootstrap';
import './category-camping.scss';
import { useState } from 'react';

const CategoryCamping = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <div className='c1' onClick={handleShow}>
      <div className='c-in4'></div>
      <div className='c-text'>
        <h5 >
          Peralatan Camping
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
      <Modal.Title>Peralatan Camping</Modal.Title>
    </Modal.Header>
    <div className='body-cat'>
    <Modal.Body>
      <div className='p-cat'>
        <div className='c-sub'>
          <div className='img-camping'></div>
          <div className='text'>Tenda</div>
        </div>
        <div className='c-sub'>
          <div className='img-camping2'></div>
          <div className='text'>Sleeping Bag</div>
        </div>
        <div className='c-sub'>
          <div className='img-camping3'></div>
          <div className='text'>Carrier</div>
        </div>
        <div className='c-sub'>
          <div className='img-camping4'></div>
          <div className='text'>Sepatu</div>
        </div>
        <div className='c-sub'>
          <div className='img-camping5'></div>
          <div className='text'>Senter</div>
        </div>
        <div className='c-sub'>
          <div className='img-camping6'></div>
          <div className='text'>Matras</div>
        </div>
      </div>
    </Modal.Body>
    </div>
  </Modal>
    </>
  )
}

export default CategoryCamping;
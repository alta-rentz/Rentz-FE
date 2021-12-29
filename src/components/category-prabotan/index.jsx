import { Modal } from 'react-bootstrap';
import './category-prabotan.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryPrabotan = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     <div className='c1' onClick={handleShow}>
      <div className='c-in2'></div>
      <div className='c-text'>
        <h5 >
          Perabotan Rumah tangga
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
      <Modal.Title>Prabotan Rumah Tangga</Modal.Title>
    </Modal.Header>
    <div className='body-cat'>
    <Modal.Body>
      <div className='p-cat'>
        <div className='c-sub' onClick={() => navigate('kategori/201')}>
          <div className='img-prabotan'></div>
          <div className='text'>Vacum Cleaner</div>
        </div>
        <div className='c-sub' onClick={() => navigate('kategori/202')}>
          <div className='img-prabotan2'></div>
          <div className='text'>Mesin Kopi</div>
        </div>
        <div className='c-sub' onClick={() => navigate('kategori/203')}>
          <div className='img-prabotan3'></div>
          <div className='text'>Air Fryer</div>
        </div>
        <div className='c-sub' onClick={() => navigate('kategori/204')}>
          <div className='img-prabotan4'></div>
          <div className='text'>Oven</div>
        </div>
        <div className='c-sub' onClick={() => navigate('kategori/205')}>
          <div className='img-prabotan5'></div>
          <div className='text'>Mixer</div>
        </div>
        <div className='c-sub' onClick={() => navigate('kategori/206')}>
          <div className='img-prabotan6'></div>
          <div className='text'>Blender</div>
        </div>
      </div>
    </Modal.Body>
    </div>
  </Modal>
    </>
  )
}

export default CategoryPrabotan;
import { Modal, Button } from 'react-bootstrap';
import './add-cart.scss';
import { useState } from 'react';
import { TiShoppingCart } from 'react-icons/ti';

const AddCart = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>
        Rental
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><TiShoppingCart size="25px"/>Tambahkan ke keranjang </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='body-one'>
              <p>Nama Produk</p>
              <p>Harga</p>
              <p>Jumlah Hari</p>
            </div>
            <div className='body-two'>
            <p>Kamera Canon</p>
            <p>Rp.250.000</p>
            <p>x 1 Hari</p>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <p>Total Harga</p> 
          <p>Rp. 250.000</p>
          <Button className='form-control' variant="success">Tambahkan</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddCart;
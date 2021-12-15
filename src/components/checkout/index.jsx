import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './checkout.scss';
import { TiShoppingCart } from 'react-icons/ti';

const Checkout = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
     <Button onClick={handleShow}>
        Bayar
      </Button>

      <div className='modal-checkout'>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        
      >
        <Modal.Header >
          <Modal.Title>INFORMASI PEMBAYARAN </Modal.Title>
          <TiShoppingCart size="25px"/>
        </Modal.Header>
        <div className='checkout-scroll'>
        <Modal.Body className='checkout-body' >
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
          <Modal.Body className='checkout-body' >
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
        </div>
        <Modal.Footer>
          <div className='total-payment'>
            <p>Total Harga</p> 
            <p>Rp. 250.000</p>
          </div>
          <div className='payment'>
            <h5>Metode Pembayaran</h5>

            <div className='btn-payment'>
              <button className='cod active'>COD</button>
              <button className='transfer'>TRANSFER</button>
            </div>
          </div>
          <Button className='form-control' variant="success">Bayar</Button>
          <Button className='form-control' variant="danger" onClick={handleClose}>Batalkan</Button>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  )
}

export default Checkout;
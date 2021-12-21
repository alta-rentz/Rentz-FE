import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import './checkout.scss';
import { TiShoppingCart } from 'react-icons/ti';
// import { Form } from 'react-bootstrap';
import dana from '../../images/dana.png';
import shopee from '../../images/shopee.png';
import linkaja from '../../images/linkaja.png';
import ovo from '../../images/ovo.png';

const Checkout = () => {
  // const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [phone] = useState('');
  const [payment, setPayment] = useState('')

  const handleMethod = (set) => {
    setPayment(set);
  }

  console.log(payment);
  return(
    <>
     <Button onClick={handleShow}>
        Bayar
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="tes"
      >
        <Modal.Header >
          <Modal.Title>INFORMASI PEMBAYARAN </Modal.Title>
          <TiShoppingCart size="25px"/>
        </Modal.Header>
          <Modal.Body className='checkout-body' >
          <div className='total-payment'>
            <p>Total Harga</p> 
            <p>Rp. 250.000</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='payment'>
            <h5>Metode Pembayaran</h5>
            <form>
                <div className='method'>
                  <input type="radio" name="method" id="cod"   onClick={() => handleMethod('cod')}/>
                  <label for="cod">COD ( Cash On Delivery )</label>
                </div>
              <h6>Transfer</h6>
                <div className='method'>
                  <input type="radio" name="method" id="dana"  onClick={() => handleMethod('ID_DANA')} />
                  <label for="dana"><img src={dana} alt='dana' width={80}/></label>
                </div>
                <div className='method'>
                  <input type="radio" name="method" id="shopee"  onClick={() => handleMethod('ID_SHOPEEPAY')} />
                  <label for="shopee"><img src={shopee} alt='shopee' width={69}/></label>
                </div>
                <div className='method'>
                  <input type="radio" name="method" id="linkaja"  onClick={() => handleMethod('ID_LINKAJA')} />
                  <label for="linkaja"><img src={linkaja} alt='linkaja' width={40}/></label>
                </div>
                <div className='method'>
                  <input type="radio" name="method" id="ovo"  onClick={() => handleMethod({phone})} />
                  <label for="ovo"><img src={ovo} alt='ovo' width={40}/></label>
                </div>
                
            </form>
          </div>
          <Button className='form-control' variant="success">Bayar</Button>
          <Button className='form-control' variant="danger" onClick={handleClose}>Batalkan</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Checkout;
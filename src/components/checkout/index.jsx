import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './checkout.scss';
import { TiShoppingCart } from 'react-icons/ti';
import dana from '../../images/dana.png';
import shopee from '../../images/shopee.png';
import linkaja from '../../images/linkaja.png';
import ovo from '../../images/ovo.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const { from } = location.state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [phone] = useState('');
  const [payment, setPayment] = useState('')

  const handleMethod = (set) => {
    setPayment(set);
  }

  console.log(from);

   const headers = {
    "Content-type": "application/json; charset=UTF-8",
    "Authorization": 'Bearer ' + localStorage.getItem("token")
  };

    const checkoutObj = {
      "booking_id" : from.id_product,
      "checkout_method" : payment
    }

  const handleSubmit = (e) => {
   e.preventDefault()
    console.log(checkoutObj);
   axios.post('https://rentz-id.site/jwt/checkout', checkoutObj, {headers : headers})
    .then(({data}) => {
      console.log(data);

      if(payment === 'cod'){
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: "Pembayaran Cash On Delivery",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate('/keranjang');
        })
      }else{
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: "Silahkan Konfirmasi Pembayaran",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {

        if(payment === 'ID_DANA'){
        window.open(`${data.payment.actions.desktop_web_checkout_url}`, '_blank');
        } else if (payment === 'ID_SHOPEEPAY') {
          window.open(`${data.payment.actions.mobile_deeplink_checkout_url}`, '_blank');
        }else if (payment === 'ID_LINKAJA'){
        window.open(`${data.payment.actions.desktop_web_checkout_url}`, '_blank');
        }
        navigate('/keranjang');
      })
    }
      
    }).catch((err) => {
      console.log(err.response.data.message);
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: err.response.data.message,
        showConfirmButton: false,
        timer: 1500
      })
    })

  }

  return(
    <>
     
          <div className='c-checkout'>
      
            <div className='page-checkout'>
          <h5><TiShoppingCart size="25px"/>INFORMASI PEMBAYARAN </h5>
          
          <div className='checkout-body' >
          <div className='total-payment'>
            <p>Total Harga</p> 
            <p>Rp. 250.000</p>
          </div>
        </div>
        <div>
        <form >
          <div className='payment'>
            <h5>Metode Pembayaran</h5>
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
          </div>
          <Button className='form-control mb-1' variant="success" type='submit' onClick={(e) => handleSubmit(e)}>Bayar</Button>
          <Button className='form-control' variant="danger" onClick={() => navigate('/keranjang')}>Batalkan</Button>
          </form>
        </div>
        </div>
        </div>
    </>
  )
}

export default Checkout;
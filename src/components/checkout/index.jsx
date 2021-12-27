import { Spinner, Button } from 'react-bootstrap';
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
  const { from } = location.state;
  const [phone] = useState('');
  const [payment, setPayment] = useState('');
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const toRupiah = (money) => {
    return new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR", minimumFractionDigits: 0}).format(money);
  }

  const handleMethod = (set) => {
    setPayment(set);
  }

   const headers = {
    "Content-type": "application/json; charset=UTF-8",
    "Authorization": 'Bearer ' + localStorage.getItem("token")
  };

    const checkoutObj = {
      "booking_id" : from.id_product,
      "checkout_method" : payment
    }

    const checkoutOvo = {
      "booking_id" : from.id_product,
      "phone" : '+628123123123'
    }

  const handleSubmit = (e) => {
   e.preventDefault()
   setLoading(true)

   if (payment.length === 0){
      setAlert(true);
      setLoading(false);
   }else{

    if(payment === 'OVO') {
      axios.post('https://rentz-id.site/jwt/checkout/ovo', checkoutOvo, {headers : headers})
      .then(({data}) => {
        setLoading(false);
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: "Pembayaran dengan OVO berhasil",
          showConfirmButton: true
        }).then(() => {
          navigate('/keranjang');
        })
      })
    }else{

   axios.post('https://rentz-id.site/jwt/checkout', checkoutObj, {headers : headers})
    .then(({data}) => {
      setLoading(false);

      if(payment === 'cod'){
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: "Pembayaran Cash On Delivery",
          showConfirmButton: true
        }).then(() => {
          navigate('/keranjang');
        })
      }else{
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: "Silahkan Konfirmasi Pembayaran",
        showConfirmButton: false,
        timer: 3000
      }).then(() => {

        if(payment === 'ID_DANA'){
        window.open(`${data.payment.actions.desktop_web_checkout_url}`, "_self");
        } else if (payment === 'ID_SHOPEEPAY') {
          window.open(`${data.payment.actions.mobile_deeplink_checkout_url}`, "_self");
        }else if (payment === 'ID_LINKAJA'){
        window.open(`${data.payment.actions.desktop_web_checkout_url}`, "_self");
        }
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
  }

  }

  return(
    <>
     
          <div className='c-checkout'>
      
            <div className='page-checkout'>
          <h5><TiShoppingCart size="25px"/>INFORMASI PEMBAYARAN </h5>
          
          <div className='checkout-body' >
          <div className='total-payment'>
            <p>Total Harga</p> 
            <p>{toRupiah(from.total)}</p>
          </div>
        </div>
        <div>
        <form >
          <div className='payment'>
            <h5>Metode Pembayaran</h5>
            {alert && <p style={{ color: "red" }}>Pilih metode pembayaran di bawah</p>}
            {!alert && <></>}
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
                  <input type="radio" name="method" id="ovo"  onClick={() => handleMethod('OVO')} />
                  <label for="ovo"><img src={ovo} alt='ovo' width={40}/></label>
                </div>
          </div>
          {loading && <Button className='form-control mb-1' variant="success" type='submit' onClick={(e) => handleSubmit(e)}><Spinner animation="border"/></Button>}
          {!loading && <Button className='form-control mb-1' variant="success" type='submit' onClick={(e) => handleSubmit(e)}>Bayar</Button>}
          <Button className='form-control' variant="danger" onClick={() => navigate('/keranjang')}>Batalkan</Button>
          </form>
        </div>
        </div>
        </div>
    </>
  )
}

export default Checkout;
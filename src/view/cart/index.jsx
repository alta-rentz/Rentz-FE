import './cart.scss';
import { useState } from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import img from "../../images/kamera1.jpg";
import Checkout from "../../components/checkout";

const Cart = () => {
  const [activePay, updateActivePay] = useState(false);
  const [pay, updatePay] = useState([]);

  const handleChange = (e) => {
  
    if(e.target.checked){
      updatePay([...pay, e.target.value]);
      updateActivePay(true)
    }

    if(!e.target.checked){
    const index = pay.indexOf(e.target.value);
      if(index > -1){
        pay.splice(index, 1);
      }
      updatePay(pay);

      if(pay.length === 0){
        updateActivePay(false)
      }
    }
  }

  return (
    <>
    <div className='c-cart'>
      <div className='page-cart'>
        <div className='title-cart'>
          <div className='title-left'>
            <h5><TiShoppingCart /> Keranjang</h5>
            <div className='underline-title'></div>
          </div>
          <div className='title-rigth'>
            {activePay && <Checkout />}
            {!activePay && <button style={{ backgroundColor : "grey", cursor : "not-allowed" }}>Bayar</button>}
          </div>
        </div>
        <div className='card-cart'>
          <div className='item-cart'>
            <img src={img} alt="" width="150px"/>
            <div className='item-info'>
            <p>Kamera Canon</p>
            <p>Rp.250.000 x 1 Hari</p>
            <p>Medan, Sumatra Utara</p>
            </div>
          </div>
          <div className='pay'>
            <p>Rp.250.000</p>
            <label class="container-checkbox">
              <input type="checkbox" value="1" onClick={(e) => handleChange(e)}/>
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
        <div className='card-cart'>
          <div className='item-cart'>
            <img src={img} alt="" width="150px"/>
            <div className='item-info'>
            <p>Kamera Canon</p>
            <p>Rp.250.000 x 1 Hari</p>
            <p>Medan, Sumatra Utara</p>
            </div>
          </div>
          <div className='pay'>
            <p>Rp.250.000</p>
            <label class="container-checkbox">
              <input type="checkbox" value="2" onClick={(e) => handleChange(e)}/>
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default Cart;
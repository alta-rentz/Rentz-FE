import './cart.scss';
import { useState, useEffect } from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import img from "../../images/kamera1.jpg";
import Checkout from "../../components/checkout";
import axios from 'axios';
import { useNavigate, Link  } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const Cart = ({ navigation }) => {
  const navigate = useNavigate();
  const [activePay, updateActivePay] = useState(false);
  const [pay, updatePay] = useState([]);
  const [cartList, updateCartList] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const headers = {
      "Authorization": 'Bearer ' + localStorage.getItem("token")
    };
    axios.get('https://rentz-id.site/jwt/cart', {headers : headers} )
    .then(({data}) => {
      updateCartList(data)
    }).catch((err) => {
      setLoading(true)
    })

  
  },[])

  const handleChange = (e) => {
  
    if(e.target.checked){
      updatePay([...pay, +e.target.value]);
      updateActivePay(true)
    }

    if(!e.target.checked){
    const index = pay.indexOf(+e.target.value);
      if(index > -1){
        pay.splice(index, 1);
      }
      updatePay(pay);

      if(pay.length === 0){
        updateActivePay(false)
      }
    }
  }

  const checkout = {
    id_product : pay
  }

  if(cartList === null) {
    return(<>
      <div className='c-cart'>
      <div className='page-cart'>
        <div className='title-cart'>
          <div className='title-left'>
            <h5><TiShoppingCart /> Keranjang</h5>
            <div className='underline-title'></div>
          </div>
          <div className='title-rigth'>
            {activePay && <button>Bayar</button>} 
            {!activePay && <span  className='btn-checkout' style={{ backgroundColor : "grey", cursor : "not-allowed" }}>Bayar</span>}
          </div>
        </div>
        <div style={{
           display : "flex", 
           justifyContent : "center",
           alignItems : "center",
           height :"660px",
           color : "#046c91",
        }}> 
          {loading && <p>Keranjang Kosong</p>}
          {!loading && <Spinner animation="border"/>}
        </div>
        
      </div>
    </div>
    </>)
  }

  console.log(pay);

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
            {activePay &&  <Link className='btn-checkout' to='/checkout' state={{ from: checkout }}>Bayar</Link>}
            {!activePay && <span  className='btn-checkout' style={{ backgroundColor : "grey", cursor : "not-allowed" }}>Bayar</span>}
          </div>
        </div>
        {cartList.data.map((el, i) =>
        <div className='card-cart' key={i}>
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
            <label className="container-checkbox">
              <input type="checkbox" value={el.ID} onClick={(e) => handleChange(e)}/>
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
        )}
        
      </div>
    </div>
    </>
  )
}

export default Cart;
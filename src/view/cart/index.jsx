import './cart.scss';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useState, useEffect } from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import { RiDeleteBinLine } from 'react-icons/ri'
import img from "../../images/kamera1.jpg";
import axios from 'axios';
import { useNavigate, Link  } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Cart = ({ navigation }) => {
  const navigate = useNavigate();
  const [activePay, updateActivePay] = useState(false);
  const [pay, updatePay] = useState([]);
  const [cartList, updateCartList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPay, setTotalPay] = useState(0)
  const headers = {
    "Authorization": 'Bearer ' + localStorage.getItem("token")
  };

  const toRupiah = (money) => {
    return new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR", minimumFractionDigits: 0}).format(money);
  }

  useEffect(() => {
   
    axios.get('https://rentz-id.site/jwt/cart', {headers : headers} )
    .then(({data}) => {
      updateCartList(data)
    }).catch((err) => {
      setLoading(true)
    })

  
  },[])

  const handleChange = (e, total) => {
    
    console.log(total);
    if(e.target.checked){
      updatePay([...pay, +e.target.value]);
      setTotalPay(totalPay+total)
      updateActivePay(true)
    }

    if(!e.target.checked){
      setTotalPay(totalPay-total)
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
    id_product : pay,
    total      : totalPay
  }

  console.log('ini total bayar' +totalPay);
  if(cartList === null) {
    return(<>
      <Navbar />
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
    <Footer />
    </>)
  }

  const sortList =cartList.data.sort((a, b) => b.ID - a.ID);

  const handleDelete = (id) => {

    Swal.fire({
      title: 'Apakah kamu yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hapus'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://rentz-id.site/jwt/booking/${id}`, {headers : headers})
    .then(({data}) => {
      console.log(data);
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      );

      window.location.reload();

      navigate('/keranjang');
      axios.get('https://rentz-id.site/jwt/cart', {headers : headers} )
      .then(({data}) => {
        updateCartList(data)
      }).catch((err) => {
        console.log(err.response);
      })
    }).catch((err) => {
      console.log(err);
    })
   
      }
    })
    
  }

  console.log(totalPay);
  
  return (
    <>
    <Navbar />
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
        {sortList.map((el, i) =>
        <div className='card-cart' key={i}>
          <div className='item-cart'>
            <img src={el.Photos} alt="" width="150px"/>
            <div className='item-info'>
            <p>{el.Name}</p>
            <p>{toRupiah(el.Price)} x {el.Total_Day} Hari</p>
            <p>{toRupiah(el.Total)}</p>
            </div>
          </div>
          <div className='pay'>
            <p id="d_product" onClick={() => handleDelete(el.ID)}><RiDeleteBinLine/></p>
            <label className="container-checkbox">
              <input type="checkbox" value={el.ID} onClick={(e, total) => handleChange(e,  el.Total)}/>
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
        )}
        
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Cart;
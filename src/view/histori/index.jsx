import './histori.scss';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link  } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const History = () => {
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
    window.scrollTo(0, 0);
    axios.get('https://rentz-id.site/jwt/history', {headers : headers} )
    .then(({data}) => {
      updateCartList(data);
      console.log(data);
    }).catch((err) => {
      setLoading(true)
    })

  
  },[])



  if(cartList === null) {
    return(<>
      <Navbar />
      <div className='c-cart'>
    <div className='navbar-cart'>
    <div className='title-cart'>
          <div className='title-left'>
            <div className='tl'> <span className='line-title'></span> <h5>Histori Pembayaran</h5> </div>
          </div>
        </div>
          </div>
      <div className='page-cart'>
        
      <div style={{
           display : "flex", 
           justifyContent : "center",
           padding : "20px",
           border : "1px solid rgba(0, 0, 0, 0.09)",
           height :"80px",
           color : "#046c91",
           fontSize: "20px"
        }}> 
          {loading && <p>Histori Pembayaran Kosong</p>}
          {!loading && <Spinner animation="border"/>}
        </div>
        
        
      </div>
    </div>
    </>)
  }

  const sortList =cartList.data.sort((a, b) => b.ID - a.ID);

  return (
    <>
    <Navbar />
    <div className='c-cart'>
    <div className='navbar-cart'>
    <div className='title-cart'>
          <div className='title-left'>
            <div className='tl'> <span className='line-title'></span> <h5>Histori Pembayaran</h5> </div>
          </div>
        </div>
          </div>
      <div className='page-cart'>
        
       
        {sortList.map((el, i) =>
        <div className='card-cart' key={i}>
          <div className='item-cart'>
            <img src={el.Photos} alt={i} />
            <div className='item-info'>
            <p>{el.Name}</p>
            <p>{toRupiah(el.Price)} x {el.Total_Day} Hari</p>
            </div>
          </div>
          <div className='total-pay'><p>{toRupiah(el.Total)}</p></div>
          <div className='status'>       
              <p>{el.Status_Payment}</p>
          </div>
        </div>
        )}
        
      </div>
    </div>
    </>
  )
}

export default History;
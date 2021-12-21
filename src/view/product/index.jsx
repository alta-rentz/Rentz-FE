import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsBoxSeam, BsFillEyeFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import './product.scss';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

const Product = () => {
  const navigate = useNavigate();
  const [list, updateList] = useState();
  const [loading, setLoading] = useState(false);

  const headers = {
    "Authorization": 'Bearer ' + localStorage.getItem("token")
};
  
  useEffect(() => {

    axios.get('https://rentz-id.site/jwt/products', {headers: headers})
    .then(({data}) => {
      updateList(data.data);
    }).catch((err) => {
      setLoading(true)
    })

  })

  
  if (list === undefined){
    return (
    <>
      <div className='c-product'>
      <div className='page-product'>
        <div className='title-product'>
          <div className='title-left'>
            <h5><BsBoxSeam /><span style={{ marginLeft : "5px" }}> Produk Saya</span> </h5>
            <div className='underline-title-product'></div>
          </div>
          <div className='title-rigth'>
            <button onClick={() => navigate('/tambah_produk')}>Tambah</button>
          </div>
        </div>
           <div className='loading-product'>
             {loading && <p>Product Kosong</p>}
           {!loading && <Spinner animation="border"/>}
        </div>
      </div>
    </div>
    </>)
  }

  const sortList =list.sort((a, b) => b.ID - a.ID)
  
  return (
    <>
    <div className='c-product'>
      <div className='page-product'>
        <div className='title-product'>
          <div className='title-left'>
            <h5><BsBoxSeam /><span style={{ marginLeft : "5px" }}> Produk Saya</span> </h5>
            <div className='underline-title-product'></div>
          </div>
          <div className='title-rigth'>
            <button onClick={() => navigate('/tambah_produk')}>Tambah</button>
          </div>
        </div>
        {sortList.map((el, i) => 
        <div className='card-product' key={i}>
          <div className='item-product'>
            <img src={el.Url} alt={el.Url} width="150px"/>
            <div className='item-info'>
            <p>{el.Name}</p>
            <p>Rp.{el.Price} / Hari</p>
            <p>Stok Produk : {el.Stock}</p>
            </div>
          </div>
          <div className='product-function'>
            <button onClick={() => navigate(`/detail/${el.ID}`)}><BsFillEyeFill/></button>
            <button>< FaEdit/></button>
            <button>< RiDeleteBin5Line /></button>
          </div>
        </div>
        )}
        
      </div>
    </div>
    </>
  )
}

export default Product;
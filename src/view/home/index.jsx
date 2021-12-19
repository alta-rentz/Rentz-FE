import './home.scss';
import { Dropdown, Button, Spinner, Carousel } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from 'react';
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';
import baner1 from '../../images/baner1.jpeg';
import baner2 from '../../images/baner2.jpeg';

const Home = () => {
  const navigate = useNavigate();
  const [list, updateList]    = useState(null);
  const [limit, updateLimit]  = useState(10);
  const [loading, setLoading] = useState(false);
  const [skeletonCard] = useState([1,2,3,4,5,6,7,8,9,10]);

  useEffect(()=>{
 
  axios.get('https://rentz-id.site/products')
  .then(({data}) => {
    setTimeout(() => {
    updateList(data)
  }, 500)
  }).catch((err) => {
    console.log(err);
  })
}, [updateList]);

const handleLoad = () => {

  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    updateLimit(limit + 10);
    // window.scrollTo(0,document.body.scrollHeight);
  }, 500);
}

if (list === null) return (<><div className="c-home">
<div className="page-home">
  <div className='page-carousel'>
    <div className='card-loading loading'></div>
  </div>
  <div className="category-home">
    <h5>KATEGORI :</h5>
    <Dropdown>
      <Dropdown.Toggle className="dropdown-home" id="dropdown-basic">
        Pilihan Kategori ... 
      </Dropdown.Toggle>

      <Dropdown.Menu className='dropdown-kategori' align="end">
        <Dropdown.Item href="#/action-1">Elektronik</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Rumah Tangga</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Hobi & Olahraga</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>
  <div className="page-list">
    <div className='title-loading loading'></div>
    <div className="card-home">
      {skeletonCard.map((el, i) => 
      <div className="cards" key={i} >
        <div className='img-products-loading loading'></div>
        <div className='name-product-loading'>
          <p></p>
        </div>
      </div>
      )}
    </div>
  </div>
  </div>
  </div></>);

const data = list.data.filter((el, i) => i  < limit);

const load = document.getElementById("load");

if( list.data.length <= limit ){
    load.style.display = "none";
}

  return (
    <>
    <div className="c-home">
      <div className="page-home">
      <Fade  in={true}
              style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 1000 } : {})}
              >
        <div className='page-carousel'>
          <Carousel fade>
          <Carousel.Item interval={5000}>
            <img
              className="d-block w-100"
              src={baner1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img
              className="d-block w-100"
              src={baner2}
              alt="Second slide"
            />
          </Carousel.Item>
        </Carousel>
        </div>
        </Fade>

        <div className="category-home">
          <h5>KATEGORI :</h5>
          <Dropdown>
            <Dropdown.Toggle className="dropdown-home" id="dropdown-basic">
              Pilihan Kategori ... 
            </Dropdown.Toggle>

            <Dropdown.Menu className='dropdown-kategori' align="end">
              <Dropdown.Item href="#/action-1">Elektronik</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Rumah Tangga</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Hobi & Olahraga</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="page-list">
          <h6>Semua Kategori</h6>
          <div className="card-home">
          
            {data.map((el, i) => 
              <Fade  in={true} key={i}
              style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 1000 } : {})}
              >
              <div className="cards" loading="lazy" onClick={() => navigate(`/detail/${el.ID}`)} >
                <div className='img-products'
                  style={{ 
                    backgroundImage : `url('${el.Url}')`,
                    backgroundPosition : 'center',
                    backgroundSize : 'contain',
                    backgroundRepeat : 'no-repeat'
                   }}
                >
                </div>
                <div className='name-product'>
                  <p>{el.Name}</p>
                </div>
              </div>
              </Fade >
            )}
          </div>
          <div id="load">
            {loading && <div className="load" >
              <Spinner animation="grow"  style={{ color : "#046C91" }} size="sm"/>
              <Spinner animation="grow"  style={{ color : "#046C91" }} size="sm" className='ms-1 me-1'/>
              <Spinner animation="grow"  style={{ color : "#046C91" }} size="sm"/>
            </div>}
            {!loading && <div className="load" ><Button onClick={() => handleLoad()} className='btn-load'>Muat lainnya...</Button></div>}
          </div>    
        </div>
      </div>
    </div>
    </>
  )
}

export default Home;
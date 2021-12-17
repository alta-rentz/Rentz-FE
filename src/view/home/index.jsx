import './home.scss';
import { Dropdown, Button, Spinner } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from 'react';
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';
import kamera from '../../images/kamera1.jpg';

const Home = () => {
  const navigate = useNavigate();
  const [list, updateList]    = useState(null);
  const [limit, updateLimit]  = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
 
  axios.get('https://rentz-id.site/products')
  .then(({data}) => {
    updateList(data)

  }).catch((err) => {
    console.log(err);
  })
}, [updateList]);

const handleLoad = () => {

  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    updateLimit(limit + 10);
    window.scrollTo(0,document.body.scrollHeight);
  }, 500);
}

if (list === null) return (<><div className="c-home">
<div className="page-home">
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
  <div className="page-list-loading">
    
  <Spinner animation="grow" style={{ color : "#046C91" }} size="sm" />
  <Spinner animation="grow" style={{ color : "#046C91" }} className='ms-1 me-1'/>
  <Spinner animation="grow" style={{ color : "#046C91" }} size="sm"/>
  
  </div>
</div>
</div></>);

const data = list.data.filter((el, i) => i  < limit);

const load = document.getElementById("load");

console.log(data);
if( list.data.length <= limit ){
    load.style.display = "none";
}

  return (
    <>
    <div className="c-home">
      <div className="page-home">
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
                <div className='img-products'>
                <img src={el.Url} alt={el.ID} loading="lazy" width="238px" height="200px" />
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
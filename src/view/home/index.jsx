import './home.scss';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { Dropdown, Button, Spinner, Carousel } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import allStore from "../../store/actions";
import banner from '../../images/banner.png';
import defaultImage from '../../images/no-image.png';
import { RiArrowRightSLine } from 'react-icons/ri';
import Slider from "react-slick";
import Category1 from '../../components/category-elektronik';
import Category2 from '../../components/category-prabotan';
import Category3 from '../../components/category-olahraga';
import Category4 from '../../components/category-camping';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector(({listPost}) => listPost);
  const [list, updateList]    = useState(null);
  const [limit, updateLimit]  = useState(8);
  const [loading, setLoading] = useState(false);
  const [skeletonCard] = useState([1,2,3,4,5,6,7,8,9,10,11,12]);

  const toRupiah = (money) => {
    return new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR", minimumFractionDigits: 0}).format(money);
  }

  const nameProduct = (name) => {
    if(name.length > 22) {
      return `${name.slice(0, 22)}...`;
    }else{
      return name
    }
  }

  // const searchFilter = (e, filter) => {

  //   for(let i=0; i < filter.length)
  //   if(filter){

  //   }

  // }

  const settings = {
    dots: false,
    infinite: false,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5
  };

  useEffect(() => {
    dispatch(allStore.fetchPost())
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    updateList(data);
  },[data])

const handleLoad = () => {

  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    updateLimit(limit + 8);
    // window.scrollTo(0,document.body.scrollHeight);
  }, 500);
}

if (list === null) return (<>
<Navbar/>
<div className="c-home">
<div className="page-home">
  <div className='page-carousel'>
    <div className='card-loading loading'></div>
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


 

if( list.length <= limit ){
  return (<>
    <Navbar/>
<div className="c-home">
<div className="page-home">
  <div className='page-carousel'>
    <div className='card-loading loading'></div>
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
  </div>
  </>)
}


const load = document.getElementById("load");

if( list.data.length <= limit ){
   load.style.display = "none";
}


const sortList = list.data.sort((a, b) => b.ID - a.ID);

const filter = sortList.filter((el, i) => i  < limit);


const popular = list.data.filter((el, i) => i > 10 && i < 20);

  return (
    <>
    <Navbar/>
    <div className="c-home">
      <div className="page-home">
      <Fade  in={true}
              style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 1000 } : {})}
              >
        <div className='page-carousel'>
          {/* <Carousel fade>
          <Carousel.Item interval={5000}> */}
            <img
              className="d-block w-100"
              src={banner}
              alt="First slide"
            />
          {/* </Carousel.Item>
        </Carousel> */}
        </div>
        </Fade>

        <div className='c-all mt-5'>
          <div className='p-all'>
            <h6>KATEGORI PILIHAN</h6>
            <div className='c-box'>
                <Category1 />
                <Category2 />
                <Category3 /> 
                <Category4 />  
            </div>
          </div>
        </div>

        <div className='c-kategori mt-5'>
          <div className='h-category'>
            <h6>BARANG POPULER</h6>
          </div>
          <div className='p-kategori'>
          <Slider {...settings}>
            {popular.map((elm, i) => 
          <div className='c-img-kat' onClick={() => navigate(`/detail/${elm.ID}`)} id={'bp'+i} key={i}>
            <div className='img-kat'>
              <img src={elm.Url} alt={elm.ID} />
            </div>
            <div className='text-kat'>
                  <p>{toRupiah(elm.Price)}</p>
                  <p>{nameProduct(elm.Name)}</p>
                  <p>{elm.City_Name}</p>
                </div>
          </div>
          )}
          
        </Slider>
          </div>
        </div>

       

        <div className="page-list">
          <h6>SEMUA KATEGORI</h6>
          <div className="card-home">
          
            {filter.map((el, i) => 
              <Fade  in={true} key={i}
              style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 1000 } : {})}
              >
              <div className="cards" loading="lazy" onClick={() => navigate(`/detail/${el.ID}`)} id={i}>
                <div className='img-products'
                  style={{ 
                    display : "flex",
                    justifyContent : "center",
                   }}
                >
              <img id={i} src={el.Url} onError={(e)=>{e.target.onerror = null; e.target.src=defaultImage}} alt={el.Url} />
                </div>
                <div className='name-product'>
                  <p>{toRupiah(el.Price)}</p>
                  <p>{nameProduct(el.Name)}</p>
                  <p>{el.City_Name}</p>
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
            {!loading && <div className="load" ><Button  id="muat" onClick={() => handleLoad()} className='btn-load'>Muat lainnya...</Button></div>}
          </div>    
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Home;
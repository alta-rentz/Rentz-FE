import { FaCheckCircle, FaUserCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import addWeeks from 'date-fns/addWeeks';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import Box from '@mui/material/Box';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './detail.scss';
import Fade from '@mui/material/Fade';
import AddCart from '../add-cart';
import CheckLogin from '../../components/checkLogin';
import CheckLoginPhone from '../../components/checkloginphone';
import { ImPhone } from 'react-icons/im'

const Detail = () => {
  const date = new Date();
  const [value, setValue] = useState([date, date]);
  const [lat, updateLat] = useState(0);
  const [long, updateLong] = useState(0);
  const [isLogin, updateLogin] = useState(false);
  const [detail, updateDetail] = useState(null);
  const [isPhone, setIsPhone] = useState(false);
  const getToken = localStorage.getItem("token");
  let locationPathName = window.location.pathname;
  let pathName = locationPathName.substring(locationPathName.lastIndexOf('/') + 1);

  function getWeeksAfter(date, amount) {
    return date ? addWeeks(date, amount) : undefined;
  }

  console.log(detail);

  useEffect(() => {
    axios.get(`https://rentz-id.site/products/${pathName}`)
    .then(({data}) => {
      updateDetail(data.data);
      updateLat(data.data.Latitude);
      updateLong(data.data.Longitude);
      window.scrollTo(0,0);
    })

  },[updateDetail])

  useEffect(() => {
    if(getToken){
      updateLogin(true);
      setIsPhone(true);
    }
  },[getToken])
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  if(detail === null) {
    return (<div style={{ height : "100vh" }}></div>)
  }
  return (
    <>
     <Fade  in={true}
              style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 500 } : {})}
              >
    <div className='c-detail'>
      <div className='page-detail'>
        <div className='page-one'>
          <div className='img-detail'>
          <Slider {...settings}>
          {detail.Url.map((el, i) => 
          <div className='in-image' key={i}>
            <img src={el} alt="i" width="70%" height="100%" />
          </div>
          )}
        </Slider>
          </div>
          <div className='info-detail'>
            <h5>Detail</h5>
            <p>{detail.Description}</p>
          </div>
          <div className='info-desc'>
          <h5>Deskripsi</h5>
          <p>Persyaratan untuk merental produk ini :</p>
          <p>
            {detail.Guarantee.map((el, i) => 
            <span key={i}>
             {` ${el} / `} 
            </span>
            )}
          </p>
          </div>
        </div>
        <div className='page-two'>
          <div className='available-info'>
            <h5><FaCheckCircle /> Tersedia untuk di rental {detail.Stock} buah</h5>
          </div>
          <div className='in-date'>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                disablePast
                value={value}
                maxDate={getWeeksAfter(value[0], 2)}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              />
              </LocalizationProvider>
          </div>
          <div className='rent-info'>
            <div className='c-one'>
              <h4>Rp.{detail.Price} / hari</h4>
              <p>{detail.Name}</p>
              <p>Medan, Sumatra Utara, Indonesia</p>
            </div>
            <div className='c-two'>
              {isLogin && < AddCart/>}
              {!isLogin && <CheckLogin />}  
              
            </div>
          </div>
          <div className='desc-user'>
            <h5>Deskripsi Pemilik</h5>
            <div className='info-user'>
              <FaUserCircle size="60px" style={{ color : "grey" }}/>
              <div className='text-user'>
                <p>{detail.Nama}</p>
                <p><i>Bergabung sejak Jan 2020</i></p>
                {isPhone && <p><ImPhone/> {detail.Phone_Number}</p>}
                {!isPhone && <p><ImPhone/> 08**-****-**** <span className='show-phone' ><u>< CheckLoginPhone/></u></span></p> }
                
                <p></p>
              </div>
            </div>
          </div>
          <div className='map-info'>
            <h5>Lokasi Pemilik</h5>
            <iframe title="maps" src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d9488.49773320645!2d${long}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1638703519135!5m2!1sen!2sid`} width="100%" height="250" style={{ border : "1px solid #d6d5d5", borderRadius : "8px" }} loading="lazy"></iframe>
          </div>
        </div>

      </div>
   
    </div>
    </Fade>
    </>
  )
}

export default Detail;
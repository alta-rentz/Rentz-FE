import './home.scss';
import { Dropdown, Button, Spinner } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from 'react';
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [list, updateList]    = useState(null);
  const [limit, updateLimit]  = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
 
  axios.get('https://jsonplaceholder.typicode.com/albums')
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

const data = list.filter((el, i) => i  < limit);

const load = document.getElementById("load");

if( list.length === limit ){
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
              <div className="cards" loading="lazy" onClick={() => navigate(`/detail/${el.id}`)} >
                <img src="data:image/jpeg;base64,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alHEYasFccDofA75sMMcpKHd3eanZ6bPSfXeifsqwaAGvnrvtJLFE/lVCDbxJnL/AGhdT/YMtagpFI2A2n2baDKSdcjbr79Pdu0cNjKQUljfI9g9tqkd1x+f95HqUSDkfQ2urbmB334fW2bChVvcEWOwg/WyWillGTLnp3vkvZkPFHOzwOko07gjQi0tm3GDDaI6v/oqdioP5W0PiDMbdEvfVHHk1vUw1rWgS9RJv+WsNcp8W0+JsJjSiCbL2zy7g/E+w+Cwn6YadMki3eOijdzY8hx46Tf0aYRVQbALfvMGFw4S5Jux2m1tBsVRuUcIxFewNt3z/b63wy1vStW7m27sj5t+kjIPh85O6PwD1WLKjPa+VVVmZ2Gpsqgk22mw0FuIl1TAV10/w1dQPepONeJuslVFpUrm5/vJl7SKzlT2gVPAgj5yv+KTewHmIgkWi0wrik99fUTKlZDsYes0KiK2yTsH0dUqkezpVHv7iO3xA0nadAfZtVqENih7JLglAQXfl2dEHO9+Q2zNojfZV1carWGKdSKVIn2ZP36g004hdt+NhuM+0SPhMKlNFp01CIgAVQLAAbAJImQiIgIiICIiAiIgUlYiAmHE4dXRkdQyMCGUi4IO0ETNED471w6hNSJq0MzJxAzPTHBhtdOe0b/ePEsWTviw3MNVPO+7znpe053pjqlh6+Zgvs3N7umwniybG5nQ85ZR8TwyI7BajAJvJXOB5WMm0+g0bNkqoAFLaO66Lt7Aa49JtOkupWIps2bCs6i9nwzggjdekSGB5WPiZp36IcaFMWvJsO//AOZdGHGdDogBYo7Z2UqWLuuQ2uwJIF5gaoFGtgJPpdCVGNloYx/CiyD/AJFdJtcF1IxzkZcOtEe/VYFh8Sw8hLo5eo533Uc9GPgPujmfIb5M6A6tYjHMBSS1IGzVDcIOIB3nwuZ9I6F+zKipD4pzWYW7AutPT3vvP52HKd7RoqihVAVVFgqgAADYABsElo03Vrq1SwdMKgu1gGe1id9gPurfW3qTN9aViZFLSw0wdoHoJkiBj9ivur6CVCAbABL4gUtKxEBERAREQEREBERAREQEREBERAREQKSsRAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERA/9k=" alt={el.id} loading="lazy" width="238px" height="200px" />
                <div className='name-product'>
                  <p>Kamera Canon</p>
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
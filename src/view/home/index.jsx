import './home.scss';
import { Dropdown, Button } from 'react-bootstrap';

const Home = () => {
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

            <Dropdown.Menu  align="end">
              <Dropdown.Item href="#/action-1">Elektronik</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Non Elektronik</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Furnitur</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="page-list">
          <h6>Semua Kategori</h6>
          <div className="card-home">
            <div className="cards"></div>
            <div className="cards"></div>
            <div className="cards"></div>
            <div className="cards"></div>
            <div className="cards"></div>
            <div className="cards"></div>
            <div className="cards"></div>
            <div className="cards"></div>
            <div className="cards"></div>
            <div className="cards"></div>
          </div>
          <div className="load"><Button variant="outline-primary">Muat Lainnya..</Button></div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home;
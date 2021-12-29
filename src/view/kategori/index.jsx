import './kategori.scss';
import Navbar from '../../components/navbar';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import allStore from "../../store/actions";
import Fade from '@mui/material/Fade';
import defaultImage from '../../images/no-image.png';

const Kategori = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [list, updateList] = useState(null);
  const data = useSelector(({listPost}) => listPost);
  let locationPathName = window.location.pathname;
  let pathName = locationPathName.substring(locationPathName.lastIndexOf('/') + 1);

  useEffect(() => {
    dispatch(allStore.fetchPost())
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    updateList(data);
  },[data]);

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
  
  if (data.data === undefined ) {return (<>
    <div></div>
  </>)}

// if (list === null) {return (<>
//   <div></div>
// </>)}

  // if (list.data.filter === undefined ){return <></>}

  const filter = data.data.filter((el) => el.SubcategoryID === +pathName);

  // if (filters === undefined ){return <></>}

  return (<>
  <Navbar/>
    <div className='c-ks'>
      <div className='page-ks'>
      <div className="page-list">
          <h6>SEMUA {filter[0].Subcategory_Name.toUpperCase()}</h6>
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
        </div>
      </div>
    </div>
  
  </>)
}

export default Kategori;
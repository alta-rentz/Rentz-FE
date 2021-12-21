import './rent.scss';
import { useState, useEffect } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { Form, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Rent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [nameProduct, nameProductUpdate] = useState("");
  const [price, priceUpdate] = useState("");
  const [stock, stockUpdate] = useState("");
  const [guarantee, guaranteeUpdate] = useState([]);
  const [city, cityUpdate] = useState("");
  const [category, categoryUpdate] = useState("");
  const [desc, descUpdate] = useState("");
  const [photo, photoUpdate] = useState([]);
  const [alertName, setAlertName] = useState(false);
  const [alertName2, setAlertName2] = useState(false);
  const [alertPrice, setAlertPrice] = useState(false);
  const [alertStock, setAlertStock] = useState(false);
  const [alertGuarantee, setAlertGuarantee] = useState(false);
  const [alertCity, setAlertCity] = useState(false);
  const [alertCategory, setAlertCategory] = useState(false);
  const [alertDesc, setAlertDesc] = useState(false);
  const [alertPhoto, setAlertPhoto] = useState(false);
  const [alertPhoto2, setAlertPhoto2] = useState(false);
  const [alertPhoto3, setAlertPhoto3] = useState(false);
  const [alertPhoto4, setAlertPhoto4] = useState(false);
  const [token, tokenUpdate] = useState("");
  const trim = nameProduct.trim();
  const indexOf = nameProduct.indexOf(trim[0]);
  const sliceName = nameProduct.slice(0, indexOf);
  // const trimDesc = desc.trim();
  // const indexOfDesc = desc.indexOf(trimDesc[0]);
  // const sliceDesc = desc.slice(0, indexOfDesc);

  useEffect(() => {
    tokenUpdate(localStorage.getItem("token"));
  }, [token]);

  const headers = {
    "Authorization": 'Bearer ' + token
};

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)

    setAlertPhoto(false)
      setAlertPhoto2(false)
      setAlertPhoto3(false)

    if(nameProduct === ""){
      setAlertName(true)
      setLoading(false)
      setAlertName2(false)
    }else{
      setAlertName(false)
    }

    if(sliceName) {
      setAlertName2(true)
      setLoading(false)
      document.getElementById("name_product").value = "";
      nameProductUpdate("")
    }else{
      setAlertName2(false)
    }

    if(price === ""){
      setAlertPrice(true)
      setLoading(false)
    }else{
      setAlertPrice(false)
    }

    if(stock === ""){
      setAlertStock(true)
      setLoading(false)
    }else{
      setAlertStock(false)
    }

    if(guarantee.length === 0){
      setAlertGuarantee(true)
      setLoading(false)
    }

    if(city === ""){
      setAlertCity(true)
      setLoading(false)
    }else{
      setAlertCity(false)
    }

    if(category === ""){
      setAlertCategory(true)
      setLoading(false)
    }else{
      setAlertCategory(false)
    }

    if(desc === ""){
      setAlertDesc(true)
      setLoading(false)
    }else{
      setAlertDesc(false)
    }

    if(photo.length === 0){
      setAlertPhoto4(true)
      setLoading(false)
    }

    const formData = new FormData();
    formData.append("name" , nameProduct.trim())
    formData.append("subcategory_id" , category)
    formData.append("city_id" , city)
    formData.append("price" , price)
    formData.append("description" , desc.trim())
    formData.append("stock" , stock)
    guarantee.map((el) => 
    formData.append("guarantee" , el)
    )
    photo.map((el) => 
    formData.append("photos" , el)
    )
    
    if(photo.length > 0){

      if(desc.length > 0){

    axios.post('https://rentz-id.site/jwt/products', formData,{headers: headers} )
    .then(({data}) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: "Tambah produk rental sukses",
        showConfirmButton: false,
        timer: 1500
      }).then(()=> {
        navigate('/produk')
      })
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });
    
     }
   }
  }

  const handlePhoto = (e) => {

     if (e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/jpg" || e.target.files[0].type === "image/png"){
      setAlertPhoto4(false)
        if(photo.length > 4) {
          setAlertPhoto2(true)
        }else{
        if( e.target.files[0].size > 1000000 ) {
          setAlertPhoto3(true)
        }else{
      photoUpdate([...photo, ...e.target.files]);
      setAlertPhoto(false)
      setAlertPhoto2(false)
      setAlertPhoto3(false)
        }
      }
    }else{
      setAlertPhoto(true)
    }
    
  }

  const handleRemove = (i) => {
    photo.splice(i, 1);
    photoUpdate([...photo]);
    setAlertPhoto2(false);
  }

  const handleCheck = (e) => {
    if(e.target.checked){
      guaranteeUpdate([...guarantee, e.target.value]);
    }

    if(!e.target.checked){
    const index = guarantee.indexOf(e.target.value);
      if(index > -1){
        guarantee.splice(index, 1);
      }
      guaranteeUpdate(guarantee);
    }

      setAlertGuarantee(false)
  }

  return(
    <>
    <div className='c-rent'>
      <div className='page-rent'>
        <h5><MdAddCircleOutline style={{ color : "green" }} /> Tambah Data Produk</h5>
        <Form  className='form-rent' onSubmit={(e) => handleSubmit(e)}>
          <div className='form-one'>
          <div className='form-left'>
        <Form.Group  >
          <Form.Control id="name_product" className="p-3 b-bottom-signup" type="text" placeholder="Nama Produk *"
            onChange={(e) =>  {nameProductUpdate(e.target.value); setAlertName(false); setAlertName2(false)}}
          />
           {alertName && <p className='alerts'>Nama produk tidak boleh kosong.</p>}
          {!alertName && <></>}
          {alertName2 && <p className='alerts'>Format nama tidak sesuai.</p>}
          {!alertName2 && <></>}
        </Form.Group>  
       
        <Form.Group >
          <Form.Control id="price_product" className="p-3" type="number" placeholder="Harga Rental *" 
            onChange={(e) => priceUpdate(e.target.value) } 
          />
          {alertPrice && <p className='alerts'>Harga rental tidak boleh kosong.</p>}
          {!alertPrice && <></>}
        </Form.Group>
        <Form.Group >
          <Form.Control id="stock_product" className="p-3" type="number" placeholder="Stok Produk *" 
            onChange={(e) => stockUpdate(e.target.value) }
          />
          {alertStock && <p className='alerts'>Stok produk tidak boleh kosong.</p>}
          {!alertStock && <></>}
        </Form.Group>

        <Form.Group className=" mb-4" >
        <Form.Label className='label-jaminan' >Pilih jaminan produk *</Form.Label>
        <Form.Check
        inline
        label="KTP"
        value= "1"
        type="checkbox"
        id="1"
        onClick={(e) => handleCheck(e)}
      />
       <Form.Check
        inline
        label="SIM"
        value="2"
        type="checkbox"
        id="2"
        onClick={(e) => handleCheck(e)}
      />
          {alertGuarantee && <div className='alerts'>Jaminan tidak boleh kosong.</div>}
          {!alertGuarantee && <></>}
        </Form.Group>

        <Form.Group className=" mb-4 photo" >
          <Form.Label className='label-foto'>Pilih foto produk *</Form.Label>
          <Form.Control id="photo_product" className="mb-1 p-3 input-foto" type="file" 
             onChange={(e) => handlePhoto(e) }
          />
           
          <div className='name-photos'>
          {photo.map((el, i) =>
          <div className='in-name' key={i}>
          <p >{el.name}</p>
          <p className='remove' onClick={() => handleRemove(i)}>x</p>
              </div>
             )} 
             </div>
         
          {alertPhoto && <div className='alerts' >Format foto hanya jpeg, jpg, dan png.</div>}
          {!alertPhoto && <></>}
          {alertPhoto2 && <div className='alerts' >Foto tidak lebih dari 5 foto.</div>}
          {!alertPhoto2 && <></>}
          {alertPhoto3 && <div className='alerts' >Ukuran foto tidak lebih dari 1MB.</div>}
          {!alertPhoto3 && <></>}
          {alertPhoto4 && <div className='alerts' >Foto tidak boleh kosong.</div>}
          {!alertPhoto4 && <></>}
        </Form.Group>

        </div>
        <div className="form-right">
        <Form.Group className=" mb-4" >
          <Form.Select className="mb-1 p-3" onChange={(e) => cityUpdate(e.target.value)}>
            <option style={{ backgroundColor : "#b4b4b4" }} >Kota pemilik *</option>
            <option value="3273">Kota Bandung</option>
          </Form.Select>
          {alertCity && <div className='alerts'>Kota tidak boleh kosong.</div>}
          {!alertCity && <></>}
        </Form.Group>

        <Form.Group className=" mb-4" >
        <Form.Select className="mb-1 p-3" onChange={(e) => categoryUpdate(e.target.value)}>
            <option style={{ backgroundColor : "#b4b4b4" }} >Kategori produk *</option>
            <option value="311">Lain-lain</option>
          </Form.Select>
          {alertCategory && <div className='alerts'>Kategori tidak boleh kosong.</div>}
          {!alertCategory && <></>}
        </Form.Group>

        <Form.Group className=" mb-4" >
          <Form.Control id="desc_product" className="mb-1 p-3 "  as="textarea"  placeholder="Deskripsi Produk *" 
            onChange={(e) => descUpdate(e.target.value.trim()) }
          />
          {alertDesc && <div className='alerts'>Deskripsi tidak boleh kosong.</div>}
          {!alertDesc && <></>}
        </Form.Group>

        </div>
        </div>
        
         <button className=" mb-1 p-2 btn-submit-addProduct " type="submit">
          {loading && <Spinner animation="border" variant="light" />}
          {!loading && <span>Tambahkan</span>}
        </button>
        <button className=" mb-1 p-2 btn-cancel-addProduct" onClick={() => navigate('/produk')} >
          Batalkan
        </button>
        </Form>
      </div>
    </div>
    </>
  )
}

export default Rent;
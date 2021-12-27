import { Modal, Button } from 'react-bootstrap';
import './add-cart.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiShoppingCart } from 'react-icons/ti';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddCart = (data) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [done, updateDone] = useState(false);
  const [cart, setCart] = useState(null)
  let locationPathName = window.location.pathname;
  let pathName = locationPathName.substring(locationPathName.lastIndexOf('/') + 1);

  const toRupiah = (money) => {
    return new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR", minimumFractionDigits: 0}).format(money);
  }

const headers = {
  "Content-type": "application/json; charset=UTF-8",
  "Authorization": 'Bearer ' + localStorage.getItem("token")
};

useEffect(() => {
   
  axios.get('https://rentz-id.site/jwt/cart', {headers : headers} )
  .then(({data}) => {
    setCart(data.data)
  }).catch((err) => {
    
  })


},[])



  const objInput = {
    "product_id" : +pathName,
    "time_in" : data.time_in,
    "time_out" : data.time_out,
    "qty" : 1
  }

  const handleAddData = () => {

      axios.post(`https://rentz-id.site/jwt/booking`,objInput, {headers: headers} )
      .then(({data}) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Tambahkan ke keranjang berhasil",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate(`/detail/${pathName}`);
          updateDone(true)
          handleClose(false)
        });
        
      }).catch((err) => {
        console.log(err.response.data.message);
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: err.response.data.message,
          showConfirmButton: true,
          timer: 1500
        }).then(() => {
          handleClose(false)
        })
      })
  }

  if(cart === null){return (<>
    <Button onClick={handleShow} id="rent-cartNull">
      Rental
    </Button>

    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header closeButton>
      <Modal.Title><TiShoppingCart size="25px"/>Tambahkan ke keranjang </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div className='body-one'>
          <p>Nama Produk</p>
          <p>Harga</p>
          <p>Jumlah Hari</p>
        </div>
        <div className='body-two'>
        <p>{data.name_product}</p>
        <p>{toRupiah(data.price)}</p>
        <p>x {data.amountDay} Hari</p>
        </div>
    </Modal.Body>
    <Modal.Footer>
        <p>Total Harga</p> 
      <p>{toRupiah(data.price*data.amountDay)}</p>
        <Button className='form-control' id="add-cart" variant="success" onClick={() => handleAddData()}>Tambahkan</Button>
    </Modal.Footer>
  </Modal>
</>)}


  const handleAdd = () => {

    if(cart.length > 5){
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: 'Keranjang kamu melebihi kapasitas',
        showConfirmButton: true,
      }).then(() => {
        handleClose(false)
      })
    }else{
      axios.post(`https://rentz-id.site/jwt/booking`,objInput, {headers: headers} )
      .then(({data}) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Tambahkan ke keranjang berhasil",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate(`/detail/${pathName}`);
          updateDone(true)
          handleClose(false)
        });
        
      }).catch((err) => {
        console.log(err.response.data.message);
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: err.response.data.message,
          showConfirmButton: true,
          timer: 1500
        }).then(() => {
          handleClose(false)
        })
      })
    }
  }

  return (
    <>
      <Button onClick={handleShow} id="rent">
        Rental
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><TiShoppingCart size="25px"/>Tambahkan ke keranjang </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='body-one'>
              <p>Nama Produk</p>
              <p>Harga</p>
              <p>Jumlah Hari</p>
            </div>
            <div className='body-two'>
            <p>{data.name_product}</p>
            <p>{toRupiah(data.price)}</p>
            <p>x {data.amountDay} Hari</p>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <p>Total Harga</p> 
          <p>{toRupiah(data.price*data.amountDay)}</p>
            <Button className='form-control' variant="success" onClick={() => handleAdd()}>Tambahkan</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddCart;
import { Modal, Button } from 'react-bootstrap';
import './add-cart.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiShoppingCart } from 'react-icons/ti';
import axios from 'axios';
import Swal from 'sweetalert2';
import Detail from '../detail';

const AddCart = (data) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [done, updateDone] = useState(false);
  let locationPathName = window.location.pathname;
  let pathName = locationPathName.substring(locationPathName.lastIndexOf('/') + 1);

console.log(data);

const headers = {
  "Content-type": "application/json; charset=UTF-8",
  "Authorization": 'Bearer ' + localStorage.getItem("token")
};

  const objInput = {
    "product_id" : +pathName,
    "time_in" : data.time_in,
    "time_out" : data.time_out,
    "qty" : 1
  }

  console.log(objInput);

  const handleAdd = () => {
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

  

  return (
    <>
      {/* <div className='d-none'>
      {done && <Detail d={true} />}
      {!done && <></>}
      </div> */}
      
      <Button onClick={handleShow}>
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
            <p>Rp.{data.price}</p>
            <p>x {data.amountDay} Hari</p>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <p>Total Harga</p> 
          <p>Rp. {data.price*data.amountDay}</p>
            <Button className='form-control' variant="success" onClick={() => handleAdd()}>Tambahkan</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddCart;
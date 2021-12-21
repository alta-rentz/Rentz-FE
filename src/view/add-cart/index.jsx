import { Modal, Button } from 'react-bootstrap';
import './add-cart.scss';
import { useState } from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddCart = (data) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
console.log(data);

  const objInput = {
    "product_id" : data.product_id,
    "time_in" : data.time_in,
    "time_out" : data.time_out,
    "qty" : data.qty
  }

  console.log(objInput);

  const handleAdd = () => {
    axios.post(`https://rentz-id.site/booking`, {
      "product_id" : data.product_id,
      "time_in" : data.time_in,
      "time_out" : data.time_out,
      "qty" : data.qty
    })
    .then(({data}) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: "Tambahkan ke keranjang berhasil",
        showConfirmButton: false,
        timer: 1500
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <>
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
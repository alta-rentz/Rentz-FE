import './rent.scss';
import { MdAddCircleOutline } from 'react-icons/md';
import { Form, Spinner } from 'react-bootstrap';

const Rent = () => {
  return(
    <>
    <div className='c-rent'>
      <div className='page-rent'>
        <h5><MdAddCircleOutline style={{ color : "green" }} /> Input Data Produk</h5>
        <Form  className='form-rent'>
          
          <div className='form-one'>
          <div className='form-left'>
        <Form.Group  >
          <Form.Control id="name" className="p-3 b-bottom-signup" type="text" placeholder="Nama Produk"
            // onChange={(e) => userUpdate(e.target.value) }
          />
        </Form.Group>  
        <Form.Group >
          <Form.Control id="email" className="p-3 b-mid-signup " type="email" placeholder="Harga Produk" 
            // onChange={(e) => emailUpdate(e.target.value) } 
          />
        </Form.Group>
        <Form.Group >
          <Form.Control id="phone" className="p-3 b-mid-signup" type="number" placeholder="Stok Produk" 
            // onChange={(e) => phoneUpdate(e.target.value) }
          />
        </Form.Group>
        <Form.Group className=" mb-4" >
          <Form.Label>Pilih foto produk</Form.Label>
          <Form.Control id="file" className="mb-1 p-3 b-top-signup" type="file" placeholder="" 
            // onChange={(e) => passwordUpdate(e.target.value) }
          />
        </Form.Group>

        </div>
        <div className="form-right">
        <Form.Group className=" mb-4" >
          <Form.Control id="password" className="mb-1 p-3 b-top-signup" type="password" placeholder="Kota Pemilik Produk" 
            // onChange={(e) => passwordUpdate(e.target.value) }
          />
        </Form.Group>

        <Form.Group className=" mb-4" >
          <Form.Control id="password" className="mb-1 p-3 b-top-signup" type="password" placeholder="Kategori Produk" 
            // onChange={(e) => passwordUpdate(e.target.value) }
          />
        </Form.Group>

        <Form.Group className=" mb-4" >
          <Form.Control id="password" className="mb-1 p-3 b-top-signup"  as="textarea"  placeholder="Deskripsi Produk" 
            // onChange={(e) => passwordUpdate(e.target.value) }
          />
        </Form.Group>

        </div>
        </div>
        
         <button className=" mb-1 p-2 btn-submit " type="submit">
          {/* {loading && <Spinner animation="border" variant="light" />}
          {!loading && <span>Daftar</span>} */}
          Tambahkan
        </button>
        </Form>
      </div>
    </div>
    </>
  )
}

export default Rent;
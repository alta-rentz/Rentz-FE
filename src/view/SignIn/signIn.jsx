import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Spinner } from 'react-bootstrap';
import brand from '../../images/logo.png';
import axios from 'axios';
import Swal from 'sweetalert2';

function SignIn() {
  const navigate = useNavigate();
  const [email, emailUpdate]         = useState("");
  const [password, passwordUpdate]   = useState("");
  const [loading, setLoading]        = useState(false);
  const arrEmail = email.split("");
  const checkEmail = arrEmail.find((el) => el === "@");
  const checkEmail2 = arrEmail.find((el) => el === ".");
  let locationPathName = window.location.pathname;
  let pathName = locationPathName.substring(locationPathName.lastIndexOf('/') + 1);

  const handleSubmit =  (e) => { 
    e.preventDefault();
    setLoading(true);
      if (email.length === 0 || !checkEmail || !checkEmail2) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: 'Email harus berisi format email',
        }).then(() => { setLoading(false); })
      
      }else {
    if (password.length === 0 ) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      text: 'Kata sandi tidak boleh kosong',
    }).then(() => { setLoading(false); })
    }else {
               const objLogin = {
                  "email": email,
                  "password": password
                }

                 axios.post('https://rentz-id.site/signin', objLogin )
                .then(({data}) => {
                  localStorage.setItem("token", data.data.Token);
                  localStorage.setItem("userId", data.data.ID);
                  localStorage.setItem("userName", data.data.Nama);
                  localStorage.setItem("email", data.data.Email);
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: "Anda telah login",
                    showConfirmButton: false,
                    timer: 1500
                  }).then((result) => {
                    if(locationPathName === `/masuk/${pathName}`){
                      navigate(`/detail/${pathName}`)
                    }else{
                      navigate('/')
                    }
                  })
                }).catch((err)=>{
                  
                  Swal.fire({
                    icon: 'error',
                    text: 'Email / Kata sandi salah'
                  }).then(() => { setLoading(false);})
                }).finally(() => {
                  setLoading(false);
                });
              
           }  
         } 
      }
      
  

  return (<>
    <div className="c-register">
      <div className="page-reg">
        <div className="p1-reg">
          <img src={brand} alt="logo" width={400}  style={{ cursor : "pointer" }} onClick={() => navigate('/')}/>
          <h4>Solusi untuk barang kamu yang tidak terpakai</h4>
        </div>
          <div className="p2-reg">
              <Form   onSubmit={(e) => handleSubmit(e)}>
              <h5>Masuk</h5>
              <Form.Group >
                <Form.Control id="email" className="p-2 b-mid-signup " type="email" placeholder="Email" 
                  autoComplete="none"
                  onChange={(e) => emailUpdate(e.target.value) }
                />
              </Form.Group>
              <Form.Group className=" mb-4" >
                <Form.Control  id="password" className="mb-1 p-2 b-top-signup" type="password" placeholder="Kata Sandi" 
                  onChange={(e) => passwordUpdate(e.target.value) }
                  
                />
              </Form.Group>
              
              <button id="btn-masuk" className=" mb-1 p-2 btn-submit" type="submit">
                {loading && <Spinner animation="border" variant="light" />}
                {!loading && <span>Masuk</span>}
              </button>
              <div className="f-form">
              <span>Pengguna baru RentzID ? </span><p className="href" onClick={() => navigate('/daftar')}>Daftar</p>
            </div>
              </Form>
            </div>
          </div>
      </div>
      <div className="cf-reglog">
        <div className="f-reglog">
          <span>© Rentz.ID 2022 Hak Cipta Dilindungi </span><span>|</span><span>Rentz.ID Care </span>
        </div>
    </div>
  </>);
}

export default SignIn;
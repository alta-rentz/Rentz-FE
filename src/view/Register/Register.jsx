import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import brand from '../../images/logo.png';
import "./Register.scss";

function Register() {
  const navigate = useNavigate();
  const [userName, userUpdate]       = useState("");
  const [email, emailUpdate]         = useState("");
  const [phone, phoneUpdate]         = useState("");
  const [password, passwordUpdate]   = useState("");
  const [loading, setLoading]        = useState(false);
  const arrEmail = email.split("");
  const arrPassword = password.split("");
  const checkEmail = arrEmail.find((el) => el === "@");
  const checkEmail2 = arrEmail.find((el) => el === ".");
  const checkPassword = arrPassword.find((el) => el === " ");
  const trim = userName.trim();
  const indexOf = userName.indexOf(trim[0]);
  const sliceName = userName.slice(0, indexOf);
  let locationPathName = window.location.pathname;
  let pathName = locationPathName.substring(locationPathName.lastIndexOf('/') + 1);

   const handleSubmit =  (e) => { 
    e.preventDefault();
    setLoading(true);
      if (userName.length === 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: 'Nama tidak boleh kosong',
      }).then(() => { setLoading(false);})
    }else{
      if (userName === " " || sliceName ) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: 'Format nama tidak sesuai',
        }).then(() => { setLoading(false);})
      }else{
      if ( !checkEmail || !checkEmail2 || email.length === 0) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: 'Email harus berisi format email',
        }).then(() => { setLoading(false); })
      
      }else {
      if (phone.length === 0 ) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: 'Nomor HP tidak boleh kosong',
        }).then(() => { setLoading(false); })
      }else{
        if ( phone.length < 11 || phone[0] !== "0" || phone[1] !== "8") {
          Swal.fire({
            position: 'center',
            icon: 'error',
            text: 'Nomor HP tidak sesuai',
          }).then(() => { setLoading(false); })
      }else{
        if (password.length === 0 ) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            text: 'Kata sandi tidak boleh kosong',
          }).then(() => { setLoading(false); })
      }else {
      if (checkPassword ) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: 'Kata sandi tidak boleh ada karakter spasi',
      }).then(() => { setLoading(false); })
    }else {
      if (password.length < 5 ) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: 'Kata sandi tidak boleh kurang dari 5 karakter',
        }).then(() => { setLoading(false); })
      }else {
            const objInput = {
              "nama": userName.trim(),
              "email": email.trim(),
              "phone": phone,
              "password": password
            }
       axios.post("https://rentz-id.site/signup",objInput)
       .then(() => {
                const objLogin = {
                  "email": email,
                  "password": password
                }

                return axios.post('https://rentz-id.site/signin', objLogin )
                .then(({data}) => {
                  localStorage.setItem("token", data.data.Token);
                  localStorage.setItem("userId", data.data.ID);
                  localStorage.setItem("userName", data.data.Nama);
                  localStorage.setItem("email", data.data.Email);
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: "Daftar akun berhasil",
                    showConfirmButton: false,
                    timer: 1500
                  }).then((result) => {
                    if(locationPathName === `/daftar/${pathName}`){
                      navigate(`/detail/${pathName}`)
                    }else{
                      navigate('/')
                    }
                  })
                })

              }).catch((err)=>{
                console.log(err.response);
              Swal.fire({
                icon: 'error',
                text: "Email atau No.Telepon sudah terdaftar"
              }).then(() => { setLoading(false);})
            }).finally(() => {
              setLoading(false);
            });

          }
          }
          }
        }  
        } 
      }
      }
    }  
  }

  return (<>
    <div className="c-register">
      <div className="page-reg">
        <div className="p1-reg">
          <img src={brand} alt="logo" width={400} style={{ cursor : "pointer" }}  onClick={() => navigate('/')}/>
          <h4>Solusi untuk barang kamu yang tidak terpakai</h4>
        </div>
          <div className="p2-reg">
            <Form  onSubmit={(e) => handleSubmit(e)}>
            <h5>Daftar</h5>

            <Form.Group  >
              <Form.Control id="name" className="p-2 b-bottom-signup" type="text" placeholder="Nama"
                autoComplete="none"
                onChange={(e) => userUpdate(e.target.value) }
              />
            </Form.Group>  
            <Form.Group >
              <Form.Control id="email" className="p-2 b-mid-signup " type="email" placeholder="Email"
                autoComplete="none" 
                onChange={(e) => emailUpdate(e.target.value) } 
              />
            </Form.Group>
            <Form.Group >
              <Form.Control id="phone" className="p-2 b-mid-signup" type="number" placeholder="No. telepon" 
                autoComplete="none"
                onChange={(e) => phoneUpdate(e.target.value) }
              />
            </Form.Group>
            <Form.Group className=" mb-4" >
              <Form.Control id="password" className="mb-1 p-2 b-top-signup" type="password" placeholder="Kata Sandi" 
                onChange={(e) => passwordUpdate(e.target.value) }
              />
            </Form.Group>
            
            <button id="btn-daftar" className=" mb-1 p-2 btn-submit" type="submit">
              {loading && <Spinner animation="border" variant="light" />}
              {!loading && <span>Daftar</span>}
            </button>
            <div className="f-form">
              <span>Sudah punya akun ? </span><p className="href" onClick={() => navigate('/masuk')}>Masuk</p>
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

export default Register;
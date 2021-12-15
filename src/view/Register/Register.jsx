import { useState } from "react";
import "./Register.scss";
import {MdAccountCircle} from 'react-icons/md'
import {useNavigate} from 'react-router-dom';
import { Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

function Register() {
  const navigate = useNavigate();
  const [userName, userUpdate]       = useState("");
  const [email, emailUpdate]         = useState("");
  const [phone, phoneUpdate]         = useState("");
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
      if (userName.length === 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: 'Username tidak boleh kosong',
      }).then(() => { setLoading(false);})
    }else{
      if (email.length === 0 || !checkEmail || !checkEmail2) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: 'Email tidak boleh kosong',
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
    if (password.length < 5 ) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      text: 'Kata sandi tidak boleh kurang dari 5 karakter',
    }).then(() => { setLoading(false); })
    }else {
            const objInput = {
              "nama": userName,
              "email": email,
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
                    title: "Daftar akun berhasil",
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
                title: 'Email sudah terdaftar'
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

  return (
    <div className="container pt-5">
        <Form   onSubmit={(e) => handleSubmit(e)}>
        <MdAccountCircle className="reg-icon" style={{color:"#046c91"}}/>
        <h4>Daftar</h4>

        <Form.Group  >
          <Form.Control id="name" className="p-3 b-bottom-signup" type="text" placeholder="Nama"
            onChange={(e) => userUpdate(e.target.value) }
          />
        </Form.Group>  
        <Form.Group >
          <Form.Control id="email" className="p-3 b-mid-signup " type="email" placeholder="Email" 
            onChange={(e) => emailUpdate(e.target.value) } 
          />
        </Form.Group>
        <Form.Group >
          <Form.Control id="phone" className="p-3 b-mid-signup" type="number" placeholder="No. phone" 
            onChange={(e) => phoneUpdate(e.target.value) }
          />
        </Form.Group>
        <Form.Group className=" mb-4" >
          <Form.Control id="password" className="mb-1 p-3 b-top-signup" type="password" placeholder="Kata Sandi" 
            onChange={(e) => passwordUpdate(e.target.value) }
          />
          <p className="href" onClick={() => navigate('/masuk')}><u>Masuk</u> </p>
        </Form.Group>
        
        <button className=" mb-1 p-2 btn-submit" type="submit">
          {loading && <Spinner animation="border" variant="light" />}
          {!loading && <span>Daftar</span>}
        </button>
        </Form>
    </div>
  );
}

export default Register;
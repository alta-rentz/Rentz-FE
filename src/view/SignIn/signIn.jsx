import { useState } from "react";
import {MdAccountCircle} from 'react-icons/md'
import { useNavigate } from "react-router-dom";
import { Form, Spinner } from 'react-bootstrap';
import "./signIn.scss";
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
          text: 'Email tidak boleh kosong',
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
                    title: "Anda telah login",
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
                    title: 'Email / Kata sandi salah'
                  }).then(() => { setLoading(false);})
                }).finally(() => {
                  setLoading(false);
                });
           }  
         } 
      }
      
  

  return (
    <div className="container pt-5">
    <Form   onSubmit={(e) => handleSubmit(e)}>
    <MdAccountCircle className="reg-icon" style={{color:"#046c91"}}/>
    <h4>Masuk</h4>
    <Form.Group >
      <Form.Control id="email" className="p-3 b-mid-signup " type="email" placeholder="Email" 
        onChange={(e) => emailUpdate(e.target.value) }
      />
    </Form.Group>
    <Form.Group className=" mb-4" >
      <Form.Control  id="password" className="mb-1 p-3 b-top-signup" type="password" placeholder="Kata Sandi" 
        onChange={(e) => passwordUpdate(e.target.value) }
        
      />
      <p className="href" onClick={() => navigate('/daftar')}><u>Daftar</u> </p>
    </Form.Group>
    
    <button className=" mb-1 p-2 btn-submit" type="submit">
      {loading && <Spinner animation="border" variant="light" />}
      {!loading && <span>Masuk</span>}
    </button>
    </Form>
</div>
  );
}

export default SignIn;
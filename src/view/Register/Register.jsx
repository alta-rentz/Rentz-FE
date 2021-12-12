import { useState, useEffect } from "react";
import "./Register.scss";
import {MdAccountCircle} from 'react-icons/md'
import {useNavigate} from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';


function Register() {
  const navigate = useNavigate();
  // const initialValues = { username: "", email: "", noHP: "", password: "" };

  const [userName, userUpdate]       = useState("");
  const [email, emailUpdate]         = useState("");
  const [phone, phoneUpdate]         = useState("");
  const [password, passwordUpdate]   = useState("");
  const [loading, setLoading]        = useState(false);
  const arrEmail = email.split("");
  const checkEmail = arrEmail.find((el) => el === "@");
  const checkEmail2 = arrEmail.find((el) => el === ".");

  const goLogin = () => {
    navigate('/SignIn')
  };

   const handleSubmit =  (e) => { 
    e.preventDefault();
    // setValidated(true);
    // setLoading(true);
    //   if (userName.length === 0) {
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'error',
    //     text: 'Nama tidak boleh kosong',
    //   }).then(() => { setLoading(false);})
    // }else{
    //   if (email.length === 0 || !checkEmail || !checkEmail2) {
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'error',
    //       text: 'Email tidak boleh kosong',
    //     }).then(() => { setLoading(false); })
      
    //   }else {
    //   if (phone.length === 0 ) {
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'error',
    //       text: 'Nomor HP tidak boleh kosong',
    //     }).then(() => { setLoading(false); })
    //   }else{
    //     if ( phone.length < 11 || phone[0] != 0 || phone[1] != 8) {
    //       Swal.fire({
    //         position: 'center',
    //         icon: 'error',
    //         text: 'Nomor HP tidak sesuai',
    //       }).then(() => { setLoading(false); })
    //     }else{
    // if (password.length < 5 ) {
    // Swal.fire({
    //   position: 'center',
    //   icon: 'error',
    //   text: 'Kata sandi tidak boleh kurang dari 5 karakter',
    // }).then(() => { setLoading(false); })
    // }else {
    //         // const objInput = {
    //         //   "name": userName,
    //         //   "email": email,
    //         //   "phone": phone,
    //         //   "password": password
    //         // }
              
            const headers = {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
          };
            const formData = new FormData();
      formData.append("name" , userName)
      formData.append("email" , email)
      formData.append("phone" , phone)
      formData.append("password" , password)
  
       axios.post("http://localhost:8080/restAPI/api/db/post.php", formData, {headers}  )
       .then(response => {
        const {data} = response;

        console.log(response);
    })
              
                // const objLogin = {
                //   "email": email,
                //   "password": password
                // }

                // return axios.post('https://rentzid.arffbim.my.id/login.php', objLogin )
                // .then(({data}) => {
                //   localStorage.setItem("token", data.Data.Token);
                //   localStorage.setItem("userId", data.Data.ID);
                //   localStorage.setItem("userName", data.Data.Name);
                //   localStorage.setItem("email", email);
                //   Swal.fire({
                //     position: 'center',
                //     icon: 'success',
                //     title: "Daftar akun berhasil",
                //     showConfirmButton: false,
                //     timer: 1500
                //   }).then((result) => {
                  
                //   })
                // })

           .catch((err)=>{
                console.log(err);
              // Swal.fire({
              //   icon: 'error',
              //   title: 'Email sudah terdaftar'
              // }).then(() => { setLoading(false);})
            }).finally(() => {
              setLoading(false);
            });
    }  
        // } 
  //     }
  //     }
  //   }  
  // }

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setFormErrors(validate(formValues));
  //   setIsSubmit(true);
    // setFormValues(initialValues)

    // const objUser = {
    //   "username": username,
    //   "email": email,
    //   "noHP": noHP,
    //   "password": password,
    // }
    // axios
    //   .post("http://localhost:3000/register", objUser)
    //   .then(() => {
    //   const objLogin = {
    //     "email": email,
    //     "password": password
    //   }
    //   return axios
    //     .post("http://localhost:3000/login", objLogin)
    //     .then(() => {
    //       localStorage.setItem("token", Token)
    //       localStorage.setItem("username", username)
    //       localStorage.setItem("email", email)
    //     })
    //   })    
  // };

  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(formValues);
  //   }
  // }, [formErrors]);
  // const validate = (values) => {
  //   const errors = {};
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  //   if (!values.username) {
  //     errors.username = "Username is required!";
  //   }
  //   if (!values.email) {
  //     errors.email = "Email is required!";
  //   } else if (!regex.test(values.email)) {
  //     errors.email = "This is not a valid email format!";
  //   }
  //   if (!values.noHP) {
  //     errors.noHP = "Phone Number is required!";
  //   }
  //   if (!values.password) {
  //     errors.password = "Password is required";
  //   } else if (values.password.length < 4) {
  //     errors.password = "Password must be more than 4 characters";
  //   } else if (values.password.length > 10) {
  //     errors.password = "Password cannot exceed more than 10 characters";
  //   }
  //   return errors;
  // };

  return (
    <div className="container pt-5">
      {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success" style={{color:"green"}}>Register successfully</div>
      ) : (
        <div></div>
      )}
      */}
        <Form   onSubmit={(e) => handleSubmit(e)}>
        <MdAccountCircle className="reg-icon" style={{color:"orange"}}/>
        <h4>Daftar</h4>

        <Form.Group  >
          <Form.Control className="p-3 b-bottom-signup" type="text" placeholder="Nama"
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
          <Form.Control className="mb-1 p-3 b-top-signup" type="password" placeholder="Kata Sandi" 
            onChange={(e) => passwordUpdate(e.target.value) }
            
          />
          <a className="href" target="_blank" rel="noreferrer" onClick={() => navigate('/masuk')}>Masuk</a>
        </Form.Group>
        
        <button className=" mb-1 p-2 btn-submit" type="submit">
          {loading && <Spinner animation="border" variant="light" />}
          {!loading && <span>Lanjutkan</span>}
        </button>
        </Form>
    </div>
  );
}

export default Register;
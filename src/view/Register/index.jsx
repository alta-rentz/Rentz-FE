// import React, { useState } from "react";

// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [noHP, setNoHP] = useState("");
//   const [password, setPassword] = useState("");

//   const submitRegister = (e) => {
//     e.preventDefault()
//     // if(username !== /^[A-Za-z][A-Za-z0-9_]/
//     // ) alert('Username should start with an alphabet and the minimum characters is 8 to 30')
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
    // })
//   }

//   return (
//     <div className="register-container pt-5">
//       <p>Register</p>
        
//       <form className="formulir-register" onSubmit={submitRegister}>
//         <label>Username</label>
//         <input type="name" placeholder="Username..." onChange={(e) => setUsername(e.target.value)}/>
//         <label>Email</label>
//         <input type="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/>
//         <label>No. Handphone</label>
//         <input type="number" placeholder="No. Handphone..." onChange={(e) => setNoHP(e.target.value)}/>
//         <label>Password</label>
//         <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)}/>
//         <button>send</button>
//       </form>
//     </div>
//   )
// }

// export default Register;
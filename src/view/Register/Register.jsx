import { useState, useEffect } from "react";
import "./Register.scss";
import {MdAccountCircle} from 'react-icons/md'
import {useNavigate} from 'react-router-dom';

function Register() {
  const initialValues = { username: "", email: "", noHP: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const goLogin = () => {
    navigate('/SignIn')
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
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
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.noHP) {
      errors.noHP = "Phone Number is required!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="container pt-5">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success" style={{color:"green"}}>Register successfully</div>
      ) : (
        <div></div>
      )}

      <form onSubmit={handleSubmit}>
        <MdAccountCircle className="reg-icon" style={{color:"orange"}}/>
        <h4>Register</h4>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>No. Telepon</label>
            <input
              type="text"
              name="noHP"
              placeholder="Phone Number"
              value={formValues.noHP}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.noHP}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <div className="navigateToLogin" onClick={goLogin}>Sign in</div>
          <button className="btn-register" style={{color:"white"}}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
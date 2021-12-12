import { useState } from "react";
import {MdAccountCircle} from 'react-icons/md'
import { useNavigate } from "react-router-dom";
import "./signIn.scss";

function SignIn() {
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const goSignIn = () => {
    navigate('/Daftar')
  };

  const handleSubmit = (e) => {
    e.preventDefault();       
  };

  return (
    <div className="SignIn-container pt-5">
      <form onSubmit={handleSubmit}>
        <MdAccountCircle className="SignIn-icon" style={{color:"orange"}}/>
        <h4>Sign in</h4>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field pb-3">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          {/* <p>{formErrors.email}</p> */}
          <div className="field pb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          {/* <p>{formErrors.password}</p> */}
          <div className="navigateToRegister" onClick={goSignIn}>Register</div>
          <button className="btn-SignIn" style={{color:"white"}}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
import { useState } from "react";
import "./LoginForm.css";
import FormInput from "./FormInput";
import React from 'react'

const LoginForm = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },


    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    }

  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div>
        <Navbars />
      <div className="Register">
      <form onSubmit={handleSubmit}>
        <h1 id="RegisBar">Login</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
       
        <div className="btn-submit">
          <div>
            <button className="LoginForm">Login</button>
          </div>
          <div>
            <button className="LoginForm">Sign up</button>
          </div>
        </div>
          
     
      </form>
     
  
    </div>
    
    </div>
    
  );
};

export default LoginForm;
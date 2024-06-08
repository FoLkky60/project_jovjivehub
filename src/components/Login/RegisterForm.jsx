import React from "react";
import { useState } from "react";
import "./RegisterForm.css";
import FormInput from "./FormInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const RegisterForm = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [cookies, setCookie] = useCookies(['user']);
  const navigate = useNavigate();
  const handleToggleForm = () => {
    setShowLogin(false); 
  };

  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });
  const inputlogin = [
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      required: true,
    },

    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",

      // pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      required: true,
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",

      // pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    const url = showLogin
      ? "http://localhost:5001/api/login"
      : "http://localhost:5001/api/register";

    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
      },
      // withCredentials: 'include',
    };

    try {
      const response = await axios.post(url, values, config);

      if (response.status === 200) {
        console.log(response.data); // Process the response data as needed
        setCookie("UID", response.data.userDate, { path: "/" });
        // alert(`Success: ${response.data.message}`);
        // return <Redirect to="/" />;
        navigate("/");
      } else {
        alert(`Error: ${response.data.message}`);
        throw new Error("Failed to fetch");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const renderFormInputs = (inputs) => {
    return inputs.map((input) => (
      <FormInput
        key={input.id}
        {...input}
        value={values[input.name]}
        onChange={onChange}
      />
    ));
  };

  return (
    <div className="Wrapper">
      <div className="Register">
        <form onSubmit={handleSubmit}>
          {/* <h1 id="RegisBar">{showLogin ? "Login" : "Register"}</h1> */}
          <div>
          <button
                className="RegisForm"
                onClick={() => setShowLogin(true)}
                type="button"
              >
                Login
              </button>
              <button
                className="LoginForm"
                onClick={handleToggleForm}
                type="button"
              >
                Register
              </button>
              
            </div>
          {showLogin ? renderFormInputs(inputlogin) : renderFormInputs(inputs)}
          <div className="btn-submit">
            <div>
              <button className="Submit" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

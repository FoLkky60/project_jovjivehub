import React from "react";
import { useState } from "react";
import "./RegisterForm.css";
import FormInput from "./FormInput";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [showLogin, setShowLogin] = useState(true); // เริ่มต้นโชว์ฟอร์ม Login

  const handleToggleForm = () => {
    setShowLogin(!showLogin); // สลับสถานะการแสดงฟอร์ม
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
    console.log(values);
    const url = showLogin
      ? "http://localhost:5000/api/login"
      : "http://localhost:5000/api/register";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    };

    try {
      const response = await fetch(url, config);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Process the response data as needed
        alert(`Success: ${data.message}`);
      } else {
        const data = await response.json();
        alert(`Success: ${data.message}`);
        throw new Error("Failed to fetch");
        
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="Wrapper">
      {showLogin ? (
        <div className="Register">
          <form onSubmit={handleSubmit}>
            <h1 id="RegisBar">Login</h1>
            {inputlogin.map((input) => (
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
                <button className="LoginForm" onClick={handleToggleForm}>
                  Sign up
                </button>
              </div>
            </div>
            <div>
              <button className="Submit" type="submit">Sumit </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="Register">
          <form onSubmit={handleSubmit}>
            <h1 id="RegisBar">Register</h1>
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
                <button className="LoginForm" onClick={handleToggleForm}>
                  Login
                </button>
              </div>
              <div>
                <button className="LoginForm">Sign up</button>
              </div>
            </div>
            <div>
              <div>
                <button className="Submit" type="submit">
                  Submit{" "}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;

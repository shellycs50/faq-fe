import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
function Register() {
 const [firstName, setFirstName] = useState("")
 const [lastName, setLastName] = useState("")
 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")
 const [errors, setErrors] = useState({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
 })
 const navigate = useNavigate();

 async function authenticate() {
  setErrors({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
   })
  try {
    const response = await fetch("https://faq-api-demo.robsheldrick.dev.io-academy.uk/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        superadmin: 0,
        trainer: 0
      }),
    });

    if (!response.ok) {
      // do some error settings with the fields (json will return obj of fields that have errors)
      let res = await response.json()
      const newErrors = {...errors}
      for (const key in res.errors) {
        if (Object.prototype.hasOwnProperty.call(newErrors, key)) {
          newErrors[key] = res.errors[key];
        }
      }
      setErrors(newErrors)
    }
    else {
      navigate('/login')
    }
  } catch (error) {
  }
}

function saveCookie(token) {
  Cookies.set('auth_key', token, { expires: 7 });
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-baseblue">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-semibold my-2">Register</h2>
        {errors.email != "" && (
          <p className='my-2 text-red-700'>{errors.email}</p>
        )}
        <form>
          <div className="mb-4">
            <label htmlFor="firstname" className={`block text-sm font-medium ${errors.first_name == "" ? "text-gray-600" : "text-red-700"}`}>
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="John"
              value={firstName}
              onChange={(e) => {setFirstName(e.target.value)}}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => {setLastName(e.target.value)}}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className={`block text-sm font-medium ${errors.email == "" ? "text-gray-600" : "text-red-700"}`}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Your email"
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Your password"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
            />
          </div>
          <a
            onClick={() => authenticate()}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition cursor-pointer"
          >
            
            Register
          </a>

          <p className="mt-4">
          Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>.
        </p>
          
        </form>
      </div>
    </div>
  );
};

export default Register;

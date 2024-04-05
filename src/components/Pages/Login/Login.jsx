
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie'

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  async function authenticate(event) {
    event.preventDefault();
    setIsError(false);
    try {
      const response = await fetch("https://faq-api-demo.robsheldrick.dev.io-academy.uk/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const result = await response.json();
      saveCookie(result.token);
      if (result.rank == 1) {
        Cookies.set('admin', 1, { expires: 7 }); //for the scale of the project this is fine, and all admin routes are protected by auth key verification.
        navigate('/trainerpost')
      }
      if (result.rank == 0) {
        Cookies.set('admin', 0, { expires: 7 });
        navigate('/studenthome')
      }
      else {
        setIsError(true);
      }


    } catch (error) {
      console.error("Error:", error);
    }
  }

  function saveCookie(token) {
    Cookies.set('auth_key', token, { expires: 7 });

  }

  useEffect(() => {
    if (Cookies.get('auth_key')) {
      if (Cookies.get('admin') == 1) {
        navigate('/trainerpost')
      }
      if (Cookies.get('admin') == 0) {
        navigate('/studenthome')
      }
    }
  }, []);


  async function guestSignIn() {
    try {
      const response = await fetch("https://faq-api-demo.robsheldrick.dev.io-academy.uk/api/guest", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      saveCookie(result.token);
      if (result.rank == 1) {
        Cookies.set('admin', 1, { expires: 7 }); //for the scale of the project this is fine, and all admin routes are protected by auth key verification.
        navigate('/trainerpost')
      }
      if (result.rank == 0) {
        Cookies.set('admin', 0, { expires: 7 });
        navigate('/studenthome')
      }
      else {
        setIsError(true);
      }


    } catch (error) {
      console.error("Error:", error);
    }
  }




  return (
    <div className="min-h-screen flex items-center justify-center bg-baseblue">
      <div className='fixed top-14 left-52'>
        <p className='text-white'>hi</p>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <h4 className={`${isError ? "pb-6 text-lg text-red-500" : "pb-6 text-lg text-white"}`}>The provided credentials are invalid.</h4>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition cursor-pointer" onClick={authenticate}>Login</button>


        </form>
        <p className='my-4'>
          Just browsing? <a onClick={guestSignIn} className="text-blue-500 cursor-pointer">Sign in as guest</a>
        </p>
        <p className="my-4">
          Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link>.
        </p>

      </div>
    </div>
  );
};

export default Login;

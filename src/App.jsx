// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Pages/Login/Login';
import Register from './components/Pages/Register/Register';
import QuestionBuilder from './components/QuestionBuilder';
import StudentHome from './components/Pages/StudentHome/StudentHome';
import TrainerPost from './components/Pages/TrainerPost/TrainerPost';
import { Navigate } from 'react-router-dom';
import StudentPost from './components/Pages/StudentPost/StudentPost';
import TrainerArchive from './components/Pages/TrainerArchive/TrainerArchive';
import TrainerEdit from './components/Pages/TrainerEdit/TrainerEdit';
import StudentNav from './components/Navs/StudentNav';
import AdminNav from './components/Navs/AdminNav';
import Cookies from 'js-cookie';
import Success from './components/Pages/Success/Success';
function App() { 	

  function LogOut() {
    console.log('attempting to logout')
    // const navigate = useNavigate();
    Cookies.remove('auth_key');
    Cookies.remove('admin');
    // navigate('/login')
    window.location.href = '/login'; //this is a hacky way to get around navigate hook not working.
  }

  const [isAdmin, setIsAdmin] = useState(undefined);


useEffect(() => {
  let NavbarHack = setInterval(() => { 
    console.log('checking for admin')
    if (Cookies.get('auth_key') && Cookies.get('admin')) {
      setIsAdmin(Cookies.get('admin'))
      clearInterval(NavbarHack);
    }
  }, 1000);
  return () => clearInterval(NavbarHack);
}, [])

  return (
    <BrowserRouter>
    {isAdmin == 1 && <AdminNav LogOut={LogOut}/>}
          {isAdmin == 0 && <StudentNav LogOut={LogOut}/>}
        <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ask" element={<QuestionBuilder />} />
          <Route path='/studenthome' element={<StudentHome />} />
          <Route path='/studentpost' element={<StudentPost />} />
          <Route path='/trainerpost' element={<TrainerPost />} />
          <Route path='/trainerarchive' element={<TrainerArchive/>} />
          <Route path='/traineredit/:id' element={<TrainerEdit />} />
          <Route path='/success' element={<Success />} />
          <Route path='*' element={<Navigate to="/login"/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
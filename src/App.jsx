// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Pages/Login/Login';
import Register from './components/Pages/Register/Register';
import QuestionBuilder from './components/QuestionBuilder';
import StudentHome from './components/Pages/StudentHome/StudentHome';
import TrainerPost from './components/Pages/TrainerPost/TrainerPost';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ask" element={<QuestionBuilder />} />
          <Route path='/studenthome' element={<StudentHome />} />
          <Route path='/trainerpost' element={<TrainerPost />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

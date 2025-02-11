import React from 'react'
import SubmitBtn from './reusables/SubmitBtn';
import RegisterPage from './auth/RegisterPage';
import Login from './auth/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WelcomePage from './WelcomePage';

const App = () => {

  const handleClick = ()=>{
    console.log("btn clicked");
  }
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<RegisterPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<WelcomePage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;

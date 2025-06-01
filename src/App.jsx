import { useEffect, useState } from 'react'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SignIn from './pages/sign-in'
import SignUp from './pages/sign-up'


function App() {

  return (

<Routes>
  <Route path='/' element={<Home />}/>
  <Route path='/sign-in' element={<SignIn />} />
  <Route path='/sign-up' element={<SignUp />} />
  <Route path='*' element={<Navigate to="/" />}/>
</Routes>
  )
}
export default App
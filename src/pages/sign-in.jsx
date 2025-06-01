import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate, Link } from 'react-router-dom'


export default function SignIn() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate()

  const handleSignIn = async (e) => {
    e.preventDefault()

    const res = await fetch('http://localhost:3000/auth/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (res.ok && data) {
      Cookies.set('token', data) // <- data is the token
      navigate('/') // redirect to home
    } else {
      alert(data.message || 'Login failed')
    }
  }

  return (
    <div className=' w-screen flex justify-center align-middle'>
      <form onSubmit={handleSignIn} className='flex flex-col w-[250px] gap-2 border-2 rounded-2xl p-6'>
        <h1 className='flex justify-center font-bold'>Sign-In</h1>
        <input type="text" placeholder='example@gmail.com'
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="border-2 rounded p-1 " />
        <input type="password" placeholder='*******'
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className='border-2 rounded p-1'
          required />

        <button className='bg-blue-500 text-white p-1 rounded'>Sign In</button>
        <h2>Don't have an account? <span className='font-medium text-purple-900'><Link to={'/sign-up'}>Register</Link></span></h2>
      </form>
    </div>
  )
}
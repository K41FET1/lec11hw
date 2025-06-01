import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
  const [fullName, setFullName] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const handldeSignUp = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/auth/sign-up', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({fullName, email, password}),
    });

    const data = await res.json();
  if (res.ok) {
    setMessage('Signup successful! Redirecting to sign-in...');
    setFullName('');
    setemail('');
    setpassword('');
    setTimeout(() => {
      navigate('/sign-in')  // <--- redirect to sign-in page
    }, 1000);  // 1 second delay so user sees message (optional)
  } else {
    setMessage(data.message || 'Signup failed');
  }
};
    
  return (
    <div className=' w-screen   flex justify-center align-middle'>
      <form onSubmit={handldeSignUp} className='flex flex-col w-[250px] gap-2 border-2 rounded-2xl p-6'>
        <h1 className='flex justify-center font-bold'>Sign-Up</h1>

        <input type="text" placeholder='FullName'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)} 
          required
          className='border-2 rounded p-1'
          />

        <input type="text" placeholder='example@gmail.com'
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required 
          className='border-2 rounded p-1'
          />
        <input type="password" placeholder='*******'
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className='border-2 rounded p-1'
          required />

        <button type='submit' className=' bg-blue-500 text-white p-1 rounded '>Sign Up</button>
        <p className='text-red-600'>{message}</p>
        <h2>Already have account? <span className='text-purple-900 font-medium'> <Link to={'/sign-in'}>Sign-In</Link></span></h2>
      </form>


    </div>
  )
}
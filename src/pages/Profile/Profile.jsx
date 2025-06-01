import React from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {
    return (
        <div className='p-4'>
            <Link to={'/'} >
            Back To Home
            </Link>

            <h1>Profile</h1>
            <h1>Email <span className='font-bold'>{user?.email}</span></h1>
            <h1>FullName <span className='font-bold'>{user?.fullName}</span></h1>

            <div>
                <img src="{user?.avatar}" alt="user" className='w-[200px] h-[200px]'/>
            </div>

            </div>
    )
}
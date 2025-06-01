import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export default function Dashboard() {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null)
    const token = Cookies.get('token')

    useEffect(() => {
        // Fetch current user
        fetch('http://localhost:3000/auth/current-user', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(setUser)

        // Fetch posts
        fetch('http://localhost:3000/posts', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(setPosts)
    }, [])

    const handleDelete = async (postId) => {
        await fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        })
        setPosts(posts.filter(p => p._id !== postId))
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Dashboard</h1>

            {posts.map(post => (
                <div key={post._id} className="border p-2 my-2">
                    <h2 className="font-semibold">{post.title}</h2>
                    <p>{post.content}</p>
                    <p className="text-sm text-gray-500">Author: {post.userId.fullName}</p>

                    {user && user._id === post.userId._id && (
                        <div className="mt-2">
                            <button className="bg-red-500 text-white px-2" onClick={() => handleDelete(post._id)}>Delete</button>
                            {/* Add edit functionality here */}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
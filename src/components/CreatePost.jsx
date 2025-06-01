import React, { useState } from 'react'
import Cookies from 'js-cookie'

export default function CreatePost({ onPostCreated }) {
    const [content, setContent] = useState('')
    const token = Cookies.get('token')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!content.trim()) return

        const res = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ content })
        })

        if (res.ok) {
            const newPost = await res.json()
            onPostCreated(newPost)  // inform parent to update posts list
            setContent('') // clear textarea
        } else {
            alert('Failed to create post')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <textarea
                placeholder="Write your new post here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border p-2 w-full rounded mb-2"
                rows={3}
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Create Post
            </button>
        </form>
    )
}
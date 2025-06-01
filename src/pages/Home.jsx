import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import CreatePost from '../components/CreatePost' // adjust path if needed

export default function Home() {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const token = Cookies.get('token')

  useEffect(() => {
    if (!token) {
      navigate('/sign-in')
      return
    }

    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:3000/posts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (!res.ok) {
          throw new Error('Failed to fetch posts')
        }
        const data = await res.json()
        setPosts(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPosts()
  }, [token, navigate])

  function getUserIdFromToken() {
    if (!token) return null
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.userId
    } catch {
      return null
    }
  }

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return

    try {
      const res = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!res.ok) {
        throw new Error('Failed to delete post')
      }

      setPosts(posts.filter(post => post._id !== postId))
    } catch (error) {
      alert(error.message)
    }
  }

  const addNewPost = (post) => {
    setPosts([post, ...posts])
  }

  const currentUserId = getUserIdFromToken()

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <CreatePost onPostCreated={addNewPost} />

      {posts.length === 0 && <p>No posts yet.</p>}

      {posts.map((post, index) => (
        <div key={post._id ? post._id : index} className="border rounded p-4 mb-4 shadow-sm">
          <p className="mb-2">{post.content}</p>
          <p className="text-sm text-gray-600 mb-2">
            Author: {post.author?.fullName || 'Unknown'}
          </p>

          {post.author?._id === currentUserId && (
            <button
              onClick={() => handleDelete(post._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
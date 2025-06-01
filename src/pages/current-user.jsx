export const fetchCurrentUser = async () => {
    const token = localStorage.getItem('token')
    if (!token) return null

    try {
        const res = await fetch('http://localhost:3000/auth/current-user', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })

        if (!res.ok) return null
        const user = await res.json()
        return user
    } catch (err) {
        return null
    }
}

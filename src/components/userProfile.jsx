import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) return;

    fetch('http://localhost:3000/auth/current-user', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error('Failed to fetch user:', err));
  }, []);

  if (!user) return <div>Loading user...</div>;

  return (
    <div>
      <h1>Welcome, {user.fullName}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default UserProfile;

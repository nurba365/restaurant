import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Profile() {
  const { username } = useContext(AuthContext);

  return (
    <div className="container">
      <h2>Your Profile</h2>
      <p><strong>Username:</strong> {username}</p>
      <p><strong>Email:</strong> {username}@example.com</p>
      <p><strong>Role:</strong> User</p>
    </div>
  );
}

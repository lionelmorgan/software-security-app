import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3003/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const addUser = () => {
    const newUser = { username: name, email, password }; // Updated to match backend fields
    axios.post('http://localhost:3003/api/users', newUser)
      .then(response => {
        setUsers([...users, response.data.user]);
        setName('');
        setEmail('');
        setPassword('');
        setErrorMessage(''); // Clear error message
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.message); // Set error message if available
        } else {
          setErrorMessage('Failed to create user'); // Generic error message
        }
      });
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3003/api/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div className="App">
      <h1>Users</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} - {user.email}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

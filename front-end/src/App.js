import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3003/api/users')
      .then(response => {
        setUsers(response.data);
      });
  }, []);

  const addUser = () => {
    const newUser = { name, email };
    axios.post('http://localhost:3003/api/users', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setName('');
        setEmail('');
      });
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3003/api/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      });
  };

  return (
    <div className="App">
      <h1>Users</h1>
      <div>
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
        <button onClick={addUser}>Add User</button>
      </div>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

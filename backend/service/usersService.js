/*
Business Logic 

Insert dependencies and functions here:
    [import dependencies]
    getAllUsers: Fetch all users from the database.
    getUserById: Fetch a user by their ID from the database.
    createUser: Create a new user with a hashed password.
    updateUser: Update a user's information.
    deleteUser: Delete a user from the database.
    authenticateUser: Authenticate a user and generate a JWT token for authorized access.
*/
const bcrypt = require('bcryptjs');
const userRepository = require('../repository/usersRepository');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// Import the secret key using setup.js to generate a random string of bytes (for a secret key)
const { secretKey } = require('../setup.js');

const getAllUsers = async () => {
  return await usersRepository.findAll();
};

const getUserById = async (id) => {
  return await usersRepository.findById(id);
};

const createUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = new User(null, user.username, hashedPassword, user.email);

  console.log('Generated Secret Key:', secretKey);
  
  try {
    // Create the user
    const createdUser = await usersRepository.save(newUser);
    
    // Authenticate the user and generate JWT token
    const token = jwt.sign({ id: createdUser.id }, secretKey, { expiresIn: '1h' });
    
    return { user: createdUser, token }; // Return user and token
  } catch (error) {
    throw new Error('Failed to create user');
  }
};
const updateUser = async (id, user) => {
  return await usersRepository.update(id, user);
};

const deleteUser = async (id) => {
  await usersRepository.remove(id);
};

const authenticateUser = async (username, password) => {
  const user = await usersRepository.findByUsername(username);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
    return { token };
  }
  return null;
};


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  authenticateUser,
};

const usersService = require('../service/usersService');

const getAllUsers = (req, res) => {
  const users = usersService.getAllUsers();
  res.json(users);
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = usersService.getUserById(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const createUser = async (req, res) => {
  const newUser = req.body;
  try {
    const user = await usersService.createUser(newUser);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const updateUser = req.body;
  const user = usersService.updateUser(id, updateUser);
  res.json(user);
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  usersService.deleteUser(id);
  res.status(200).json({ message: 'User deleted successfully' });
};

const authenticateUser = async (req, res) => {
  const { username, password } = req.body;
  const authResult = await usersService.authenticateUser(username, password);
  if (authResult) {
    res.json(authResult);
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  authenticateUser,
};

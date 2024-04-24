const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const usersController = require('./controller/usersController');
const usersAuthenticationMiddleware = require('./middleware/usersAuthenticationMiddleware');

const app = express();
const PORT = 3003;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

// Routes
app.post('/api/authenticate', usersController.authenticateUser);
app.use('/api/users', usersAuthenticationMiddleware);
app.get('/api/users', usersController.getAllUsers);
app.get('/api/users/:id', usersController.getUserById);
app.post('/api/users', usersController.createUser);
app.put('/api/users/:id', usersController.updateUser);
app.delete('/api/users/:id', usersController.deleteUser);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

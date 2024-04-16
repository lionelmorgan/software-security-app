const { Pool } = require('pg');

/* 
Update database parameters below using environment variables 
*/

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password123',
  port: 5432,
});

const findAll = async () => {
  const result = await pool.query('SELECT * FROM users_table');
  return result.rows;
};

const findById = async (id) => {
  const result = await pool.query('SELECT * FROM users_table WHERE id = $1', [id]);
  return result.rows[0];
};

const findByUsername = async (username) => {
  const result = await pool.query('SELECT * FROM users_table WHERE username = $1', [username]);
  return result.rows[0];
};

const save = async (user) => {
  const result = await pool.query(
    'INSERT INTO users_table(username, password, email) VALUES($1, $2, $3) RETURNING *',
    [user.username, user.password, user.email]
  );
  return result.rows[0];
};

const update = async (id, updateUser) => {
  const result = await pool.query(
    'UPDATE users_table SET username = $1, password = $2, email = $3 WHERE id = $4 RETURNING *',
    [updateUser.username, updateUser.password, updateUser.email, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  await pool.query('DELETE FROM users_table WHERE id = $1', [id]);
};

module.exports = {
  findAll,
  findById,
  findByUsername,
  save,
  update,
  remove,
};

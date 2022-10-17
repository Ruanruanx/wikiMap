const db = require('../connection');

const getUsersbyName = (username) => {
  return db.query('SELECT * FROM users WHERE name = $1;',[username])
    .then(data => {
      console.log(data.rows[0])
      return data.rows[0];
    });
};

const getUserById = (id) => {
  return db.query('SELECT * FROM users WHERE id = $1;',[id])
  .then(data => {
    return data.rows[0];
  });
}

module.exports = { getUsersbyName,getUserById };

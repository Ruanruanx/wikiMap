const { Pool } = require('pg');

const pool = new Pool({
    user: 'labber',
    password: 'labber',
    host: 'localhost',
    database: 'midterm'
  });

pool.query(`
SELECT id, name, email
FROM users;
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and email is ${user.email}`);
  })
});
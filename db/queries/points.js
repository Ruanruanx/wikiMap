const db = require('../connection');

const getPoints = () => {
  return db.query('SELECT * FROM points;')
    .then(data => {
      return data.rows;
    });
};

const getPointsById = (id) => {
  return db.query(`SELECT * FROM maps WHERE map_id = $1`,[id])
  .then((data) => {
    return data.rows[0];
  });
};


module.exports = { getPoints, getPointsById };

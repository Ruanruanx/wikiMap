const db = require('../connection');

const getMaps = () => {
  return db.query('SELECT * FROM maps;')
    .then(data => {
      return data.rows;
    });
};

const getMapById = (id) => {
  return db.query(`SELECT maps.*,points.id,points.location,points.image_url FROM maps 
  JOIN points on points.map_id=maps.id
  WHERE maps.id = $1`,[id])
  .then((data) => {
    return data.rows;
  });
};


module.exports = { getMaps, getMapById };

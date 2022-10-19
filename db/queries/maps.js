const db = require('../connection');

const getMaps = () => {
  return db.query('SELECT maps.*, * FROM users JOIN maps ON maps.owner_id=users.id  ORDER BY maps.id;')
    .then(data => {
      return data.rows;
    });
};

const getMapById = (id) => {
  return db.query(`SELECT maps.*,points.id,points.location,points.image_url, points.description, points.map_id, users.name as user FROM maps
  JOIN points on points.map_id=maps.id
  JOIN users on users.id=maps.owner_id
  WHERE maps.id = $1`,[id])
  .then((data) => {
    return data.rows;
  });
};

const removeMapById =(id) =>{
  return db.query(
    `DELETE FROM maps
    WHERE id = $1`,[id]
  )
  .then((data)=>{
    return data.rows;
  })
}

const removePointById =(id) =>{
  return db.query(
    `DELETE FROM points
    WHERE id = $1`,[id]
  )
  .then((data)=>{
    return data.rows;
  })
}

//add a new map
const newMap =(
  owner_id,
  title,
  map_url) =>{
    return db
    .query(
      `INSERT INTO maps(
        owner_id
        title,
        map_url)
        VALUES($1,$2,$3)`
    ,[
      owner_id,
      title,
      map_url
    ]
    ).then((data)=>{
      return data.rows[0];
    });
  };

//update an existing map
const updateMap=(
  title,
  map_url) =>{
    return db
    .query(
      `UPDATE maps SET title=$1,
        map_url=$2
        WHERE id=$3
        RETURNING *`
    ,[
      title,
      map_url
    ]
    ).then((data)=>{
      return data.rows[0];
    });
  };

//add a new point
const newPoint =(
  id,
  owner_id,
  map_id,
  location,
  title,
  description,
  image_url,
  star_rating,
  price_range
) =>{
  return db.query(`
  INSERT INTO points(  id,
    owner_id,
    map_id,
    location,
    title,
    description,
    image_url,
    star_rating,
    price_range)
  VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
  RETURNING *
  `,[
    id,
    owner_id,
    map_id,
    location,
    title,
    description,
    image_url,
    star_rating,
    price_range
  ]).then((data)=>{
    return data.rows[0];
  });
};

const getAllPoints = (map_id) => {
  return db
  .query(`
  SELECT *
  FROM points
  WHERE map_id = $1
  `, [map_id])
  .then((result) => {
    console.log(result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

module.exports = { getMaps, getMapById, removeMapById,removePointById,newPoint,newMap,updateMap,getAllPoints };

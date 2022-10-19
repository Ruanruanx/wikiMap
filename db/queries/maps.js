const db = require('../connection');

const getMaps = () => {
  return db.query(`SELECT maps.*, * 
  FROM users 
  JOIN maps ON maps.owner_id=users.id  
  ORDER BY maps.id;`)
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

const getMapByUserId =(id)=>{
  return db.query(`SELECT * FROM maps WHERE owner_id=$1`,[id])
  .then((data)=>{
    return data.rows;
  });
}

const getPointById = (id) => {
  return db.query(`SELECT * FROM points
  WHERE points.id = $1`,[id])
  .then((data) => {
    return data.rows[0];
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
        owner_id,
        title,
        map_url)
        VALUES($1,$2,$3);`
    ,[owner_id,
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
  owner_id,
  map_id,
  location,
  title,
  description,
  image_url,
  star_rating,
  price_range
) =>{
  console.log(image_url);
  console.log(typeof image_url);
  return db.query(`
  INSERT INTO points(
    owner_id,
    map_id,
    location,
    title,
    description,
    image_url,
    star_rating,
    price_range) 
  VALUES($1,$2,$3,$4,$5,$6,$7,$8)
  RETURNING *
  `,[
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

//update point
const updatePoint=( 
  owner_id,
  location,
  title,
  description,
  image_url,
  star_rating,
  price_range) =>{
    return db
    .query(
      `UPDATE points 
      SET

      owner_id=$7,
      location=$1,
      title=$2,
      description=$3,
      image_url=$4,
      star_rating=$5,
      price_range=$6
      `
    ,[
      owner_id,
      location,
      title,
      description,
      image_url,
      star_rating,
      price_range      
    ]
    ).then((data)=>{
      return data.rows[0];
    });
  };

module.exports = { getMaps, 
  getMapById, 
  removeMapById,
  removePointById,
  newPoint,newMap,
  updateMap,
updatePoint,
getPointById,
getMapByUserId };

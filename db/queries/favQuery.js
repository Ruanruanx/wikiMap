const db = require('../connection');


const getFavourites =()=>{
  return db.query(
    `SELECT favourited_maps.*, *
    From maps
    JOIN maps on favourited_maps.map_id = maps.id
    `
  )
  .then((data)=>{
    return data.rows;
  })
}

const getFavByUser =(user_id)=>{
  return db.query(
    `
    SELECT *, maps.*
    FROM favourited_maps
    FULL JOIN maps on favourited_maps.map_id = maps.id
    WHERE user_id = $1;
    `
  ,[user_id])
  .then((data)=>{
    return data.rows;
  })
}

const addToFavourites = (user_id, map_id) => {
  return db.query(
    `INSERT INTO favourited_maps(user_id, map_id)
    VALUES ($1, $2) RETURNING *;
    `
  , [user_id, map_id])
  .then((data)=>{
    return data.rows;
  })
  .catch(err => console.error('query error', err.stack));
}

module.exports = {getFavourites,getFavByUser,addToFavourites};

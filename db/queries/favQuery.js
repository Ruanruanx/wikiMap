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
    JOIN maps on favourited_maps.map_id = maps.id
    WHERE user_id = $1;
    `
  ,[user_id])
  .then((data)=>{
    return data.rows;
  })
}


module.exports = {getFavourites,getFavByUser };

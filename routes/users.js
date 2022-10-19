/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const mapQueries = require('../db/queries/maps');
const favQueries = require('../db/queries/favQuery');

//GET /profile
router.get('/', (req, res) => {
  userQueries.getUserById()
  .then((data)=>{
    const users = data.rows;
    res.json({users});
  })
  .catch((err)=>{
    res.status(500).json({ error: err.message });   
  })
}); 

router.get('/:username',(req,res)=>{
  const tempVars ={};
  userQueries.getUsersbyName(req.params.username)
  .then((user)=>{
    tempVars.user=user;
    tempVars.sessionId = req.session.userId
    return mapQueries.getMaps()
  }).then((maps)=>{
    tempVars.maps = maps;
    return favQueries.getFavourites()
  }).then((fav)=>{
    tempVars.favourites = fav;
    res.render('map_show');
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
})

module.exports = router;

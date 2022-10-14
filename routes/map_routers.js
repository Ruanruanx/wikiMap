const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');


router.get('/maps', (req, res) => {
    mapQueries.getMaps()
    .then(map => res.send({maps}))
    .catch(err => {
      res.send(e)
    }); 
  });
  
  module.exports = router;
  
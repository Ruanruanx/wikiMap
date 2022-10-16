const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');
const pointQueries = require('../db/queries/points');

router.get('/', (req, res) => {
    mapQueries.getMapsById()
    .then(maps => {
        let tempVars={maps}
        res.render('maps',tempVars)
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    }); 
  });


  module.exports = router;
  
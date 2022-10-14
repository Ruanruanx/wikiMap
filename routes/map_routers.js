const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');


router.get('/maps', (req, res) => {
    mapQueries.getMaps()
    .then(maps => res.render({maps}))
    .catch(err => {
        res.status(500).json({ error: err.message });
    }); 
  });

// router.get("/:map_id",(req, res)={
//     mapQueries
//     .getMapById()
//     .then
// })

  module.exports = router;
  
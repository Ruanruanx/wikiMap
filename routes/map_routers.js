const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');


router.get('/', (req, res) => {
    mapQueries.getMaps()
    .then(maps => {
        let tempVars={maps}
        res.render('maps',tempVars)
    })
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
  
const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');


router.get('/', (req, res) => {
    mapQueries.getMaps()
    .then(maps => {
        let tempVars={maps}
        res.render('maps',tempVars)
        //res.json(maps)
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    }); 
  });
  router.get("/:id",(req,res)=>{
    mapQueries
    .getMapById(req.params.id)
    .then((map)=>{
        let mapView={map}
        res.render("map_show",mapView);
    })
    .catch((err)=>{
        res.status(500).json({error: err.message});
    });
  });

  module.exports = router;
  
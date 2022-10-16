const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');
const pointQueries = require('../db/queries/points');

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
    const tempVars={};
    mapQueries
    .getMapById(req.params.id)
    .then((map)=>{
        tempVars.map=map;
        res.render("map_show",tempVars);
    })
    .catch((err)=>{
        res.status(500).json({error: err.message});
    });
  });

  module.exports = router;
  
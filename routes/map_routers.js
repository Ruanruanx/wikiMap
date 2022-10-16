const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');
const favQueries = require('../db/queries/favQuery');

router.get('/', (req, res) => {
    let tempVars={};
    mapQueries.getMaps()
    .then(maps => {
        tempVars.maps=maps;
        return favQueries.getFavByUser(1)
    })
    .then((fav)=>{
        tempVars.fav=fav;
        //res.json(tempVars.fav)
        res.render('maps',tempVars)
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

router.post("/:id/delete",(req,res)=>{
    mapQueries.removeMapById(req.params.id)
    .then(()=>{
        res.redirect('/maps');
    })
})

  module.exports = router;
  
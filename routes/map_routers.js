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

//delete the whole map
router.post("/:id/delete",(req,res)=>{
    mapQueries.removeMapById(req.params.id)
    .then(()=>{
        res.redirect('/maps');
    })
})

router.get('/points/:id', (req, res) => {
  mapQueries.getAllPoints(req.params.id)
  .then((points) => {
    res.json(points);
  })
})

//delete one point
router.post("/:id/point/delete",(req,res)=>{
    mapQueries.removePointById(req.params.id)
    .then(()=>{
        res.redirect('/maps/'+req.params.id);
    })
})

//add a new map in /maps
router.post("/",(req,res)=>{
    const owner_id =1;
    const title = req.body.title;
    const map_url = "req.body.map_url";

    mapQueries.newMap(
        owner_id,
        title,
        map_url)
        .then((data)=>{res.send(data);})
        .catch((err)=>{
            res.status(500).json({ error: err.message });
        })
})

//update map in /maps/:id
router.post("/:id",(req,res)=>{
    const title = req.body.title;
    const map_url = req.body.map_url;

    mapQueries.updateMap(title,map_url)
    .then((data)=>{
        res.status(200).send(data);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message });
    })
})

  module.exports = router;

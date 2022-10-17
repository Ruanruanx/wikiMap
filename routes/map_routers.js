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

router.get("/point/new",(req,res)=>{
    res.render("point_new");
})

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

router.get("/edit/:id",(req,res)=>{
    let tempVars={};
    mapQueries
    .getPointById(req.params.id)
    .then((point)=>{
        tempVars=point;
        res.render("edit",tempVars);
    })
    .catch((err)=>{
        res.status(500).json({error: err.message});
    });
    
})



//delete the whole map
router.post("/:id/delete",(req,res)=>{
    mapQueries.removeMapById(req.params.id)
    .then(()=>{
        res.redirect('/maps');
    })
})

//delete one point
router.post("/:id/point/delete",(req,res)=>{
    mapQueries.removePointById(req.params.id)
    .then(()=>{
        res.redirect('/maps/'+req.params.id);
    })
})

//update point in "/maps/edit/:point_id"
router.post("/edit/:id",(req,res)=>{
    const location= req.body.location;
    const title= req.body.title;
    const description= req.body.description;
    const image_url= req.body.image_url;
    const star_rating= req.body.star_rating;
    const price_range= req.body.price_range;

    mapQueries.updatePoint(      
        location,
        title,
        description,
        image_url,
        star_rating,
        price_range)
        .then((data)=>{res.send(data);})
        .catch((err)=>{
            res.status(500).json({ error: err.message });
        })
})

//add point
router.post("/:id",(req,res)=>{
    const location= req.body.location;
    const title= req.body.title;
    const description= req.body.description;
    const image_url= req.body.image_url;
    const star_rating= req.body.star_rating;
    const price_range= req.body.price_range;
    const owner_id = req.body.owner_id;
    const id=1;
    const map_id=1;

    mapQueries.newPoint(      
        location,
        title,
        description,
        image_url,
        star_rating,
        price_range,
        owner_id)
        .then((data)=>{res.send(data);})
        .catch((err)=>{
            res.status(500).json({ error: err.message });
        })
})
  module.exports = router;
  
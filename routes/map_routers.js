const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');
const favQueries = require('../db/queries/favQuery');

router.get('/', (req, res) => {
    let tempVars={};
    const userId = req.session.userId;
    mapQueries.getMapByUserId(userId)
    .then(maps => {
        tempVars.maps=maps;
        console.log(maps);
        return favQueries.getFavByUser(userId)
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

//add new point
router.get("/point/new/:map_id",(req,res)=>{
    res.render("point_new",{map_id:req.params.map_id});
})

//add new map
router.get("/new",(req,res)=>{
    res.render("maps_new");
})

//get map by id
router.get("/:id",(req,res)=>{
    const tempVars={};
    mapQueries
    .getMapById(req.params.id)
    .then((map)=>{
        tempVars.map=map;
        console.log('map',map);
        res.render("map_show",tempVars);
    })
    .catch((err)=>{
        res.status(500).json({error: err.message});
    });
  });

//edit a point
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
router.post("/edit/:map_id/:point_id",(req,res)=>{
    const location= req.body.location;
    const title= req.body.title;
    const description= req.body.description;
    const image_url= req.body.image_url;
    const star_rating= req.body.star_rating;
    const price_range= req.body.price_range;
    const point_id = req.params.point_id;
    const owner_id =req.session.userId;

    mapQueries.updatePoint(   
        owner_id,   
        location,
        title,
        description,
        image_url,
        star_rating,
        price_range,
        point_id)
        .then(()=>{
            
            res.redirect('/maps/'+req.params.map_id);})
        .catch((err)=>{
            res.status(500).json({ error: err.message });
        })
})

//add point to map_id
router.post("/new/:map_id",(req,res)=>{
    const location= req.body.location;
    const title= req.body.title;
    const description= req.body.description;
    const image_url= req.body.image_url;
    const star_rating= req.body.star_rating;
    const price_range= req.body.price_range;
    const owner_id = req.session.userId;
    ;
    const map_id=req.params.map_id;
    mapQueries.newPoint(
        owner_id,
        map_id,
        location,
        title,
        description,
        image_url,
        star_rating,
        price_range)
        .then(()=>{
        res.redirect('/maps/'+map_id)}
        )
        .catch((err)=>{
            res.status(500).json({ error: err.message });
        })
})

//add map
router.post("/newmap",(req,res)=>{
    const title= req.body.title;
    const map_url= req.body.map_url;
    const userId = req.session.userId;
    mapQueries.newMap(
        userId,
        title,
        map_url
    ).then(()=>{
        res.redirect('/maps')
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message });
    })
    
})

  module.exports = router;
  
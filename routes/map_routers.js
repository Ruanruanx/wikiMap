const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');
const favQueries = require('../db/queries/favQuery');


router.get('/', (req, res) => {
    let tempVars={};
    const userId = req.session.userId;
    if(userId){
        console.log('user',userId);
      mapQueries.getMapByUserId(userId)
    .then(maps => {
        tempVars.maps=maps;
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
    } else {
        res.redirect('/');
    }
    
  });

router.get('/points/:id',(req,res)=>{
    mapQueries.getAllPoints(req.params.id)
    .then((points)=>{
        console.log('points',points);
        const geojson = {
            type: 'FeatureCollection',
            features: []
          };
        for(const item of points){
            geojson.features.push({
                type:'Feature',
                geometry:{
                    type:'Point',
                    coordinates: [item.lat,item.longt]
                },
                properties: {
                title: item.title,
                description: item.description,
                image_url: item.image_url
                }
            })
        }
    res.send(geojson);
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

//add new point
router.get("/point/new/:map_id",(req,res)=>{
    res.render("point_new",{map_id:req.params.map_id});
})

//add new map
router.get("/new",(req,res)=>{
    const userId = req.session.userId;
    if(userId){
        res.render("maps_new");
    }else{
        res.redirect('/');
    }
    
})

//get map by id
router.get("/:id",(req,res)=>{
    const tempVars={};

    mapQueries
    .getMapById(req.params.id)
    .then((map)=>{
        console.log('get request',map);
        tempVars.map=map;
        tempVars.map_id=req.params.id;
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
router.post("/:map_id/:point_id/delete",(req,res)=>{
    mapQueries.removePointById(req.params.point_id)
    .then(()=>{
        res.redirect('/maps/'+req.params.map_id);
    })
})

//update point in "/maps/edit/:point_id"
router.post("/edit/:map_id/:point_id",(req,res)=>{
    const lat= req.body.lat;
    const longt=req.body.longt;
    const title= req.body.title;
    const description= req.body.description;
    const image_url= req.body.image_url;
    const star_rating= req.body.star_rating;
    const price_range= req.body.price_range;
    const point_id = req.params.point_id;
    const owner_id =req.session.userId;

    mapQueries.updatePoint(   
        owner_id,   
        lat,
        longt,
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
    const lat= req.body.lat;
    const longt = req.body.longt;
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
        lat,
        longt,
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
router.post("/",(req,res)=>{
    const title= req.body.title;
    const map_url= req.body.map_url;
    const userId = req.session.userId;
    console.log('post route')
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

//add map to favourites
router.post("/fav/:map_id", (req, res) => {
    const user_id = req.session.userId;
    console.log(req.session);
    const map_id = req.params.map_id;
    favQueries.addToFavourites(
      user_id,
      map_id
    ).then(() => {
      res.redirect("/maps")
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    })
  })

  module.exports = router;

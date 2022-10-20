

$( document ).ready(function() {

  // Mapbox Access Token
  mapboxgl.accessToken = 'pk.eyJ1IjoiaW1kb2RkcyIsImEiOiJjbDk2NnZnb2EwM3dqNDFwaDNscnI2Z2VrIn0.gp7ePy8_PpWIQzua7nvX_A';

  // Get user's location
  navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true });

  // Set map to user's location
  function successLocation(position) {
    console.log(position);
    setupMap([position.coords.longitude, position.coords.latitude])
  }

  // Set default/error location (CN Tower)
  function errorLocation() {
    setupMap([-79.3871, 43.6426]);
  }

  // Load map
  function setupMap(center) {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center,
      zoom: 12
    })

    // Load GeoJSON data

    // let geojson = {
    //   type: 'FeatureCollection',
    //   features: []
    // };
    // console.log('log1',window.location.href.split('/').filter(e=>e!==""))
    // console.log('log2',window.location);
    const map_id = window.location.href.split('/').filter(e=>e!=="")[3];
    console.log('map_id',map_id);
    map.on('load', () => {
    $.ajax("/maps/points/"+map_id, {method:'GET'})
  .then((points) => {
    //geojson = points;
    // const point1=points;
    // point1.features=[points.features[0]];
    addMarkersToMap(points);
    console.log('points',points)
  })
  });

  // $('#button').click(()=>{    $.ajax("/maps/points/"+map_id, {method:'GET'})
  // .then((points) => {
  //   //geojson = points;
  //   console.log('points',points);
  //   const point1=points;
  //   point1.features=[points.features[0]];
  //   addMarkersToMap(point1);
  // })});

    const CN = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-79.3871, 43.6426]
          },
          properties: {
            title: 'CN Tower',
            description: 'The CN Tower is a 553.3 m-high concrete communications and observation tower in downtown Toronto, Ontario, Canada. Built on the former Railway Lands, it was completed in 1976. Its name "CN" referred to Canadian National, the railway company that built the tower.',
            image: 'https://cdn.britannica.com/62/85162-050-C8698F1F/CN-Tower-Toronto.jpg'
          }
        }
      ]
    };
console.log('CN',CN);

    // Navigation controls
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    // Add markers to map
    const addMarkersToMap=(geojson)=>{
      console.log('geojson',geojson);
  for (const feature of geojson.features) {
      // Create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker';

      //Make a marker and popup for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // Add popups
            .setHTML(
              `
          <h2>${feature.properties.title}</h2>
          <img class='thumbnail' src=${feature.properties.image_url}>
          <p>${feature.properties.description}</p>
          `
            )
        )
        .addTo(map);
    };
    }
  

  };

})

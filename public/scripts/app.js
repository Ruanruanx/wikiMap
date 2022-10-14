// mapboxgl.accessToken = (Add access token here...)

// Get user's location
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true });

// Set map to user's location
function successLocation(position) {
  console.log(position);
  setupMap([position.coords.longitude, position.coords.latitude])
}

// Set default location to CN Tower
function errorLocation() {
  setupMap([-79.39, 43.64]);
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
  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-79.39, 43.64]
        },
        properties: {
          title: 'CN Tower',
          description: 'The CN Tower is a 553.3 m-high concrete communications and observation tower in downtown Toronto, Ontario, Canada. Built on the former Railway Lands, it was completed in 1976. Its name "CN" referred to Canadian National, the railway company that built the tower.',
          image: 'https://cdn.britannica.com/62/85162-050-C8698F1F/CN-Tower-Toronto.jpg'
        }
      }
    ]
  };

  // Navigation controls
  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);

  // Add markers to map
  for (const feature of geojson.features) {
    // Create a HTML element for each feature
    const el = document.createElement('div');
    el.className = 'marker';

    // Make a marker and popup for each feature and add to the map
    new mapboxgl.Marker(el)
    .setLngLat(feature.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }) // Add popups
        .setHTML(
          `
          <h2>${feature.properties.title}</h2>
          <img class='thumbnail' src=${feature.properties.image}>
          <p>${feature.properties.description}</p>
          `
        )
    )
    .addTo(map);  };

};

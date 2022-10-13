// Client facing scripts here

mapboxgl.accessToken = 'pk.eyJ1IjoiaW1kb2RkcyIsImEiOiJjbDk2NnZnb2EwM3dqNDFwaDNscnI2Z2VrIn0.gp7ePy8_PpWIQzua7nvX_A';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true });

// Set user's location
function successLocation(position) {
  console.log(position);
  setupMap([position.coords.longitude, position.coords.latitude])
}

// Set default location to CN Tower
function errorLocation() {
  setupMap([-79.39, 43.64]);
}

function setupMap(center) {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: center,
    zoom: 15
  })

  const nav = new mapboxgl.NavigationControl()
  map.addControl(nav)

}

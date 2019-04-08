// This file is in the entry point in your webpack config.
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoianBsYW8iLCJhIjoiY2p1NHE2emUzMGdicTQ0bzJwdW91aGZ1MCJ9.xOcYJbcXocOi1wogWwWv6w';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [-105.27, 40],
zoom: 1.5
});

var geocoder = new MapboxGeocoder({
accessToken: mapboxgl.accessToken
});

map.addControl(geocoder);
map.addControl(new mapboxgl.NavigationControl());

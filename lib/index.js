// Creates map
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoianBsYW8iLCJhIjoiY2p1NHE2emUzMGdicTQ0bzJwdW91aGZ1MCJ9.xOcYJbcXocOi1wogWwWv6w';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [-105.27, 40],
zoom: 1.5
});

// Adds search bar to map
var geocoder = new MapboxGeocoder({
accessToken: mapboxgl.accessToken
});
map.addControl(geocoder);

// Adds zoom controls to map
map.addControl(new mapboxgl.NavigationControl());

// Call to fetch weather info
function getWeather(q){
  var api_key = '6996386e46f031703c26cea51cac9e6e';
  var url =  `http://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=${api_key}&q=${q}`;
  fetch(url).then(response => response.json()).then(json_response => displayWeather(json_response));
}

// Display fetched weather data
function displayWeather(json_response){
  var name = json_response['name'];
  var description = json_response['weather'][0]['description'].toUpperCase();
  var temp = json_response['main']['temp']
  var high = json_response['main']['temp_max']
  var low = json_response['main']['temp_min']
  var humidity = json_response['main']['humidity']

  var data = `<h4>Current weather for: </h4>
              <h1>${name}</h1>
              <h1>${temp} &#8457</h1>
              <h3>${description}</h3>
              <h4>High: ${high} &#8457</h4>
              <h4>Low: ${low} &#8457</h4>
              <h4>Humidity: ${humidity}%</h4>`

  document.getElementById('weather').innerHTML = data;
}

// Link searched location to displayed weather data
geocoder.on('result', function(ev) {
  getWeather(ev.result.place_name);
});

$( document ).on("load", getWeather('Boulder,Colorado'));

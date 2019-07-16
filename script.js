// // var firebaseConfig = {
// //     apiKey: "AIzaSyDrNp9JeBmwjBWKQhEf3LO9cAI-uOCOx_4",
// //     authDomain: "nic-project-458cb.firebaseapp.com",
// //     databaseURL: "https://nic-project-458cb.firebaseio.com",
// //     projectId: "nic-project-458cb",
// //     storageBucket: "nic-project-458cb.appspot.com",
// //     messagingSenderId: "441972232528",
// //     appId: "1:441972232528:web:701e409f6e568261"
// // };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// var firebase = firebase.initializeApp(firebaseConfig);

var myLatlng;

// var map, infoWindow;
// function initMap() {

//  map = new google.maps.Map(document.getElementById('googleMap'), {
//       center: {lat: 43.65, lng: -79.39},
//       zoom: 13.5
//     });
//     infoWindow = new google.maps.InfoWindow;

//   var marker = createMarker({ map, position: initialPosition }); 
//   map.panTo({ lat, lng });   
//   var map = createMap(initialPosition); marker.setPosition({ lat, lng });
//   var createMarker = ({ map, position }) => {
//     return new google.maps.Marker({ map, position });
//    };
//   // Try HTML5 geolocation.
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };

//       infoWindow.setPosition(pos);
//       infoWindow.setContent('Location found.');
//       infoWindow.open(map);
//       map.setCenter(pos);
//     }, function() {
//       handleLocationError(true, infoWindow, map.getCenter());
//     });
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }
// }

// // initMap();

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//     infoWindow.setPosition(pos);
//     infoWindow.setContent(browserHasGeolocation ?
//                           'Error: The Geolocation service failed.' :
//                           'Error: Your browser doesn\'t support geolocation.');
//     infoWindow.open(map);
//   }

function showLocation(business, location = { lat: 43.650, lng: -79.391 }) {


    // $.ajax({
    //     url:`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${business}&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@${location.lat},${location.lng}&key=AIzaSyAnoDLLjOPRYNw5DAfBEBgrFEcvifr5N5E`,
    //     method: 'GET',
    //     headers: {
    //         'Access-Control-Allow-Origin': '*'
    //     },
    //     }).done( function( data ) {
    //     console.log(data);
    // });
    axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${business}&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@${location.lat},${location.lng}&key=AIzaSyAnoDLLjOPRYNw5DAfBEBgrFEcvifr5N5E`).then(function(response) {
        console.log(response);
    }).catch(function(err) {
        console.log(err);
    })
}



function initMap() {
    // myLatlng = { lat: 43.650, lng: 79.391 };

    var map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 10,
        center: myLatlng
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            myLatlng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            // //set parameters for db
            // database.ref().set({
            //     lat: lat,
            //     lng: lng
            // })
            // database.ref().on("value", function(snapshot) {
            //     console.log(snapshot.val());
            //     console.log(snapshot.val().lat;)
            // }, function(errorObject) {
            //     console.log("Errors:" + errorObject.code)
            // });


            map.setZoom(15);
            map.setCenter(myLatlng);

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'Click to zoom'

            });
        });
    }

    // map.addListener('center_changed', function() {
    //   // 3 seconds after the center of the map has changed, pan back to the
    //   // marker.
    //   window.setTimeout(function() {
    //     map.panTo(marker.getPosition());
    //   }, 3000);
    // });

    // marker.addListener('click', function() {
    //   map.setZoom(10);
    //   map.setCenter(marker.getPosition());
    // });
};
// SELECT ELEMENTS
var weatherIcon = document.querySelector(".weather-icon");
var tempVal = document.querySelector(".temperature-value p");
var tempDescription = document.querySelector(".temperature-description p");
var local = document.querySelector(".location p");
var noti = document.querySelector(".notification");

// App data
var weather = {};

weather.temperature = {
    unit: "celsius"
}

// APP varS AND VARS
var KELVIN = 273;
// API KEY
var key = "703015e191a6289ec93466387af6a952";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    noti.style.display = "block";
    noti.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error) {
    noti.style.display = "block";
    noti.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude) {
    var api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function(response) {
            console.log(response);
            var data = response.json();
            return data;
        })
        .then(function(data) {
            console.log(data);
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function() {
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather() {
    weatherIcon.innerHTML = `<img src= "images/${weather.iconId}.png"/>`;
    tempVal.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    tempDescription.innerHTML = weather.description;
    local.innerHTML = `${weather.city}, ${weather.country}`;
}
var myLatlng;

// var map, infoWindow;
// function initMap() {

//  map = new google.maps.Map(document.getElementById('googleMap'), {
//       center: {lat: 43.65, lng: -79.39},
//       zoom: 13.5
//     });
//     infoWindow = new google.maps.InfoWindow;
    
//   const marker = createMarker({ map, position: initialPosition }); 
//   map.panTo({ lat, lng });   
//   const map = createMap(initialPosition); marker.setPosition({ lat, lng });
//   const createMarker = ({ map, position }) => {
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

function showLocation(business, location={lat:43.650, lng:-79.391}){


// $.ajax({
//     url:`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${business}&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@${location.lat},${location.lng}&key=AIzaSyAnoDLLjOPRYNw5DAfBEBgrFEcvifr5N5E`,
//     method: 'GET',
//     headers: {
//         'Access-Control-Allow-Origin': '*'
//     },
//     }).done( function( data ) {
//     console.log(data);
// });
axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${business}&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@${location.lat},${location.lng}&key=AIzaSyAnoDLLjOPRYNw5DAfBEBgrFEcvifr5N5E`).then(function(response){
    console.log(response);
}).catch(function(err){
    console.log(err);
})
}



function initMap() {
    myLatlng = {lat: 43.650, lng: -79.391};

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
